import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  IconButton,
  withStyles
} from '@material-ui/core';

import styles from './styles';
import BCCircularLoader
  from "app/components/bc-circular-loader/bc-circular-loader";
import {
  generateAccountReceivablePdfReport,
  generateAccountReceivableReport
} from 'api/reports.api';
import {error, info} from 'actions/snackbar/snackbar.action';
import {
  formatCurrency, formatDate,
  formatDateYMD, formatShortDateNoDay
} from "../../../../../helpers/format";
import {LIGHT_BLUE, modalTypes, PRIMARY_BLUE} from "../../../../../constants";
import BCMenuToolbarButton from "../../../../components/bc-menu-toolbar-button";
import {
  openModalAction,
  setModalDataAction
} from "../../../../../actions/bc-modal/bc-modal.action";
import {
  DataGrid, GridCellParams,
  GridColDef,
} from '@material-ui/data-grid';
import styled from "styled-components";
import {useHistory, useLocation} from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface RevenueStandardProps {
  classes: any;
}

interface ReportData {
  title: string;
  value: string;
}

interface CUSTOM_REPORT {
  outstanding: string,
  totalAmount: string,
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



const ARCustomReport = ({classes}: RevenueStandardProps) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{asOf: string, customers: any[], bucket: string, selectedCustomer: any}>();
  const { companyName } = useSelector(({ profile }: any) => profile)
  const [isLoading, setIsLoading] = useState(false);
  const [originalData, setOriginalData] = useState<any>(null);
  const [bucket, setBucket] = useState<string | null>(null || location?.state?.bucket);
  const [selectedCustomer, setSelectedCustomer] = useState<any[]>([]);
  // const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [reportData, setReportData] = useState<CUSTOM_REPORT | null>(null);
  const {state} = location;
  const {asOf, customers = []} = state || {asOf: new Date(), customers: []};


  const columnsBuckets: GridColDef[] = [
    { field: 'customer', headerName: 'Customer', flex: 1, disableColumnMenu: true },
    { field: 'Current', headerName: 'Current',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
    { field: '1 - 30',
      headerName: '1  - 30',
      headerAlign: 'right',
      flex: 1,
      disableColumnMenu: true,
      align: 'right',
      renderCell: (cellValues) => <ClickableCell onClick={() => handleAmountClick(cellValues.id as string, cellValues.field)}>
        {cellValues.value}
      </ClickableCell>
    },
    {
      field: '31 - 60',
      headerName: '31 - 60',
      flex: 1,
      disableColumnMenu: true,
      headerAlign: 'right',
      align: 'right',
      renderCell: (cellValues) => <ClickableCell onClick={() => handleAmountClick(cellValues.id as string, cellValues.field)}>
        {cellValues.value}

      </ClickableCell>
    },
    {
      field: '61 - 90',
      headerName: '61 - 90',
      flex: 1,
      disableColumnMenu: true,
      headerAlign: 'right',
      align: 'right',
      renderCell: (cellValues) => <ClickableCell onClick={() => handleAmountClick(cellValues.id as string, cellValues.field)}>
        {cellValues.value}

      </ClickableCell>
    },
    {
      field: '91 and Over Past Due',
      headerName: '91 and Over',
      flex: 1,
      disableColumnMenu: true,
      headerAlign: 'right',
      align: 'right',
      renderCell: (cellValues) => <ClickableCell onClick={() => handleAmountClick(cellValues.id as string, cellValues.field)}>
        {cellValues.value}
      </ClickableCell>
    },
    { field: 'total', headerName: 'Total',flex: 1.2, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  ];

  const columnsInvoices: GridColDef[] = [
    { field: 'date', headerName: 'Date', flex: 1, disableColumnMenu: true },
    {
      field: 'invoice',
      headerName: 'Invoice',
      flex: 1,
      disableColumnMenu: true,
      renderCell: (cellValues) => <ClickableCell onClick={() => handleInvoiceClick(cellValues)}>
        {cellValues.value}
      </ClickableCell>
    },
    { field: 'customer', headerName: 'Customer',flex: 1, disableColumnMenu: true, },
    { field: 'dueDate', headerName: 'Due Date',flex: 1, disableColumnMenu: true,  },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      disableColumnMenu: true,
      align: 'right',
      headerAlign: 'right',
      renderCell: (cellValues) => <ClickableCell onClick={() => handleInvoiceClick(cellValues)}>
        {cellValues.value}
      </ClickableCell>
    },
    { field: 'balance', headerName: 'Open Balance',flex: 1, disableColumnMenu: true, align: 'right', headerAlign: 'right' },
  ];

  const formatReportBuckets = (report: any) => {
    const {globalAgingBuckets = {}, customerAgingBuckets} = report;
    const temp: ReportData[] = [];
    const BUCKETS: any = {};

    Object.keys(globalAgingBuckets).forEach((key, index) => {
      BUCKETS[globalAgingBuckets[key].label] = '';
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
        customerId: customer?._id,
        customer: customer?.profile?.displayName || customer?.contactName,
        ...customerBuckets,
        total: total ? formatCurrency(total) : '',
      }
    });

    setReportData({
      outstanding: formatCurrency(report.totalUnpaid),
      totalAmount: '',
      aging: temp,
      customersData: tempCustomer,
    });
  }

