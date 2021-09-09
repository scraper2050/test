import BCTableContainer from './../../../components/bc-table-container/bc-table-container';
import BCTabs from './../../../components/bc-tab/bc-tab';
import Fab from '@material-ui/core/Fab';
import SwipeableViews from 'react-swipeable-views';
import { modalTypes } from '../../../../constants';
import styles from './vendors.styles';
import { Grid, MenuItem, Select, withStyles } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { getVendorDetailAction, getVendors, loadingSingleVender, loadingVendors } from 'actions/vendor/vendor.action';
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { editableStatus } from 'app/models/contract';
import styled from 'styled-components';
import {CSButton, CSButtonSmall} from "../../../../helpers/custom";

interface StatusTypes {
  status: number;
}


interface RowStatusTypes {
  row: {
    original: {

      status: number
    }
  };
}

const status = [
  {
    'label': 'Active',
    'value': 'active'
  },
  {
    'label': 'Archive',
    'value': 'archive'
  }
];

const StyledSelect = styled(Select)`
background: white;
padding: 0 20px;
height: 40px;
width: 120px;`;


function ToolBar({ handleChange, menuItems }:any) {
  return <StyledSelect
    defaultValue={'active'}
    onChange={handleChange}>
    {menuItems.map((item:any) => <MenuItem
      key={item.value}
      value={item.value}>
      {item.label}
    </MenuItem>)}
  </StyledSelect>;
}


