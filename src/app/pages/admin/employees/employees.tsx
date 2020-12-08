import styled from 'styled-components';
import styles from './employees.style';
import {Fab, withStyles } from "@material-ui/core";
import AdminAddNewEmployeePage from './add-new-employee';
import { Roles as RoleEnums} from './add-new-employee'
import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import EmployeeProfile from './employee-profile';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTechnician, createAdministrator, createManager, createOfficeAdmin, getEmployees, loadingEmployees } from 'actions/employee/employee.action';
import { UserProfile } from 'actions/employee/employee.types';

interface Props {
  classes: any;
  children?: React.ReactNode;
}

function AdminEmployeesPage({ classes, children }: Props) {
  const dispatch = useDispatch();
  const employees = useSelector((state: any) => state.employees);
  const [stage, setStage] = useState(0);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  console.log(employees);

  const columns: any = [
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {row.index + 1}
        </div>;
      },
      'Header': 'No#',
      'sortable': true,
      'width': 60
    },
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

  const add = (firstName:string, lastName:string, email:string, phoneNumber:string, role:string) => {
    const data: UserProfile = {
      firstName,
      lastName,
      email,
      phone: phoneNumber
    };

    switch(role) {
      case RoleEnums.Technician:
        dispatch(createTechnician(data));
        break;
      case RoleEnums.Administrator:
        dispatch(createAdministrator(data));
        break;
      case RoleEnums.Manager:
        dispatch(createManager(data));
        break;
      case RoleEnums.OfficeAdmin:
        dispatch(createOfficeAdmin(data));
        break;
      default:
    }
    setStage(0);
  }

  const cancel = () => {
    setStage(0);
  }

  const update = () => {

  }

  const renderViewMore = (row: any) => {
    setStage(2);
    const baseObj = row['original'];
    setProfile({
      email: baseObj['auth'] && baseObj['auth']['email'] ? baseObj['auth']['email'] : '',
      firstName: baseObj['profile'] && baseObj['profile']['firstName'] ? baseObj['profile']['firstName'] : '',
      lastName: baseObj['profile'] && baseObj['profile']['lastName'] ? baseObj['profile']['lastName'] : '',
      phone: baseObj['contact'] && baseObj['contact']['contact'] ? baseObj['contact']['contact'] : ''
    });
  }
  
  return (
    <>
      {/* <BCSubHeader title={'Admin'}>
        <BCToolBarSearchInput style={{
          'marginLeft': 'auto',
          'width': '321px'
        }}
        />
      </BCSubHeader> */}

      <MainContainer>
        <PageContainer>
          {stage === 0 && <div className={classes.addButtonArea}>
            <Fab
              aria-label={'new-ticket'}
              classes={{
                'root': classes.fabRoot
              }}
              color={'primary'}
              onClick={() => {setStage(1)}}
              style={{
                float: 'right'
              }}
              variant={'extended'}>
              {'Add New'}
            </Fab>
          </div>
         }
         {stage === 0 && 
          <BCTableContainer
            columns={columns}
            isLoading={employees.loading}
            search
            tableData={employees.data}
          />
          }

          {stage === 1 && 
          <AdminAddNewEmployeePage submit={add} cancel={cancel}/>
          }

          {stage === 2 && 
          <EmployeeProfile profile={profile} back={cancel}/>
          }
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