  const formatReportInvoices = (bucket: any, customer: any) => {
    let totalAmount = 0;
    const tempInvoices = bucket.invoices.map((invoice: any) => {
      totalAmount += invoice.total;
      return {
        id: invoice._id,
        date: formatDate(invoice.issuedDate),
        invoice: invoice.invoiceId,
        customer: customer?.profile?.displayName || customer?.contactName,
        dueDate: formatDate(invoice.dueDate),
        amount: formatCurrency(invoice.total),
        balance: formatCurrency(invoice.balanceDue),
      }

    });

    setSelectedCustomer([customer]);
    setReportData({
      outstanding: formatCurrency(bucket.totalUnpaid),
      totalAmount: formatCurrency(totalAmount),
      aging: [],
      customersData: tempInvoices,
    });
  }

  const getReportData = async () => {
    try {
      setIsLoading(true);
      const customerIds = customers.length ? customers.map((customer: any) => customer._id) : undefined;
      const {
        status,
        report,
        message
      } = await generateAccountReceivableReport(2, formatDateYMD(asOf), customerIds);
      if (status === 1) {
        setCurrentPage(0);
        setOriginalData(report);
        formatReportBuckets(report);
      } else {
        dispatch(error(message));
      }
    } catch (e) {
      dispatch(error(e.message));
    } finally {
      setIsLoading(false);
    }
  }

  const generatePdfReport = async() => {
    try {
      setIsLoading(true);
      const customerIds = customers.length ? customers.map((customer: any) => customer._id) : undefined;
      const {
        status,
        reportUrl,
        message
      } = await generateAccountReceivablePdfReport(2, formatDateYMD(asOf), customerIds);
      if (status === 1) {
        window.open(reportUrl)
      } else {
        dispatch(error(message));
      }
    } catch (e) {
      dispatch(error(e.message));
    } finally {
      setIsLoading(false);
    }
  }

  const handleMenuToolbarListClick = (event: any, id: number) => {
    event.stopPropagation();
    switch (id) {
      case 0:
        dispatch(
          setModalDataAction({
            'data': {
              'modalTitle': 'Customized A/R Report',
              'removeFooter': false,
              asOf,
              customers,
            },
            'type': modalTypes.CUSTOMIZE_AR_REPORT_MODAL,
          })
        );
        setTimeout(() => {
          dispatch(openModalAction());
        }, 200);
        break;
      case 1:
        generatePdfReport();
        break;
      case 2:
        dispatch(info('This feature is still under development'));
        break;
      default:
        dispatch(info('This feature is still under development'));
    }
  };

  const handleAmountClick = (customerId: string, bucketLabel: string) => {
    const {customerAgingBuckets} = originalData;
    const selectedCustomer = customerAgingBuckets.find((customerBucket: any) => customerBucket.customer._id === customerId);
    const selectedBucket = selectedCustomer.agingBuckets.find((bucket: any) => bucket.label === bucketLabel);
    setBucket(bucketLabel);
    formatReportInvoices(selectedBucket, selectedCustomer.customer);
  };

  const handleInvoiceClick = (params: GridCellParams) => {
    history.replace({state:{ ...location.state, bucket, selectedCustomer }});
    history.push({
      'pathname': `/main/invoicing/view/${params.id}`,
    });
  }

  const handleReturnReport = () => {
    // const state = location.state;
    // delete state.bucket;
    // delete state.selectedCustomer;
    // history.replace({state});

    setBucket(null);
    formatReportBuckets(originalData);
  }

  useEffect(() => {
    getReportData();
  }, [location]);

  useEffect(() => {
    if (originalData && location?.state?.bucket) {
      setBucket(location.state.bucket);
      handleAmountClick(location.state.selectedCustomer[0]._id, location.state.bucket);
    }
  }, [originalData])


