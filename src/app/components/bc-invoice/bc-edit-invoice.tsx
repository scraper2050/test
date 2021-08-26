import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  withStyles
} from '@material-ui/core';
import styles from './bc-invoice.styles';
import {createMuiTheme, makeStyles, MuiThemeProvider, Theme} from '@material-ui/core/styles';
import * as CONSTANTS from '../../../constants';
import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase';
import FormControl from '@material-ui/core/FormControl';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';

import {getContacts} from '../../../api/contacts.api';
import {loadInvoiceItems} from '../../../actions/invoicing/items/items.action';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StorefrontIcon from '@material-ui/icons/Storefront';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {PageHeader} from '../../pages/customer/job-reports/view-invoice-edit';
import {useHistory} from 'react-router-dom';
import {blue} from '@material-ui/core/colors';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {KeyboardDatePicker} from '@material-ui/pickers';
import InputAdornment from '@material-ui/core/InputAdornment';
import EventIcon from '@material-ui/icons/Event';
import {TextFieldProps} from '@material-ui/core/TextField';
import BCInvoiceItemsTableRow from './bc-invoice-table-row';
import AddIcon from '@material-ui/icons/Add';
import {getCustomerDetailAction} from "../../../actions/customer/customer.action";

interface Props {
  classes?: any;
  invoiceDetail?: any;
}

const invoicePageStyles = makeStyles((theme: Theme) =>
  createStyles({
    companyLogo: {
      width: '100%',
      '& > img': {
        width: '100%',
      }
    },
    customerBox: {
      marginTop: '10px',
      fontSize: '12px',
      lineHeight: '14px',
      color: '#4F4F4F',
      '& > div': {
        fontSize: 12,
        display: 'flex',
        '& > span': {
          display: 'flex',
          marginLeft: 5,
          color: CONSTANTS.PRIMARY_DARK_GREY,
        }
      }
    },
    serviceAdd: {
      fontSize: '10px',
      lineHeight: '12px',
      textTransform: 'uppercase',
      color: '#828282',
    },
    infoBox: {
      display: 'flex',
      flexDirection: 'column',
      '& > div': {
        fontSize: 12,
        marginTop: 5,
        display: 'flex',
        '& > span': {
          marginLeft: 5,
          color: CONSTANTS.PRIMARY_DARK_GREY,
        }
      },
      '& > h4': {
        paddingLeft: 20,
        color: CONSTANTS.PRIMARY_DARK_GREY
      },
      '& > h5': {
        fontSize: 10,
        fontWeight: 300,
        lineHeight: '12px',
        textTransform: 'uppercase',
        marginBottom: 0,
        paddingLeft: 20,
        /* color: CONSTANTS.PRIMARY_DARK_GREY,*/
        color: '#828282',
      },
    },
    paddingContent: {
      paddingLeft: 20,
      /* color: CONSTANTS.PRIMARY_DARK_GREY,*/
      fontWeight: 500,
      fontSize: '12px',
      lineHeight: '14px',
      color: '#4F4F4F',

    },
    storeIcons: {
      fontSize: 12,
      /* color: CONSTANTS.PRIMARY_DARK_GREY*/
      color: '#D0D3DC',
    },

    margin: {
      margin: theme.spacing(1),
    },
    white: {
      color: '#fff',
    },
    bgDark: {
      backgroundColor: '#D0D3DC',
    },
    bcButton: {
      border: '1px solid #4F4F4F',
      borderRadius: '8px',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      color: '#4F4F4F',
      padding: '8px 16px',
    },
    bcBlueBt: {
      border: '1px solid #00AAFF',
      background: '#00AAFF',
      color: 'white',
    },
    bcBorderW: {
      borderLeftColor: '#FFF',
    },
    bcRMargin: {
      marginRight: '11px',
    },
    // custom input
    formField: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    formFieldFullWidth: {
      margin: theme.spacing(1),
      width: '100%'
    },
    formFieldRow: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      fontStyle: 'normal',
      fontWeight: 500,
      fontSize: '14px',
      lineHeight: '16px',
      textTransform: 'uppercase',
      color: '#4F4F4F',

    },
    bootstrapRoot: {
      'label + &': {
        marginTop: 0,
        display: 'flex',
        minWidth: '50%'
      },
      '&': {
        marginTop: 0,
        display: 'flex',
        minWidth: '50%'
      },
    },
    bootstrapTextAreaRoot: {
      'label + &': {
        marginTop: 0,
        display: 'flex',
        minWidth: '100%'
      },
    },
    bootstrapRootError: {
      borderRadius: 8,
      border: `1px solid ${CONSTANTS.PRIMARY_ORANGE}`,
    },
    bootstrapInputLarge: {
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 20,
      fontWeight: 'bold',
      width: '100%',
      padding: '5px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    noBorder: {
      border: 'none'
    },
    bootstrapInput: {
      color: '#4F4F4F!important',
      fontWeight: 'normal',
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 14,
      width: '100%',
      padding: '12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapTextAreaInput: {
      color: '#4F4F4F!important',
      borderRadius: 8,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      border: '1px solid #E0E0E0',
      fontSize: 14,
      width: '100%',
      minHeight: 100,
      padding: '11px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        borderRadius: 8,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
    bootstrapTextTitle: {

      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 28,
      lineHeight: 35,
      textTransform: 'uppercase',
      color: '#4F4F4F',

    },
    bootstrapFormLabel15: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 60,
      color: CONSTANTS.PRIMARY_DARK_GREY,
      paddingTop: '15px',
    },
    bootstrapFormLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      transform: 'none',
      marginRight: 20,
      color: CONSTANTS.PRIMARY_DARK_GREY
    },
    totalContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: 195,
      fontWeight: 500,
      fontSize: '20px',
      lineHeight: '23px',
      textTransform: 'uppercase',
      color: '#828282',

      '& > div': {
        '& > small': {
          color: CONSTANTS.INVOICE_HEADING,
          fontSize: 14,
          marginBottom: 5
        },
      },
    },
    totalEnd: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      fontWeight: 500,
      fontSize: '48px',
      lineHeight: '56px',
      textAlign: 'right',
      color: '#4F4F4F',
      '& > h1': {
        margin: 0,
        padding: 0
      }
    },

    bgGray: {
      backgroundColor: CONSTANTS.INVOICE_TOP,
    },
    bgGray25: {
      backgroundColor: CONSTANTS.INVOICE_TOP,
      paddingRight: 25,
    },
    textCenter: {
      textAlign: 'center'
    },
    textRight: {
      textAlign: 'right'
    },
    textBold: {
      fontWeight: 'bold',
    },

  }),
);