function AdminVendorsPage({ classes }: any) {
  const dispatch = useDispatch();
  const vendors = useSelector((state: any) => state.vendors);
  const [curTab, setCurTab] = useState(0);
  const [tableData, setTableData] = useState([]);
  const history = useHistory();
  const location = useLocation<any>();

  const activeVendors = useMemo(() => vendors.data.filter((vendor:any) => [0, 1].includes(vendor.status)), [vendors]);
  const nonActiveVendors = useMemo(() => vendors.data.filter((vendor:any) => ![0, 1].includes(vendor.status)), [vendors]);

  function RenderStatus({ status }: StatusTypes) {
    const statusValues = ['Pending', 'Accepted', 'Cancelled', 'Rejected', 'Finished'];
    const classNames = [classes.statusPendingText, classes.statusConfirmedText, classes.cancelledText, classes.cancelledText, classes.finishedText];
    const textStatus = statusValues[status];
    return <div className={`${classes.Text} ${classNames[status]}`}>
      {textStatus}
    </div>;
  }

  const locationState = location.state;

  const prevPage = locationState && locationState.prevPage ? locationState.prevPage : null;

  const [currentPage, setCurrentPage] = useState({
    'page': prevPage ? prevPage.page : 0,
    'pageSize': prevPage ? prevPage.pageSize : 10,
    'sortBy': prevPage ? prevPage.sortBy : []
  });

  const columns: any = [
    /*
     * {
     *   'Cell'({ row }: any) {
     *     return <div className={'flex items-center'}>
     *       {row.index + 1}
     *     </div>;
     *   },
     *   'Header': 'No#',
     *   'sortable': true,
     *   'width': 60
     * },
     */
    {
      'Header': 'Company Name',
      'accessor': 'contractor.info.companyName',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: RowStatusTypes) {
        return <RenderStatus status={row.original.status} />;
      },
      'Header': 'Status',
      'accessor': 'status',
      'className': 'font-bold',
      'sortable': true
    },
    {
      'Cell'({ row }: any) {
        return <div className={'flex items-center'}>
          {editableStatus.includes(row.original.status) && <CSButtonSmall
            aria-label={'change-status'}
            color={'primary'}
            onClick={() => editVendor(row.original)}
            style={{ 'marginRight': '15px' }}
            variant={'contained'}>
            {'Change Status'}
          </CSButtonSmall>}

          <CSButtonSmall
            aria-label={'view more'}
            color={'primary'}
            onClick={() => renderViewMore(row)}
            variant={'contained'}>
            {'View More'}
          </CSButtonSmall>
        </div>;
      },
      'Header': 'Action',
      'id': 'action',
      'sortable': false,
      'width': 60
    }
  ];

  useEffect(() => {
    if (vendors) {
      setTableData(activeVendors);
    }
  }, [vendors]);

  useEffect(() => {
    dispatch(loadingVendors());
    dispatch(getVendors());
  }, []);

  const handleTabChange = (newValue: number) => {
    setCurTab(newValue);
  };

  const handleRowClick = (event: any, row: any) => {
    // Console.log(event, row);

  };

  const openVendorModal = () => {
    dispatch(setModalDataAction({
      'data': {
        'modalTitle': 'Add Vendor',
        'removeFooter': false
      },
      'type': modalTypes.ADD_VENDOR_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const editVendor = (vendor:any) => {
    dispatch(setModalDataAction({
      'data': {
        'removeFooter': false,
        'maxHeight': '450px',
        'height': '100%',
        'message': {
          'title': `Finish contract with ${vendor.contractor.info.companyName}`
        },
        'contractId': vendor._id,
        'notificationType': 'ContractInvitation'
      },
      'type': modalTypes.CONTRACT_VIEW_MODAL
    }));
    setTimeout(() => {
      dispatch(openModalAction());
    }, 200);
  };

  const handleFilterChange = (e:any) => {
    if (e.target.value === 'active') {
      setTableData(activeVendors);
    } else {
      setTableData(nonActiveVendors);
    }
  };

  const renderViewMore = (row: any) => {
    const baseObj = row.original;
    let vendorCompanyName =
      baseObj.contractor.info &&
        baseObj.contractor.info.companyName !== undefined
        ? baseObj.contractor.info.companyName
        : 'N/A';
    const vendorId = baseObj.contractor._id;
    const vendorObj = { vendorCompanyName,
      vendorId };
    vendorCompanyName =
      vendorCompanyName !== undefined
        ? vendorCompanyName.replace(/ /g, '')
        : 'vendorName';

    localStorage.setItem('nestedRouteKey', `${vendorCompanyName}`);


    dispatch(loadingSingleVender());
    dispatch(getVendorDetailAction(vendorId));

    history.push({
      'pathname': `vendors/${vendorCompanyName}`,
      'state': {
        ...vendorObj,
        currentPage
      }
    });
  };

  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageContainer}>
        <div className={classes.pageContent}>
          <BCTabs
            curTab={curTab}
            indicatorColor={'primary'}
            onChangeTab={handleTabChange}
            tabsData={[
              {
                'label': 'Vendors List',
                'value': 0
              },
              {
                'label': 'Recent Activities',
                'value': 1
              }
            ]}
          />
          <div className={classes.addButtonArea} style={{top: 0}}>
            {
              <ToolBar
                handleChange={handleFilterChange}
                menuItems={status}
              />
            }
          </div>
          <div className={classes.addButtonArea}>
            {
              curTab === 0
                ? <CSButton
                  aria-label={'new-job'}
                  color={'primary'}
                  onClick={() => openVendorModal()}
                  variant={'contained'}>
                  {'Invite Vendor'}
                </CSButton>
                : null
            }
          </div>
          <SwipeableViews index={curTab}>
            <div
              className={classes.dataContainer}
              hidden={curTab !== 0}
              id={'0'}>
              <BCTableContainer
                columns={columns}
                currentPage={currentPage}
                isLoading={vendors.loading}
                onRowClick={handleRowClick}
                search
                searchPlaceholder = 'Search Vendors...'
                setPage={setCurrentPage}
                tableData={tableData.reverse()}
              />
            </div>

            <div
              className={classes.dataContainer}
              hidden={curTab !== 1}
              id={'1'}>
              <Grid container>
                <Grid
                  item
                  xs={12}
                />
              </Grid>
            </div>
          </SwipeableViews>
        </div>
      </div>
    </div>
  );
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(AdminVendorsPage);
