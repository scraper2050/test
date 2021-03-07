import styled from 'styled-components';
import styles from './employees.style';
import { Fab, withStyles } from "@material-ui/core";
import AdminAddNewEmployeePage from './add-new-employee';
import { Roles as RoleEnums } from './add-new-employee'
import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import EmployeeProfile from './employee-profile';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees, loadingEmployees, loadingSingleEmployee, getEmployeeDetailAction } from 'actions/employee/employee.action';
import { UserProfile } from 'actions/employee/employee.types';
import { useLocation, useHistory } from 'react-router-dom';

interface Props {
  classes: any;
  children?: React.ReactNode;
}

function AdminEmployeesPage({ classes, children }: Props) {
  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees);


  const location = useLocation<any>();
  const history = useHistory();

  const locationState = location.state;

  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    page: prevPage ? prevPage.page : 0,
    pageSize: prevPage ? prevPage.pageSize : 10,
    sortBy: prevPage ? prevPage.sortBy : [],
  });

  const columns: any = [
    {
      'Header': 'Name',
      'accessor': 'profile.displayName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Phone',
      'accessor': 'contact.phone',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Header': 'Email',
      'accessor': 'auth.email',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          <Fab
            aria-label={'delete'}
            classes={{
              'root': classes.fabRoot
            }}
            color={'primary'}
            onClick={() => renderViewMore(row)}
            variant={'extended'}>
            {'View More'}
          </Fab>
        </div>;
      },
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
    dispatch(loadingEmployees());
    dispatch(getEmployees());
  }, []);

  const renderViewMore = (row: any) => {
    let baseObj = row['original'];


    let employeeId = baseObj['_id'];
    let displayName = baseObj['profile']['displayName'].split(' ').join('-');

    let employeeObj = { employeeId, displayName };


    localStorage.setItem("nestedRouteKey", `${displayName}`);

    dispatch(loadingSingleEmployee);
    dispatch(getEmployeeDetailAction(employeeId));


    history.push({
      pathname: `/main/admin/employees/${displayName}`,
      state: {
        ...employeeObj,
        currentPage
      }
    });
  }

  return (
    <>
      <MainContainer>
        <PageContainer>
          <div className={classes.addButtonArea}>
            <Fab
              aria-label={'new-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => {

                localStorage.setItem("nestedRouteKey", `add-new-employee`);
                history.push({
                  pathname: `/main/admin/employees/add-new-employee`,
                  state: {
                    currentPage
                  }
                });
              }}
              style={{
                float: 'right'
              }}
              variant={'extended'}>
              {'Add New'}
            </Fab>
          </div>
          <BCTableContainer
            currentPage={currentPage}
            setPage={setCurrentPage}
            columns={columns}
            isLoading={employees.loading}
            search
            tableData={employees.data}
          />

          {/* {stage === 1 &&
            <AdminAddNewEmployeePage submit={add} cancel={cancel} />
          }

          {stage === 2 &&
            <EmployeeProfile profile={profile} back={cancel} />
          } */}
        </PageContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  width: 100%;
  overflow-x: hidden;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 100%;
  padding-bottom: 30px;
  width: 100%;
  padding-left: 65px;
  padding-right: 65px;
  margin: 0 auto;
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(AdminEmployeesPage);