const useInvoiceTableStyles = makeStyles((theme: Theme) =>
  createStyles({
    // items table
    itemsTableHeader: {
      padding: '15px 10px',
      backgroundColor: CONSTANTS.INVOICE_TOP,
      color: CONSTANTS.INVOICE_TABLE_HEADING,
    },
    itemsTableRoot: {
      padding: '15px 0'
    },
    itemsTableActions: {
      padding: '0 5px',
      marginBottom: 20,
      marginTop: 20,
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'inherit'
      }
    },
    MuiCard: {
      root: {
        margin: 10,
        boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.1)',
        borderRadius: 4,
      },
    },
    MuiCardHeader: {
      root: {
        padding: '18px 20px',
        backgroundColor: CONSTANTS.INVOICE_TOP,
        mixBlendMode: 'multiply',
        borderRadius: '4px 4px 0px 0px',
      },
      title: {
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '16px',
        textTransform: 'uppercase',
        color: '#828282',
      }
    },
    MuiCardContent: {
      root: {
        padding: '35px 20px',
      }
    },
    MuiFormControl: {
      root: {
        margin: 0
      }
    },
    MuiInputLabel: {
      formControl: {
        position: 'relative'
      }
    },
    MuiAccordionSummary: {
      root: {
        backgroundColor: CONSTANTS.SECONDARY_GREY,
        '&$expanded': {
          minHeight: 48
        },
      },
      content: {
        color: CONSTANTS.INVOICE_HEADING,
        '&$expanded': {
          margin: 0,
          color: CONSTANTS.INVOICE_HEADING,
        },
      },
      expandIcon: {
        padding: 0
      },
      expanded: {
        minHeight: 48
      }
    },
    MuiDivider: {
      root: {
        margin: '10px 0'
      }
    }
  },
});

