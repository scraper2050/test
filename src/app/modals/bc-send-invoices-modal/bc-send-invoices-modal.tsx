import React, {useState, useEffect, useCallback, ChangeEvent} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import debounce from 'lodash.debounce';
import AttachMoney from '@material-ui/icons/AttachMoney';
import {
  Button,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  Typography,
  Checkbox,
  withStyles,
  Tooltip,
} from '@material-ui/core';
import { closeModalAction, setModalDataAction } from 'actions/bc-modal/bc-modal.action';
import styles from './bc-send-invoices-modal.styles';
import BCTableContainer from 'app/components/bc-table-container/bc-table-container';
import BCSent from 'app/components/bc-sent';
import { createStyles, makeStyles } from '@material-ui/core';
import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { CSButtonSmall } from "helpers/custom";
import {
  formatCurrency,
  formatDateMMMDDYYYY,
  formatDatTimelll,
  formatShortDateNoDay
} from 'helpers/format';
import {
  getAllInvoicesAPI,
  getAllInvoicesForBulkPaymentsAPI
} from 'api/invoicing.api';
import {
  setCurrentPageIndex,
  setCurrentPageSize,
  setKeyword,
} from 'actions/invoicing/invoices-for-bulk-payments/invoices-for-bulk-payments.action';
import BCDateRangePicker
  , {Range} from "../../components/bc-date-range-picker/bc-date-range-picker";
import DropDownMenu
  from "../../components/bc-select-dropdown/bc-select-dropdown";
import {PAYMENT_STATUS_COLORS} from "../../../helpers/contants";
import moment from "moment/moment";


const SHOW_OPTIONS = [
  {
    value: 'unpaid',
    label: 'Unpaid',
    selectable: true,
  },
  {
    value: '-1',
    label: 'Overdue 1 day or more',
    selectable: true,
  },
  {
    value: '-7',
    label: 'Overdue 7 days or more',
    selectable: true,
  },
  {
    value: '-14',
    label: 'Overdue 14 days or more',
    selectable: true,
  },
  {
    value: '+7',
    label: 'Due within 7 days',
    selectable: true,
  },
  {
    value: 'all',
    label: 'All Invoices',
    selectable: true,
  },
];


const useDebounceInputStyles = makeStyles(() =>
  createStyles({
    textField: {
      '& .MuiOutlinedInput-input': {
        padding: '5px 10px',
      }
    }
  })
);

