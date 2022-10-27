import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {TablePagination, withStyles} from '@material-ui/core';

import styles from './styles';
import BCCircularLoader
  from "app/components/bc-circular-loader/bc-circular-loader";
import {generateAccountReceivableReport} from 'api/reports.api';
import {error, info} from 'actions/snackbar/snackbar.action';
import BCDateTimePicker
  from "../../../../components/bc-date-time-picker/bc-date-time-picker";
import BCItemsFilter
  from "../../../../components/bc-items-filter/bc-items-filter";
import {
  abbreviateNumber,
  formatCurrency,
  formatDateYMD, formatShortDateNoDay
} from "../../../../../helpers/format";
import {LIGHT_BLUE, modalTypes} from "../../../../../constants";
import BCMenuToolbarButton from "../../../../components/bc-menu-toolbar-button";
import {
  openModalAction,
  setModalDataAction
} from "../../../../../actions/bc-modal/bc-modal.action";
import {
  DataGrid,
  GridColDef,
} from '@material-ui/data-grid';
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import BCTablePagination
  from "../../../../components/bc-table-container/bc-table-pagination";

interface RevenueStandardProps {
  classes: any;
}

interface ReportData {
  title: string;
  value: string;
}

interface CUSTOM_REPORT {
  outstanding: string,
  aging: ReportData[],
  customersData: {
    id: string;
    customer: string;
    current: string;
    1_30: string;
    31_60: string;
    61_90: string;
    over91: string;
    total: string;
  }[]
}

const MORE_ITEMS = [
  {id: 0, title:'Customize'},
  {id: 1, title:'Export to PDF'},
  {id: 2, title:'Send Report'},
]

