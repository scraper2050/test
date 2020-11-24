import BCTableContainer from '../../../components/bc-table-container/bc-table-container';
import BCBackButtonNoLink from '../../../components/bc-back-button/bc-back-button-no-link';
import Fab from '@material-ui/core/Fab';
import styles from './view-more.styles';
import { withStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { useLocation } from "react-router-dom";
import { openModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import { modalTypes } from '../../../../constants';
import { loadingJobSites, getJobSites } from 'actions/job-site/job-site.action';
import { getCustomerDetailAction, loadingSingleCustomers } from 'actions/customer/customer.action';
import '../../../../scss/index.scss';
import { useHistory } from 'react-router-dom';


function ViewMoreLocationPage({ classes }: any) {
    const dispatch = useDispatch();
    const jobSites = useSelector((state: any) => state.jobSites);
    const { customerObj } = useSelector((state: any) => state.customers);
    const [curTab, setCurTab] = useState(0);
    const location = useLocation();
    const history = useHistory();

    const openEditJobSiteModal = (jobSite: any) => {
        let updateJobSiteObj = { ...jobSite, location: { lat: jobSite.location.coordinates[1], long: jobSite.location.coordinates[0] }, update: true }
        dispatch(setModalDataAction({
            'data': {
                'jobSiteInfo': updateJobSiteObj,
                'modalTitle': 'Edit Job Site',
                'removeFooter': false
            },
            'type': modalTypes.ADD_JOB_SITE
        }));
        setTimeout(() => {
            dispatch(openModalAction());
        }, 200);
    };

    const columns: any = [
        {
            'Header': 'Job Site',
            'accessor': 'name',
            'className': 'font-bold',
            'sortable': true
        },
        {
            'Header': 'Address',
            'accessor': 'address',
            Cell: (row:any) => {
                return (
                    <div>
                        <span>{`${row.value.street}` + ' '}</span>
                        <span>{`${row.value.city}` + ' '}</span>
                        <span>{`${row.value.state}` + ' '}</span>
                        <span>{`${row.value.zipcode}` + ' '}</span>
                    </div>
                )
            },
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
                        onClick={() => { openEditJobSiteModal(row.original) }}
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
        const obj: any = location.state;
        var locationId = obj._id;
        const customerId = obj.customerId;
        dispatch(loadingJobSites());
        dispatch(getJobSites({ customerId, locationId }));
        if( customerObj._id === ''){
            const obj: any = location.state;
            const customerId = obj.customerId;
            dispatch(loadingSingleCustomers())
            dispatch(getCustomerDetailAction({customerId}));
          }
        return () => {
            let linkKey:any = localStorage.getItem('prevNestedRouteKey');
            localStorage.setItem('nestedRouteKey', linkKey);
        }
    }, []);

    const openJobLocationModal = () => {
        const obj: any = location.state;
        const locationId = obj._id;
        dispatch(setModalDataAction({
            'data': {
                'jobSiteInfo': { locationId },
                'modalTitle': 'New Job Site',
                'removeFooter': false
            },
            'type': modalTypes.ADD_JOB_SITE
        }));
        setTimeout(() => {
            dispatch(openModalAction());
        }, 200);
    };
   
    return (
        <div className={classes.pageMainContainer}>
            <div className={classes.pageContainer}>
                <div className={classes.pageContent}>
                     <BCBackButtonNoLink
                        func={history.goBack}
                    /> 
                    
                        <div
                            className={`${classes.dataContainer} `}
                            hidden={curTab !== 0}
                            id={'0'}>
                            <PageContainer className="info_wrapper alignAddJobSite">
                                <Fab
                                    aria-label={'delete'}
                                    classes={{
                                        'root': classes.fabRoot
                                    }}
                                    onClick={() => openJobLocationModal()}
                                    color={'primary'}
                                    variant={'extended'}>
                                    {'Add Job Site'}
                                </Fab>
                            </PageContainer>

                            <BCTableContainer
                                columns={columns}
                                isLoading={jobSites.loading}
                                search
                                searchPlaceholder={"Search Job Sites..."}
                                tableData={jobSites.data}
                                initialMsg="There are no job sites!"
                            />
                        </div>
                       
                </div>
            </div>
        </div>
    );
}

const PageContainer = styled.div`
  display: flex;
  flex: 1 1 100%;
  padding: 30px;
  width: 100%;
  padding-left: 0px;
  padding-right: 65px;
  margin: 0 auto;
`;
export default withStyles(
    styles,
    { 'withTheme': true }
)(ViewMoreLocationPage);