interface Props {
  classes?: any;
  invoiceData?: any;
  isOld?: false;
}

const InvoiceValidationSchema = Yup.object().shape({
  invoice_id: Yup.string()
    .required('Required'),
  invoice_title: Yup.string()
    .required('Required'),
  customer_po: Yup.string()
    .required('Required'),
  invoice_date: Yup.string()
    .required('Required'),
  due_date: Yup.string()
    .required('Required'),
  terms: Yup.string()
    .required('Required'),
  company: Yup.string()
    .required('Required'),
});

function BCEditInvoice({classes, invoiceData, isOld}: Props) {
  const invoiceStyles = invoicePageStyles();
  const invoiceTableStyle = useInvoiceTableStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const {isLoading, refresh, contacts} = useSelector((state: any) => state.contacts);
  const [invoiceDetail, setInvoiceDetail] = useState(invoiceData);

  const [invoiceItems, setInvoiceItems] = useState(invoiceData.items);

  const {'data': paymentTerms, isLoading: loadingPaymentTerms, done, updating, error} = useSelector(({paymentTerms}: any) => paymentTerms);
  const customer = useSelector(({ customers }:any) => customers.customerObj);
  //console.log({customer});
  const { itemTier, isCustomPrice } = useMemo(() => customer, [customer]);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [duedatePickerOpen, setDueDatePickerOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(invoiceData?.subTotal || 0);
  const [totalTax, setTotalTax] = useState(invoiceData.taxAmount || 0);
  const [totalAmount, setTotalAmount] = useState(invoiceData.total || 0);
  //console.log({invoiceItems});
  //console.log('log-invoiceItems', invoiceDetail);

  const calculateTotal = (itemsArray:any) => {
    if (isCustomPrice && invoiceDetail) {
      setTotalAmount(invoiceDetail.total);
    } else {
      const subtotalAmount = itemsArray.map((item:any) => item.price * item.quantity).reduce((a: any, b: any) => {
        return a + b;
      }, 0);

      const totalTax = itemsArray.map((item:any) => item.taxAmount).reduce((a: any, b: any) => {
        return a + b;
      }, 0);
      const amount = subtotalAmount + totalTax;
      setSubTotal(Math.round((subtotalAmount + Number.EPSILON) * 100) / 100);
      setTotalTax(Math.round((totalTax + Number.EPSILON) * 100) / 100);
      setTotalAmount(Math.round((amount + Number.EPSILON) * 100) / 100);
    }
    setInvoiceItems(itemsArray);
  };

  const addItem = () => {
    const item = {
      'description': '',
      'isFixed': true,
      'name': '',
      'price': 0,
      'quantity': 1,
      'tax': 0,
      'taxAmount': 0,
      'total': 0
    };

    const tempArray = [
      ...invoiceItems,
      item
    ];
    //console.log('addItem: '+JSON.stringify(newData, null, 4));

    setInvoiceItems(tempArray);
  };

  useEffect(() => {
    dispatch(loadInvoiceItems.fetch());
    setInvoiceDetail(invoiceData);
    setInvoiceItems(invoiceData.items);
  }, []);

  useEffect(() => {
    const data: any = {
      type: 'Customer',
      referenceNumber: invoiceDetail?.customer?._id
    }

    dispatch(getContacts(data));
  }, [refresh]);

  return (
    <MuiThemeProvider theme={theme}>
      <Formik
        initialValues={{
          invoice_title: '',
          invoiceId: invoiceDetail?.invoiceId ? invoiceDetail?.invoiceId : 'Invoice 1',
          customer_po: '',
          invoice_date: invoiceDetail.createdAt,
          due_date: invoiceDetail.dueDate,
          paymentTerm: invoiceDetail?.paymentTerm ? invoiceDetail?.paymentTerm?._id : '',
          terms: '',
          message: '',
          company: '',
          items: invoiceItems ? invoiceItems : []
        }}
        validationSchema={InvoiceValidationSchema}
        onSubmit={(values) => {
          console.log('log-values', values);
        }}
      >
        {({submitForm, handleChange, setFieldValue, values, isSubmitting, touched, errors}) => {
          console.log('log-errors', errors);


          return (
            <Form>
              <PageHeader style={{padding: '0 10px'}}>
                <div>
                  <IconButton
                    color="default"
                    size="small"
                    className={classNames(invoiceStyles.bgDark, invoiceStyles.white)}
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <ArrowBackIcon/>
                  </IconButton>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="default"
                    className={classNames(invoiceStyles.bcButton, invoiceStyles.bcRMargin)}
                  >
                    Preview
                  </Button>
                  <ButtonGroup disableElevation>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      className={classNames(invoiceStyles.bcButton, invoiceStyles.bcBlueBt)}
                    >
                      Save and Continue
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            className={classNames(invoiceStyles.bcButton, invoiceStyles.bcBorderW, invoiceStyles.bcBlueBt)}>
                      <ArrowDropDownIcon/>
                    </Button>
                  </ButtonGroup>
                </div>
              </PageHeader>
              <DataContainer>
                <Card elevation={2}>
                  <CardHeader title={invoiceDetail?.company?.info?.companyName + ' INVOICE DETAILS'}/>
                  <CardContent>
                    <Grid container spacing={5}>
                      <Grid item xs={2}>
                        <div className={invoiceStyles.companyLogo}>
                          <img src={invoiceData?.company?.info?.logoUrl}/>
                        </div>
                      </Grid>
                      <Grid item xs={3}>
                        <div className={invoiceStyles.infoBox}>
                          <h4>{invoiceDetail?.company?.info?.companyName}</h4>
                          <div><PhoneIcon
                            className={invoiceStyles.storeIcons}/><span>{invoiceDetail?.company?.contact?.phone}</span>
                          </div>
                          <div><MailOutlineIcon
                            className={invoiceStyles.storeIcons}/><span>{invoiceDetail?.company?.info?.companyEmail}</span>
                          </div>
                          <div><StorefrontIcon
                            className={invoiceStyles.storeIcons}/><span>{invoiceDetail?.company?.address?.street}, {invoiceDetail?.company?.address?.city}, {invoiceDetail?.company?.address?.state} {invoiceDetail?.company?.address?.zipCode}</span>
                          </div>
                          <h5>VENDOR NUMBER</h5>
                          <div className={invoiceStyles.paddingContent}>{invoiceDetail?.customer?.vendorId}</div>
                        </div>
                      </Grid>
                      <Grid item xs>

                        <FormControl className={invoiceStyles.formField}>
                          <InputBase
                            id="invoice-title"
                            name="invoice_title"
                            disabled
                            defaultValue="INVOICE"
                            classes={{
                              root: classNames(invoiceStyles.bootstrapRoot),
                              input: classNames(invoiceStyles.bootstrapInputLarge, invoiceStyles.bootstrapTextTitle, invoiceStyles.textRight, invoiceStyles.noBorder),
                            }}

                          />
                        </FormControl>

                        <FormControl className={invoiceStyles.formField}>
                          <InputLabel disableAnimation htmlFor="invoice-id"
                                      className={invoiceStyles.bootstrapFormLabel}>
                            Invoice #
                          </InputLabel>
                          <InputBase
                            id="invoice-id"
                            name="invoiceId"
                            value={values.invoiceId}
                            error={!!errors.invoiceId}
                            onChange={handleChange('invoiceId')}
                            classes={{
                              root: classNames(invoiceStyles.bootstrapRoot, {
                                [invoiceStyles.bootstrapRootError]: !!errors.invoiceId
                              }),
                              input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textRight),
                            }}
                          />
                        </FormControl>

                        <FormControl className={invoiceStyles.formField}>
                          <InputLabel disableAnimation htmlFor="customer-po"
                                      className={invoiceStyles.bootstrapFormLabel}>
                            CUSTOMER PO
                          </InputLabel>
                          <InputBase
                            id="customer-po"
                            name="customer_po"
                            defaultValue="12434"
                            error={!!errors.customer_po}
                            onChange={handleChange('customer_po')}
                            classes={{
                              root: classNames(invoiceStyles.bootstrapRoot, {
                                [invoiceStyles.bootstrapRootError]: !!errors.customer_po
                              }),
                              input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textRight),
                            }}
                          />
                        </FormControl>

                        <FormControl className={invoiceStyles.formField}>
                          <InputLabel disableAnimation htmlFor="invoice-date"
                                      className={invoiceStyles.bootstrapFormLabel}>
                            INVOICE DATE
                          </InputLabel>
                          <KeyboardDatePicker
                            open={datePickerOpen}
                            margin="none"
                            size="small"
                            id="invoice-date"
                            name="invoice_date"
                            format="MMM. dd, yyyy"
                            value={values.invoice_date}
                            autoOk
                            onChange={(selectedInvoiceDate) => {
                              setDatePickerOpen(false);
                              setFieldValue('invoice_date', moment(selectedInvoiceDate).format('MMM. DD, YYYY'));
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                            onClick={() => setDatePickerOpen(true)}
                            onClose={() => setDatePickerOpen(false)}
                            TextFieldComponent={(props: TextFieldProps) => {
                              return (
                                <InputBase
                                  id="invoice-date"
                                  name="invoice_date"
                                  error={!!errors.invoice_date}
                                  onClick={(e) => {
                                    setDatePickerOpen(true);
                                  }}
                                  value={props.value}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton>
                                        <EventIcon/>
                                      </IconButton>
                                    </InputAdornment>
                                  }

                                  onChange={props.onChange}
                                  classes={{
                                    root: classNames(invoiceStyles.bootstrapRoot, {
                                      [invoiceStyles.bootstrapRootError]: !!errors.invoice_date
                                    }),
                                    input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textRight),
                                  }}
                                />
                              )
                            }}
                          />
                        </FormControl>

                        <FormControl className={invoiceStyles.formField}>
                          <InputLabel disableAnimation htmlFor="due-date" className={invoiceStyles.bootstrapFormLabel}>
                            DUE DATE
                          </InputLabel>
                          <KeyboardDatePicker
                            open={duedatePickerOpen}
                            InputAdornmentProps={{position: 'end'}}
                            margin="none"
                            size="small"
                            id="due-date"
                            name="due_date"
                            format="MMM. dd, yyyy"
                            value={values.due_date}
                            autoOk
                            onChange={(selectedInvoiceDate) => {
                              setDueDatePickerOpen(false);
                              setFieldValue('due_date', moment(selectedInvoiceDate).format('MMM. DD, YYYY'));
                            }}
                            onClick={() => setDueDatePickerOpen(true)}
                            onClose={() => setDueDatePickerOpen(false)}

                            TextFieldComponent={(props: TextFieldProps) => {
                              return (
                                <InputBase
                                  id="due-date"
                                  name="due_date"
                                  error={!!errors.due_date}
                                  onClick={(e) => {
                                    setDueDatePickerOpen(true);
                                  }}
                                  value={props.value}

                                  endAdornment={
                                    <InputAdornment position="end">
                                      <IconButton>
                                        <EventIcon/>
                                      </IconButton>
                                    </InputAdornment>
                                  }
                                  onChange={props.onChange}
                                  classes={{
                                    root: classNames(invoiceStyles.bootstrapRoot, {
                                      [invoiceStyles.bootstrapRootError]: !!errors.due_date
                                    }),
                                    input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textRight),
                                  }}
                                />
                              )
                            }}
                          />
                        </FormControl>

                        <FormControl className={invoiceStyles.formField}>
                          <InputLabel disableAnimation htmlFor="terms" className={invoiceStyles.bootstrapFormLabel}>
                            TERMS
                          </InputLabel>
                          <Select
                            onChange={handleChange('paymentTerm')}
                            value={values.paymentTerm}
                            input={<InputBase
                              classes={{
                                root: classNames(invoiceStyles.bootstrapRoot, {
                                  [invoiceStyles.bootstrapRootError]: !!errors.paymentTerm
                                }),
                                input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textRight),
                              }}
                              error={!!errors.paymentTerm}/>}
                          >
                            <MenuItem value={''}>
                              <em>None</em>
                            </MenuItem>
                            {
                              paymentTerms.map((pitem: any, pindex: number) => {
                                return (
                                  <MenuItem key={pitem._id} value={pitem._id}>{pitem.name}</MenuItem>
                                )
                              })

                            }

                          </Select>
                        </FormControl>

                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <Card elevation={2}>
                      <CardHeader title="BILL TO"/>
                      <CardContent style={{minHeight: '190px'}}>
                        <FormControl className={invoiceStyles.formFieldRow}>
                          {
                            isOld ?
                              <>
                                <InputLabel disableAnimation htmlFor="company"
                                            className={invoiceStyles.bootstrapFormLabel15}>
                                  COMPANY NAME
                                </InputLabel>
                                <Select
                                  id="company"
                                  disabled
                                  onChange={handleChange('company')}
                                  value={invoiceDetail?.customer?.profile?.displayName}
                                  input={<InputBase
                                    classes={{
                                      root: classNames(invoiceStyles.bootstrapRoot),
                                      input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textBold),
                                    }}
                                    error={!!errors.company}/>}
                                >

                                  <MenuItem value={invoiceDetail?.customer?.profile?.displayName} selected>
                                    {invoiceDetail?.customer?.profile?.displayName}</MenuItem>

                                </Select>

                              </> :
                              <>
                                <InputLabel disableAnimation htmlFor="company"
                                            className={invoiceStyles.bootstrapFormLabel15}>
                                  COMPANY NAME
                                </InputLabel>
                                <Select
                                  id="company"
                                  onChange={handleChange('company')}
                                  input={<InputBase
                                    classes={{
                                      root: classNames(invoiceStyles.bootstrapRoot, {
                                        [invoiceStyles.bootstrapRootError]: !!errors.company
                                      }),
                                      input: classNames(invoiceStyles.bootstrapInput, invoiceStyles.textBold),
                                    }}
                                    error={!!errors.company}/>}
                                >
                                  <MenuItem value="">
                                    <em>None</em>
                                  </MenuItem>

                                </Select>
                              </>
                          }

                        </FormControl>
                        <Grid container spacing={1} className={invoiceStyles.customerBox}>
                          <Grid item xs={3} justify="flex-end">
                            <div>
                              <div><span><PhoneIcon className={invoiceStyles.storeIcons}/></span></div>
                              <div><span><MailOutlineIcon className={invoiceStyles.storeIcons}/></span></div>
                              <div><span><StorefrontIcon className={invoiceStyles.storeIcons}/></span></div>
                            </div>
                          </Grid>
                          <Grid item xs={4}>
                            <div>
                              <div><span>{invoiceDetail?.customer?.contact?.phone}</span></div>
                              <div><span>{invoiceDetail?.customer?.info?.email}</span></div>
                              <div>
                                <span>{invoiceDetail?.customer?.address?.street}, {invoiceDetail?.customer?.address?.city}, {invoiceDetail?.customer?.address?.state} {invoiceDetail?.customer?.address?.zipCode}</span>
                              </div>

                            </div>

                          </Grid>
                          <Grid item xs={5}>
                            <div className={invoiceStyles.serviceAdd}>service address</div>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs>
                    <Card elevation={2} style={{
                      border: '2px solid #D0D3DC',
                      boxSizing: 'border-box',
                      boxShadow: '0px 0px 5px 2px rgba(0, 0, 0, 0.1)',
                      borderRadius: '4px'
                    }}>
                      <CardContent style={{padding: '20px'}}>
                        <div className={invoiceStyles.totalContainer}>
                          <div>
                            TOTAL
                          </div>
                          <div className={invoiceStyles.totalEnd}>
                            ${totalAmount}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Card elevation={2}>
                  <BCInvoiceItemsTableRow
                    invoiceItems={invoiceItems}
                    itemTier={itemTier}
                    handleChange={() => 'test'}
                    setItems={calculateTotal}
                    values={values}
                    errors={errors}
                  />

                  <div className={invoiceTableStyle.itemsTableActions}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs={7}>
                        <Button color="primary" onClick={addItem}>
                          <AddIcon color="inherit" /> Add item or service
                        </Button>
                      </Grid>
                      <Grid item xs={2} className={invoiceStyles.textRight}>
                        SUBTOTAL
                      </Grid>
                      <Grid item xs={1}>
                        <span>
                          $ {subTotal}
                        </span>
                      </Grid>
                      <Grid item xs={1} className={invoiceStyles.textRight}>
                        TAXES
                      </Grid>
                      <Grid item xs={1}>
                        <span>
                          $ {totalTax}
                        </span>
                      </Grid>
                    </Grid>
                  </div>
                </Card>

                <Card elevation={2}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      className={invoiceStyles.bgGray25}
                      expandIcon={<ArrowDropDownIcon/>}
                      aria-controls="message-to-customer"
                    >
                      MESSAGE TO CUSTOMER
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl className={invoiceStyles.formFieldFullWidth}>
                        <InputBase
                          id="message-to-customer"
                          name="message_to_customer"
                          defaultValue=""
                          multiline
                          placeholder="NOTE TO CUSTOMER"
                          onChange={handleChange('message_to_customer')}
                          classes={{
                            root: invoiceStyles.bootstrapTextAreaRoot,
                            input: invoiceStyles.bootstrapTextAreaInput,
                          }}
                        />
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Card>

                <Card elevation={2}>
                  <Accordion defaultExpanded>
                    <AccordionSummary

                      className={invoiceStyles.bgGray25}
                      expandIcon={<ArrowDropDownIcon/>}
                      aria-controls="invoice-footer"
                    >
                      FOOTER
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormControl className={invoiceStyles.formFieldFullWidth}>
                        <InputBase
                          id="invoice-footer"
                          name="invoice_footer"
                          defaultValue=""
                          multiline
                          placeholder="ldiservices.net"
                          onChange={handleChange('invoice_footer')}
                          classes={{
                            root: invoiceStyles.bootstrapTextAreaRoot,
                            input: invoiceStyles.bootstrapTextAreaInput,
                          }}
                        />
                      </FormControl>
                    </AccordionDetails>
                  </Accordion>
                </Card>

              </DataContainer>
              <PageHeader style={{padding: '0 10px', marginTop: '25px',}}>
                <div>
                  <IconButton
                    color="default"
                    size="small"
                    className={classNames(invoiceStyles.bgDark, invoiceStyles.white)}
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    <ArrowBackIcon/>
                  </IconButton>
                </div>
                <div>
                  <Button
                    variant="outlined"
                    color="default"
                    className={classNames(invoiceStyles.bcButton, invoiceStyles.bcRMargin)}
                  >
                    Preview
                  </Button>
                  <ButtonGroup disableElevation>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                      className={classNames(invoiceStyles.bcButton, invoiceStyles.bcBlueBt)}
                    >
                      Save and Continue
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            className={classNames(invoiceStyles.bcButton, invoiceStyles.bcBorderW, invoiceStyles.bcBlueBt)}>
                      <ArrowDropDownIcon/>
                    </Button>
                  </ButtonGroup>
                </div>
              </PageHeader>
            </Form>
          )
        }}
      </Formik>
    </MuiThemeProvider>
  )
}

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;
`;


export default withStyles(styles)(BCEditInvoice);
