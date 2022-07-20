import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { withStyles } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useLocation, useHistory } from 'react-router-dom';

import styles from './revenue.styles';
import ReportStructure from './report-structure';
import BCMenuButton from 'app/components/bc-menu-more'
import BCMenuToolbarButton from 'app/components/bc-menu-toolbar-button';
import BCCircularLoader from "app/components/bc-circular-loader/bc-circular-loader";
import { modalTypes } from "../../../../../constants";
import {
  openModalAction,
  setModalDataAction
} from "actions/bc-modal/bc-modal.action";
import { setReportShowing } from 'actions/report/report.action'
import { generateIncomeReport } from 'api/reports.api';
import { error as SnackBarError, info } from 'actions/snackbar/snackbar.action';
import customer from 'app/pages/customer/customer';

interface RevenueStandardProps {
  classes: any;
}

const INITIAL_ITEMS = [
  {id: 0, title:'Run Report'},
  {id: 1, title:'Customize'},
]
const MORE_ITEMS = [
  {id: 0, title:'Customize'},
  {id: 1, title:'Export to PDF'},
  {id: 2, title:'Send Report'},
]

const RevenueStandardReport = ({classes}:RevenueStandardProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location:any = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    if(location.state && location.state.reportQuery){
      // console.log(location.state.reportQuery);
      runReport(location.state.reportQuery);
    }
    window.history.replaceState({}, document.title);
  }, [location]);
  
  const runReport = async (params?:any) => {
    const paramObject:any = {};
    paramObject.reportData = 1;
    paramObject.reportSource = params?.generateFrom ? params.generateFrom : 1;
    if(params?.selectedCustomers?.length && params?.checkCustomer){
      if(params.selectedCustomers[0].value === 'all'){
        paramObject.reportData = 2;
      } else {
        paramObject.customerIds = JSON.stringify(params.selectedCustomers.map((customer:any) => customer.value));
        paramObject.reportData = 2;
      }
    }
    if(params?.startDate && params?.endDate){
      let startDate:any = new Date(params.startDate)
      const startOffset = startDate.getTimezoneOffset() * 60000;
      startDate = new Date(startDate.getTime() - startOffset);
      let endDate:any = new Date(params.endDate)
      const endOffset = endDate.getTimezoneOffset() * 60000;
      endDate = new Date(endDate.getTime() - endOffset);
      paramObject.startDate = startDate.toISOString().slice(0,10);
      paramObject.endDate = endDate.toISOString().slice(0,10);
    }
    try {
      setIsLoading(true);
      const result = await generateIncomeReport(paramObject);
      if(result.status === 1) {
        setReportData(result)
        dispatch(setReportShowing(true))
      } else {
        console.log(result.message)
        dispatch(SnackBarError(`Something went wrong`))
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error)
      dispatch(SnackBarError(`Something went wrong`))
      setIsLoading(false);
    }
    history.replace({state:undefined});
  }
  

  const handleMenuButtonClick = (event: any, id: number) => {
    event.stopPropagation();
    switch (id) {
      case 0:
        runReport();
        break;
      case 1:
        dispatch(
          setModalDataAction({
            'data': {
              'modalTitle': 'Customize Report',
              'removeFooter': false
            },
            'type': modalTypes.CUSTOMIZE_REVENUE_REPORT_MODAL,
          })
        );
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
        break;
    }
  }

  const handleMenuToolbarListClick = (event: any, id: number) => {
    event.stopPropagation();
    switch (id) {
      case 0:
        dispatch(
          setModalDataAction({
            'data': {
              'modalTitle': 'Customize Report',
              'removeFooter': false
            },
            'type': modalTypes.CUSTOMIZE_REVENUE_REPORT_MODAL,
          })
        );
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
        break;
      case 1:
        dispatch(info('This feature is still under development'));
        break;
      case 2:
        dispatch(info('This feature is still under development'));
        break;
      default:
        dispatch(info('This feature is still under development'));
    }
  }

  return (
    <div style={{padding: 20}}>
      {isLoading ? (
        <BCCircularLoader heightValue={'20vh'}/>
      ) : reportData ? (
        <div>
          <div className={classes.menuToolbarContainer}>
            <BCMenuToolbarButton 
              buttonText='More Actions'
              items={MORE_ITEMS}
              handleClick={handleMenuToolbarListClick}
              />
          </div>
          <div className={classes.reportContainer}>
            <ReportStructure data={reportData} />
          </div>
        </div>
      ) : (
        <>
          <div className={classes.label}>REPORT TYPE</div>
          <div className={classes.reportType}>
            <div className={classes.reportName}>
              Total Revenue
            </div>
            <BCMenuButton
              icon={MoreHorizIcon}
              items={INITIAL_ITEMS}
              handleClick={handleMenuButtonClick}
            />
          </div>
        </>
      )}
    </div>
  )
}

export default withStyles(
  styles,
  { 'withTheme': true }
)(RevenueStandardReport);