const columns: GridColDef[] = [
  { field: 'customer', headerName: 'Customer', flex: 1, disableColumnMenu: true },
  { field: 'Current', headerName: 'Current',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  { field: '1 - 30', headerName: '1  - 30',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  { field: '31 - 60', headerName: '31 - 60',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  { field: '61 - 90', headerName: '61 - 90',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  { field: '91 and Over Past Due', headerName: '91 and Over',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  { field: 'total', headerName: 'Total',flex: 1.2, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
];

const ARCustomReport = ({classes}: RevenueStandardProps) => {
  const dispatch = useDispatch();
  const location = useLocation<{asOf: string, customers: any[]}>();
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportData, setReportData] = useState<CUSTOM_REPORT | null>(null);
  const {state} = location;
  const {asOf, customers = []} = state || {asOf: new Date(), customers: []};

  const formatReport = (report: any) => {
    const {globalAgingBuckets, customerAgingBuckets} = report;
    const temp: ReportData[] = [];
    const BUCKETS: any = {};

    Object.keys(globalAgingBuckets).forEach((key, index) => {
      BUCKETS[globalAgingBuckets[key].label] = '$0';
      if (index > 0) {
        temp.push({
          title: globalAgingBuckets[key].label.substr(0, 11),
          value: formatCurrency(globalAgingBuckets[key].totalUnpaid)
        });
      }
    });

    const tempCustomer = customerAgingBuckets.map(({customer, agingBuckets}: any) => {
      const customerBuckets = {...BUCKETS};
      let total = 0;
      agingBuckets?.forEach((bucket: any) => {
        total += bucket.totalUnpaid;
        customerBuckets[bucket.label] = formatCurrency(bucket.totalUnpaid);
      });
      return {
        id: customer?._id,
        customer: customer?.profile?.displayName || customer?.contactName,
        ...customerBuckets,
        total: formatCurrency(total),
      }
    });

    setReportData({
      outstanding: formatCurrency(report.totalUnpaid),
      aging: temp,
      customersData: tempCustomer,
    });
  }

  const getReportData = async () => {
    setIsLoading(true);
    const customerIds = customers.length ? customers.map((customer: any) => customer._id) : undefined;
    const {
      status,
      report,
      message
    } = await generateAccountReceivableReport(2, formatDateYMD(asOf), customerIds);
    if (status === 1) {
      setCurrentPage(0);
      formatReport(report);
    } else {
      dispatch(error(message));
    }
    setIsLoading(false);
  }

  const handleMenuToolbarListClick = (event: any, id: number) => {
    event.stopPropagation();
    switch (id) {
      case 0:
        dispatch(
          setModalDataAction({
            'data': {
              'modalTitle': 'Customized A/R Report',
              'removeFooter': false
            },
            'type': modalTypes.CUSTOMIZE_AR_REPORT_MODAL,
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
  };

  useEffect(() => {
    getReportData();
  }, [location]);


  return (
    <div style={{padding: '20px 20px 0 20px'}}>
      {isLoading ?
        <BCCircularLoader heightValue={'20vh'}/>
        :
        <div className={classes.pageContainer}>
          <div className={classes.toolbar}>
            <div className={classes.menuToolbarContainer} />
            <BCMenuToolbarButton
              buttonText='More Actions'
              items={MORE_ITEMS}
              handleClick={handleMenuToolbarListClick}
            />
          </div>

          <div className={classes.customSummaryContainer}>
            <div className={classes.customSummaryColumn}>
              <p className={classes.customSummaryLabel}>As Of</p>
              <p className={classes.customSummaryValue}>{formatShortDateNoDay(asOf)}</p>
            </div>
            <div className={classes.customSummaryColumn}>
              <p className={classes.customSummaryLabel}>Customer(s)</p>
              {customers.length ?
                customers.map((customer: any) => <p className={classes.customSummaryValue}>{customer?.profile?.displayName}</p>)
                : 'All'
              }
            </div>
            <div />
            <div className={classes.customSummaryColumn} style={{alignItems: 'flex-end'}}>
              <p className={classes.customSummaryTitle}>A/R REPORT</p>
              <p className={classes.customSummaryTotalLabel}>Total Outstanding</p>
              <p className={classes.customSummaryTotalValue}>{reportData?.outstanding}</p>
            </div>
          </div>

          {currentPage === 0 && <div className={classes.customSubSummaryContainer}>
            {reportData?.aging.map((data, index) => <div key={data.title}>
              <p className={classes.label} style={{fontSize: 10}}>{data.title}</p>
              <p className={classes.value} style={{margin: '10px 0', fontSize: 14}}>{data.value}</p>
              </div>
            )}
          </div>}

          {reportData?.customersData &&
          <div style={{height: 'max-content', width: '100%'}}>
            <BCDataGrid
              pagination={true}
              autoHeight={true}
              rows={reportData?.customersData}
              columns={columns}
              page={currentPage}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 50]}
              components={{
                Footer: CustomFooter,
              }}
              componentsProps={{
                footer: {
                  total: reportData?.outstanding,
                  rowsCount: reportData?.customersData.length,
                  pageNumber: currentPage,
                  pageSize,
                  handleChangePage: (event: any, pageNumber: number) => setCurrentPage(pageNumber),
                  handleChangeRowsPerPage: (event: any) => {
                    setCurrentPage(0);
                    setPageSize(event.target.value);
                  },
                }
              }}
              // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              // onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
          </div>
          }
        </div>
      }
    </div>
  )
}

export default withStyles(
  styles,
  {'withTheme': true}
)(ARCustomReport);

const BCDataGrid = styled(DataGrid)`
    border: 0;
    margin-bottom: 30px;

  .MuiDataGrid-columnSeparator {
    display: none;
  }

  .MuiDataGrid-footerContainer {
    justify-content: flex-start;
  }

  .MuiToolbar-gutters {
    padding-left: 10px;
  }

  .MuiTablePagination-spacer {
    flex: 0;
  }

  .MuiTablePagination-root {
    color: rgba(0, 0, 0, 0.87);
    overflow: auto;
    font-size: 0.875rem;
    border-bottom: none;
    border-top: 2px solid rgba(224, 224, 224, 1);
  }

  .GrandTotalContainer {
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
    background-color: ${LIGHT_BLUE};
  }
`


// const CustomHeader = withStyles(
//   styles,
//   {'withTheme': true}
// )(({classes, headerData}: {classes: any, headerData: ReportData[]}) => <div className={classes.customSubSummaryContainer}>
//   {headerData.map((data, index) => <div key={data.title}>
//     <p className={classes.label} style={{fontSize: 10}}>{data.title}</p>
//     <p className={classes.value} style={{margin: '10px 0', fontSize: 14}}>{data.value}</p>
//     </div>
//   )}
// </div>)

const CustomFooter = ({total, rowsCount, pageNumber, pageSize, handleChangePage, handleChangeRowsPerPage}: any) => <>
  {Math.floor(rowsCount / pageSize) === pageNumber && <div className="GrandTotalContainer">
    <strong>Total Outstanding</strong>
    <strong>{total}</strong>
  </div>}
  <TablePagination
    ActionsComponent={BCTablePagination}
    style={{width: '80vw'}}
    //colSpan={5}
    count={rowsCount}
    onChangePage={handleChangePage}
    onChangeRowsPerPage={handleChangeRowsPerPage}
    page={pageNumber}
    rowsPerPage={pageSize}
    rowsPerPageOptions={[
      {
        label: '5',
        value: 5
      }, {
        label: '10',
        value: 10
      }, {
        label: '25',
        value: 25
      }, {
        label: 'All',
        value: rowsCount + 1
      }
    ]}
    SelectProps={{
      'inputProps': {'aria-label': 'rows per page'},
      'native': false
    }}
  />
</>