function BcSendInvoicesModal({ classes, modalOptions, setModalOptions }: any): JSX.Element {
  const dispatch = useDispatch();
  const [selectedIndexes, setSelectedIndexes] = useState<number[]>([]);
  const [selectionRange, setSelectionRange] = useState<Range | null>(null);
  const [customerValue, setCustomerValue] = useState<any>(null);
  const [showValue, setShowValue] = useState<string>('unpaid');
  const [localInvoiceList, setLocalInvoiceList] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const customers = useSelector(({ customers }: any) => customers.data);
  const debounceInputStyles = useDebounceInputStyles();

  // const invoiceList = useSelector(getFilteredList);
  const { invoiceList, loading, total, prevCursor, nextCursor, currentPageIndex, currentPageSize, keyword } = useSelector(
    ({ invoiceList }: any) => ({
      invoiceList: invoiceList.data,
      loading: invoiceList.loading,
      prevCursor: invoiceList.prevCursor,
      nextCursor: invoiceList.nextCursor,
      total: invoiceList.total,
      currentPageIndex: invoiceList.currentPageIndex,
      currentPageSize: invoiceList.currentPageSize,
      keyword: invoiceList.keyword,
    })
  );

  const handleRowClick = (event: any, row: any) => {
    if (selectedIndexes.length === 0) setCustomerValue(row.original.customer);
    const found = selectedIndexes.indexOf(row.original._id);
    const newList = [...selectedIndexes];
    if (found >= 0) {
      newList.splice(found, 1)
      setSelectedIndexes(newList);
    } else {
      newList.push(row.original._id);
      setSelectedIndexes(newList);
    }
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedIndexes(localInvoiceList.map((invoice) => invoice._id));
    } else {
      setSelectedIndexes([]);
    }
  }


  const handleCustomerChange = (event: any, newValue: any) => {
    setCustomerValue(newValue);
  };

  const debouncedFetchFunction = useCallback(
    debounce((value, FormikValues) => {
      setKeyword(value);
      dispatch(getAllInvoicesForBulkPaymentsAPI(currentPageSize, prevCursor, nextCursor, value, undefined, FormikValues.customerId, FormikValues.dueDate, FormikValues.showPaid))
      dispatch(setCurrentPageIndex(0));
    }, 500),
    []
  );


  const closeModal = () => {
    dispatch(closeModalAction());
    setTimeout(() => {
      dispatch(setModalDataAction({
        'data': {},
        'type': ''
      }));
    }, 200);
  };

  useEffect(() => {
    let showpaid = true;
    let dueDate = null;

    if (isNaN(parseInt(showValue))) {
      showpaid = showValue === 'all'
    } else {
      dueDate = moment().add(parseInt(showValue, 10), 'day').toDate();
    }
    dispatch(getAllInvoicesAPI(currentPageSize, undefined, undefined, '' , selectionRange, customerValue?._id, dueDate, showpaid));
    dispatch(setCurrentPageIndex(0));
  }, [customerValue, selectionRange, showValue]);


  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  const columns: any = [
    {
      'Header': () => <>
        <Checkbox
          color="primary"
          classes={{root: classes.checkbox}}
          checked={selectedIndexes.length === localInvoiceList.length}
          indeterminate={selectedIndexes.length > 0 && selectedIndexes.length < localInvoiceList.length}
          onChange={handleSelectAll}
        />
        <span>Invoice ID</span>
      </>,
      'accessor': 'invoiceId',
      'className': 'font-bold',
      'sortable': false,
      Cell({row}: any) {
        return <div>
          <Checkbox
            color="primary"
            classes={{root: classes.checkbox}}
            checked={selectedIndexes.indexOf(row.original._id) >= 0}
          />
          <span>
            {row.original.invoiceId}
          </span>
        </div>;
      },
    },
    {
      Cell({ row }: any) {
        return <div>
          {row.original.dueDate
            ? formatShortDateNoDay(row.original.dueDate)
            : 'N/A'}
        </div>
      },
      'Header': 'Due Date',
      'accessor': 'dueDate',
      'className': 'font-bold',
    },
    {
      'Header': 'Customer',
      'accessor': 'customer.profile.displayName',
      'className': 'font-bold',
    },
    {
      Cell({ row }: any) {
        return <div>
          <span>
            {formatCurrency(row.original.balanceDue ?? row.original.total)}
          </span>
        </div>;
      },
      'Header': 'Amount Due',
      'width': 20
    },
    {
      Cell({ row }: any) {
        const { status = '' } = row.original;
        const textStatus = status.split('_').join(' ').toLowerCase();
        return (
          <div>
            <CSButtonSmall
              variant="contained"
              style={{
                backgroundColor: PAYMENT_STATUS_COLORS[status],
                color: '#fff',
              }}
            >
              <span style={{ textTransform: 'capitalize' }}>{textStatus}</span>
            </CSButtonSmall>
          </div>

        )
      },
      'Header': 'Payment Status',
      'accessor': 'paid',
    },
    { Cell({ row }: any) {
        return row.original.lastEmailSent
          ? formatDatTimelll(row.original.lastEmailSent)
          : 'N/A';
      },
      'Header': 'Last Emailed',
      'accessor': 'lastEmailSent',
      'className': 'font-bold',
      'sortable': true
    },
    {
      Cell({ row }: any) {
        return row.original.createdAt
          ? formatDateMMMDDYYYY(row.original.createdAt)
          : 'N/A';
      },
      'Header': 'Invoice Date',
      'accessor': 'createdAt',
      'className': 'font-bold',
      'sortable': true
    },
  ];

  useEffect(() => {
    if (invoiceList.length > 0) {
      const newInvoiceList = invoiceList.map((item: any) => ({
        ...item,
        'amountToBeApplied': 0,
        'checked': 0,
      }));
      setLocalInvoiceList([...newInvoiceList]);
    } else {
      setLocalInvoiceList([]);
    }
  }, [invoiceList])

  return (
    <DataContainer className={'new-modal-design'}>
        {isSuccess ? (
          <BCSent title={'The payment was recorded.'}/>
        ) : (
          <>
            <Grid container className={'modalPreview'} justify={'space-between'} spacing={2} style={{width: '100%', paddingLeft: 65, paddingRight: 85}}>
              <Grid item xs={5}>
                  <Typography variant={'caption'} className={'previewCaption'}>Customer</Typography>
                  <Autocomplete
                    disabled={loading}
                    getOptionLabel={option => option.profile?.displayName ? option.profile.displayName : ''}
                    getOptionDisabled={(option) => !option.isActive}
                    id={'tags-standard'}
                    onChange={(ev: any, newValue: any) => handleCustomerChange(ev, newValue)}
                    options={customers && customers.length !== 0 ? customers.sort((a: any, b: any) => a.profile.displayName > b.profile.displayName ? 1 : b.profile.displayName > a.profile.displayName ? -1 : 0) : []}
                    renderInput={params => <TextField
                      {...params}
                      InputProps={{ ...params.InputProps, style: { background: '#fff' } }}
                      variant={'outlined'}
                      // error={isCustomerErrorDisplayed}
                      // helperText={isCustomerErrorDisplayed && 'Please Select A Customer'}
                    />
                    }
                    value={customerValue}
                  />
                </Grid>
              <Grid item xs={4}>
                <Typography variant={'caption'} className={'previewCaption'}>Date Range</Typography>
                <BCDateRangePicker
                  range={selectionRange}
                  onChange={setSelectionRange}
                  showClearButton={true}
                  title={'Filter by Invoice Date...'}
                  classes={{button: classes.datePicker}}
                />
              </Grid>
              <Grid item xs={3}>
                  <Typography variant={'caption'} className={'previewCaption'}>SHOW</Typography>
                <DropDownMenu
                  // minwidth='180px'
                  selectedItem={showValue}
                  items={SHOW_OPTIONS}
                  onSelect={(e, item) => setShowValue(item.value)}
                />
              </Grid>
            </Grid>
            <DialogContent classes={{ root: classes.dialogContent }}>
              <BCTableContainer
                columns={columns}
                isLoading={loading}
                tableData={localInvoiceList}
                onRowClick={handleRowClick}
                manualPagination
                fetchFunction={(num: number, isPrev: boolean, isNext: boolean) =>
                  dispatch(getAllInvoicesAPI(num || currentPageSize, isPrev ? prevCursor : undefined, isNext ? nextCursor : undefined, '', selectionRange))
                }
                total={total}
                currentPageIndex={currentPageIndex}
                setCurrentPageIndexFunction={(num: number) => dispatch(setCurrentPageIndex(num))}
                currentPageSize={currentPageSize}
                setCurrentPageSizeFunction={(num: number) => dispatch(setCurrentPageSize(num))}
                setKeywordFunction={(query: string) => dispatch(setKeyword(query))}
              />
            </DialogContent>
          </>
        )}
        <div className={'modalDataContainer'}>
          <DialogActions>
            {/* <Typography variant={'h5'}>
              {!!FormikValues.totalAmount && `Total Amount: $${FormikValues.totalAmount}`}
            </Typography> */}
            <Button
              //disabled={isSubmitting}
              disableElevation={true}
              onClick={() => closeModal()}
              variant={'outlined'}
            >
              Close
            </Button>
            {!isSuccess && (
              <Button
                color={'primary'}
                disableElevation={true}
                //disabled={isSubmitting || loading || !isValid()}
                type={'submit'}
                variant={'contained'}
              >
                Submit All
              </Button>
            )}
          </DialogActions>
        </div>
    </DataContainer >
  );
};

const DataContainer = styled.div`
  *:not(.MuiGrid-container) > .MuiGrid-container {
    width: 100%;
    padding: 10px 40px;
  }
  .MuiGrid-spacing-xs-4 > .MuiGrid-spacing-xs-4 {
    margin: -16px 0;
  }
  .MuiGrid-grid-xs-true {
    padding: 16px;
  }
  .MuiOutlinedInput-root {
    border-radius: 8px;
    padding: 2px;
  }

  .MuiOutlinedInput-input {
    padding: 9.5px 4px;
  }

  span.required:after {
    margin-left: 3px;
    content: "*";
    color: red;
  }
`;


export default withStyles(
  styles,
  { 'withTheme': true }
)(BcSendInvoicesModal);