  return (
    <div style={{padding: '20px 20px 0 20px'}}>
      {isLoading ?
        <BCCircularLoader heightValue={'20vh'}/>
        :
        <div className={classes.pageContainer}>
          <div className={classes.toolbar}>
            <div className={classes.menuToolbarContainer} >
              {!!bucket && <IconButton
                className={classes.roundBackground}
                color={'default'}
                onClick={handleReturnReport}
              >
                <ArrowBackIcon fontSize={'small'}/>
              </IconButton>
              }
            </div>
            <BCMenuToolbarButton
              buttonText='More Actions'
              items={MORE_ITEMS}
              handleClick={handleMenuToolbarListClick}
            />
          </div>

          <div className={classes.customSummaryContainer}>
            <div className={classes.customSummaryColumn}>
              <p className={classes.customSummaryTitle}>{companyName}</p>
              <p className={classes.customSummaryLabel}>As Of</p>
              <p className={classes.customSummaryValue}>{formatShortDateNoDay(asOf)}</p>
            </div>
            <div className={classes.customSummaryColumn}>
              <p className={classes.customSummaryTitle}>&nbsp;</p>
              <p className={classes.customSummaryLabel}>Customer{bucket ? '' : '(s)'}</p>
              {customers.length ?
                (bucket ? selectedCustomer : customers).map((customer: any) => <p className={classes.customSummaryValue}>{customer?.profile?.displayName}</p>)
                : 'All'
              }
            </div>
            {bucket ? <>
                <div className={classes.customSummaryColumn}>
                  <p className={classes.customSummaryTitle}>&nbsp;</p>
                  <p
                    className={classes.customSummaryLabel}>{bucket} {bucket.indexOf('-') > 0 ? 'days past due' : ''}</p>
                </div>
              </> :
              <div/>
            }
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
              pagination
              autoHeight
              disableSelectionOnClick
              rows={reportData?.customersData}
              columns={bucket ? columnsInvoices : columnsBuckets}

              // page={currentPage}
              pageSize={reportData?.customersData?.length ?? 0}
              // rowsPerPageOptions={[5, 10, 50]}
              components={{
                Footer: CustomFooter,
              }}
              componentsProps={{
                footer: {
                  total: reportData?.outstanding,
                  totalAmount: reportData?.totalAmount,
                  // rowsCount: reportData?.customersData.length,
                  // pageNumber: currentPage,
                  // pageSize,
                  // handleChangePage: (event: any, pageNumber: number) => setCurrentPage(pageNumber),
                  // handleChangeRowsPerPage: (event: any) => {
                  //   setCurrentPage(0);
                  //   setPageSize(event.target.value);
                  // },
                }
              }}
              // onCellClick={handleOnCellClick}
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

  .MuiDataGrid-cell:focus {
    outline: none;
  }

  .MuiDataGrid-columnHeaderTitleContainer {
    padding: 0;
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
    strong {
      flex: 1;
      padding: 0 5px;
    }
    strong:not(:first-of-type) {
      text-align: right;
    }
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

const CustomFooter = ({total, totalAmount, rowsCount, pageNumber, pageSize, handleChangePage, handleChangeRowsPerPage}: any) => <>
  {/*{Math.floor(rowsCount / pageSize) === pageNumber && */}
  <div className="GrandTotalContainer">
    <strong>Total Outstanding</strong>
    <strong>&nbsp;</strong>
    <strong>&nbsp;</strong>
    <strong>&nbsp;</strong>
    <strong>{totalAmount}</strong>
    <strong>{total}</strong>
  </div>
  {/*<TablePagination*/}
  {/*  ActionsComponent={BCTablePagination}*/}
  {/*  style={{width: '80vw'}}*/}
  {/*  //colSpan={5}*/}
  {/*  count={rowsCount}*/}
  {/*  onChangePage={handleChangePage}*/}
  {/*  onChangeRowsPerPage={handleChangeRowsPerPage}*/}
  {/*  page={pageNumber}*/}
  {/*  rowsPerPage={pageSize}*/}
  {/*  rowsPerPageOptions={[*/}
  {/*    {*/}
  {/*      label: '5',*/}
  {/*      value: 5*/}
  {/*    }, {*/}
  {/*      label: '10',*/}
  {/*      value: 10*/}
  {/*    }, {*/}
  {/*      label: '25',*/}
  {/*      value: 25*/}
  {/*    }, {*/}
  {/*      label: 'All',*/}
  {/*      value: rowsCount + 1*/}
  {/*    }*/}
  {/*  ]}*/}
  {/*  SelectProps={{*/}
  {/*    'inputProps': {'aria-label': 'rows per page'},*/}
  {/*    'native': false*/}
  {/*  }}*/}
  {/*/>*/}
</>

const ClickableCell = styled.span`
  cursor: pointer;
  :hover {
    color: ${PRIMARY_BLUE};
    text-decoration: underline;
  }
`;
