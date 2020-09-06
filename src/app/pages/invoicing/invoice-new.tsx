import React, { useRef, useEffect, useState } from 'react'
import {
    withStyles, createStyles, Theme,
    CircularProgress,
    Button,
    TextField,
    Backdrop,
    Paper,
    Icon,
    Input, Select,
    Divider,
    Box,
    Table, TableContainer, TableHead, TableBody, TableRow, TableCell,
} from '@material-ui/core'
import styled from 'styled-components'
import NativeSelect from '@material-ui/core/NativeSelect'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import InputAdornment from '@material-ui/core/InputAdornment'
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import moment, {Moment} from 'moment'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactToPrint from 'react-to-print'

import { getCustomers} from '../../../actions/customer/customer.action'
import { getSalesTax } from '../../../actions/tax/tax.action'
import { RootState } from '../../../reducers'
import useStyles from './invoicing.styles'
import { Customer } from '../../../reducers/customer.types'
import {InvoiceItem} from '../../../reducers/invoicing.types'
import MouseoverButton from '../../components/bc-mouseover-button'
import { TaxsState } from 'reducers/tax.type'
import {warning, error} from '../../../actions/snackbar/snackbar.action'
import BCPaper from '../../components/bc-paper/bc-paper'
export interface NewInvoiceProps {
}

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const customerFilter = createFilterOptions({
    stringify: (option: Customer | string) => {
        if (typeof option === 'string') {
            return ''
        }
        return option.profile.displayName
    }
})

interface InvoiceTableRowProps {
    item: InvoiceItem
    index: number
}
interface InvoiceTableProps {
}
const getAmount: (item: InvoiceItem)=>number = item=>{
    return item.price * item.quantity * (100 - item.tax) / 100
}
const getSubtotal: (items: InvoiceItem[])=>number = items=>{
    var total = 0
    items.map(item=>{
        total += item.price * item.quantity * (100 - item.tax) / 100
    })
    return total
}
const getTaxtotal: (items: InvoiceItem[])=>number = items=>{
    var total = 0
    items.map(item=>{
        total += item.price * item.quantity * (item.tax) / 100
    })
    return total
}
const getTotal: (items: InvoiceItem[])=>number = items=>{
    var total = 0
    items.map(item=>{
        total += item.price * item.quantity
    })
    return total
}

const FoldedInvoice = styled.div`
margin-top: 10px;
padding: 20px;
position: relative;
width: 900px;
/* height: 300px; */
border: 2px solid rgba(0,0,0,0.5);
-webkit-box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
-moz-box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
box-shadow: 0px 5px 5px rgba(0,0,0,0.3);
&:before {
    content: "";
    position: absolute;
    top: 0;
    right: -2px;
    border-width: 0 70px 70px 0;
    border-style: solid;
    border-color: gray white;
    -webkit-box-shadow: 7px 7px 7px rgba(0,0,0,0.3);
    -moz-box-shadow: 0px 7px 7px rgba(0,0,0,0.3);
    box-shadow: 0px 7px 7px rgba(0,0,0,0.3);}
&:after {
    content: "";
    position: absolute;
    top: -2px;
    right: -14.5px;
    width: 15px;
    display: block;
    height: 2px;
    border-top: 69px solid white;
    border-left: 69px solid gray;
    /* opacity: 0; */
    box-shadow: none;
    z-index: 1;}`

const NewInvoice: React.FC<NewInvoiceProps> = () => {
    const printRef = useRef(null)
    const tableRef = useRef(null)
    const [invoiceSubtotal, setInvoiceSubtotal] = useState(0)
    const [invoiceTotal, setInvoiceTotal] = useState(0)
    const [invoiceTax, setInvoiceTax] = useState(0)
    const [openDraftDialog, setOpenDraftDialog] = useState(false)
    const [openPrintDialig, setOpenPrintDialig] = useState(false)
    const [invoiceID, setInvoiceID] = useState<number|null>(null)
    const [dueDate, setDueDate] = useState<Moment|null>(null)
    const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([])
    const taxsState = useSelector((state: RootState) => state.taxsState)
    const [defualtTaxIndex, setdefualtTaxIndex] = useState<number>(-1)
    const classes = useStyles({ back: true })
    const history = useHistory()
    const dispatch = useDispatch()
    const handleClickBack = () => {
        if (invoiceItems.length > 0) {
            setOpenDraftDialog(true)
            return
        }
        // history.push('/invoicing/jobs')
        history.goBack()
    }
    useEffect(() => {
        dispatch(getCustomers())
        dispatch(getSalesTax())
    }, [])
    const customersState = useSelector((state: RootState) => state.customersState)
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const handleClickAddItem = () => {
        invoiceItems.push({
            name: '',
            description: '',
            price: 0,
            tax: defualtTaxIndex===-1?0:taxsState.taxs?.[defualtTaxIndex].tax||0,
            quantity: 1,
            unit: 0
        })
        setInvoiceItems([...invoiceItems])
    }
    const handleClickRemoveItem = (index: number) => {
        invoiceItems.splice(index, 1)
        setInvoiceItems([...invoiceItems])
    }
    const updateItem = () => {
        setInvoiceSubtotal(getSubtotal(invoiceItems))
        setInvoiceTax(getTaxtotal(invoiceItems))
        setInvoiceTotal(getTotal(invoiceItems))
    }

    const handleCancelDraftDialog = (save: boolean) => {
        setOpenDraftDialog(false)
        if (save) {

        } else {
            history.goBack()
        }
    }
    const InvoiceTable: React.FC<InvoiceTableProps> = () => {
        const classes = useStyles({ back: true })
        const handleChangeTax = (e: React.ChangeEvent<{ value: unknown }>) => {
            const value = Number(e.target.value)
            if (value == -1 || taxsState.taxs == undefined) {
                invoiceItems.map(item=>{
                    item.tax = 0
                })
            } else if (taxsState.taxs.length > value) {
                invoiceItems.map(item=>{
                    item.tax = taxsState.taxs?.[value].tax||0
                })

            } else {
                return
            }
            setInvoiceItems(invoiceItems)
            setdefualtTaxIndex(value)
            updateItem()
        }
        const InvoiceTableRow: React.FC<InvoiceTableRowProps> = ({ item, index }: InvoiceTableRowProps) => {
            const [total, settotal] = useState<number>(getAmount(item))
            const updateTotal = () => {
                settotal(getAmount(item))
                updateItem()
            }
            return (
                <TableRow>
                    <TableCell variant='body'>{index + 1}</TableCell>
                    <TableCell variant='body'>
                        <Input
                            disableUnderline
                            type="text"
                            defaultValue={item.name}
                            onChange={e => {
                                item.name = e.target.value
                            }} />
                    </TableCell>
                    <TableCell variant='body'>
                        <Input
                            disableUnderline
                            type='number'
                            defaultValue={item.quantity}
                            onChange={e => {
                                item.quantity = Number(e.target.value)
                                updateTotal()
                            }}
                        />
                    </TableCell>
                    <TableCell variant='body'>
                        <Input
                            disableUnderline
                            type='number'
                            defaultValue={item.price}
                            onChange={e => {
                                item.price = Number(e.target.value)
                                updateTotal()
                            }}
                        />
        
                    </TableCell>
                    <TableCell variant='body'>
                        <NativeSelect disableUnderline defaultValue={0}>
                            <option value={0}>Fixed</option>
                            <option value={1}>Hour(s)</option>
                        </NativeSelect>
                    </TableCell>
                    <TableCell variant='body'>
                        <NativeSelect
                            disableUnderline
                            defaultValue={item.tax}
                            onChange={e => {
                                item.tax = Number(e.target.value)
                                updateTotal()
                            }}
        
                        >
                            <option value={0}>0</option>
                            {
                                taxsState.taxs?.map(tax => {
                                    return <option value={tax.tax} key={tax._id}>{tax.tax}</option>
                                })
                            }
                        </NativeSelect>
                    </TableCell>
                    <TableCell variant='body'>{total}</TableCell>
                    <TableCell variant='body'>
                        <MouseoverButton name='remove'
                            onClick={() => handleClickRemoveItem(index)}
                        />
                    </TableCell>
                </TableRow>
        
            )
        }
        return (
            <TableContainer className={classes.invoiceTable}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head'>#</TableCell>
                            <TableCell variant='head'>Service/Product</TableCell>
                            <TableCell variant='head'>Quantity</TableCell>
                            <TableCell variant='head'>Price $</TableCell>
                            <TableCell variant='head'>Unit</TableCell>
                            <TableCell variant='head'>
                                Tax&nbsp;
                                <Select
                                    disableUnderline
                                    defaultValue={defualtTaxIndex}
                                    value={defualtTaxIndex}
                                    onChange={handleChangeTax}
                                    >
                                    <option value={-1}>0</option>
                                    {
                                        taxsState.taxs?.map((tax, index) => {
                                            return (
                                                <option key={tax._id} value={index}>{`${tax.tax}`}</option>
                                            )
                                        })
                                    }
                                    <option value='1000'>Add a new tax</option>
                                </Select>
                                %
                            </TableCell>
                            <TableCell variant='head'>Total $</TableCell>
                            <TableCell variant='head'></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            invoiceItems.map((invoiceItem, index) => {
                                return (
                                    <InvoiceTableRow key={index} index={index} item={invoiceItem}/>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
    const invoicetable = React.useMemo(()=>{
        return (
            <InvoiceTable/>
        )
    }, [invoiceItems, taxsState, defualtTaxIndex])
    const handleInvoiceID = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value) {
            setInvoiceID(Number(value))
        }
    }
    const handleInvoiceDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value) {
            setDueDate(moment(value))
        }
    }

    const totalTable = (
        <TableContainer>
            <Table>
            <TableBody className={classes.floatRight}>
                <TableRow>
                    <TableCell style={{width: 200}}>Subtotal($)</TableCell>
                    <TableCell>{invoiceSubtotal}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Tax %</TableCell>
                    <TableCell>{invoiceTax}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Total($)</TableCell>
                    <TableCell>{invoiceTotal}</TableCell>
                </TableRow>

            </TableBody>
            </Table>
        </TableContainer>
    )
    const handleInformation = () => {

    }
    return (
        <div className={classes.jobs}>
            <Button
                color='primary'
                className={classes.button}
                startIcon={<ChevronLeftIcon />}
                onClick={handleClickBack}
            >
                Back to Jobs
            </Button>
            <BCPaper
                title='New Invoice'
                positiveButtonLabel='Preview'
                handlePositive={()=>{
                    if (selectedCustomer == null) {
                        dispatch(warning("Please selecte a customer!"))
                        return
                    }
                    if (invoiceID == null) {
                        dispatch(warning("Please input invoice id!"))
                        return
                    }
                    if (invoiceItems.length == 0) {
                        dispatch(warning("Please fill the invoice table!"))
                        return
                    }
                    setOpenPrintDialig(true)
                }}
                handleNagative={handleClickBack}
                informationByttonLabel='Rates and Taxes Information'
                handleInformation={handleInformation}
            >
                <Paper elevation={3} className={classes.paperContent}>
                    <div className={classes.labelSelect1}>
                        <div className={classes.label}>Customer</div>
                        <Autocomplete
                            value={selectedCustomer}
                            className={classes.select}
                            options={(customersState.customers || []) as (Customer | string)[]}
                            getOptionLabel={option => {
                                if (typeof option === 'string') {
                                    return ''
                                }
                                return option.profile.displayName
                            }}
                            onChange={(event, newValue) => {
                                if (typeof newValue === 'string') {
                                    return
                                }
                                setSelectedCustomer(newValue)
                            }}
                            renderOption={option => {
                                if (typeof option == 'string') {
                                    return (
                                        <div className={classes.addCustomer}>
                                            <AddIcon/>
                                            <span>{`Add Customer "${option}"`}</span>
                                        </div>
                                    )

                                }
                                return (
                                    <span>{option.profile.displayName}</span>
                                )
                            }}
                            renderInput={params =>
                                <TextField
                                    {...params}
                                    margin='none'
                                    variant="outlined"
                                    placeholder='Search Customers'
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: <InputAdornment position='start'><SearchIcon color='disabled' fontSize='small' /></InputAdornment>
                                    }}
                                />
                            }
                            filterOptions={(options, params) => {
                                const filtered = customerFilter(options, params) as (Customer | string)[]
                                if (params.inputValue) {
                                    filtered.push(params.inputValue)
                                }
                                return filtered
                            }}
                            size='small'
                        />
                    </div>
                    <div className={classes.labelSelect2}>
                        <div className={classes.label}>Invoice #</div>
                        <TextField variant='outlined' margin='dense' className={classes.select2} type='number'
                            onChange={handleInvoiceID}
                        />
                    </div>
                    <div className={classes.labelSelect2}>
                        <div className={classes.label}>Due to</div>
                        <TextField variant='outlined' margin='dense' type='date' className={classes.select2} defaultValue={moment().format('yyyy-MM-DD')}
                            onChange={handleInvoiceDate}
                            />
                    </div>
                        {invoicetable}
                        <Button
                            color='primary'
                            className={classes.button}
                            startIcon={<AddIcon />}
                            onClick={handleClickAddItem}
                        >
                            Service/Product
                        </Button>
                        {totalTable}
                    {/* <MaterialTable
                        columns={[
                            {title: '#', field: 'index', type: 'numeric'},
                            {title: 'Servie/Product', field: 'name'},
                            {title: 'Quantity', field: 'quantity', type: 'numeric'},
                            {title: 'Price $', field: 'price'},
                            {title: 'Unit', field: 'unit'},
                            {title: 'Tax %', field: 'tax'},
                            {title: 'Total $', field: 'total'},
                        ]}
                        data={[]}
                        actions={[
                            {icon: 'add', onClick: handleClickAddItem, isFreeAction: true}
                        ]}
                        options={{
                            actionsColumnIndex: -1
                        }}
                    /> */}
                </Paper>
            </BCPaper>
            <Backdrop className={classes.backdrop} open={customersState.loading || taxsState.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Dialog
                open={openDraftDialog}
                onClose={()=>setOpenDraftDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText>Would you like to save as a draft?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleCancelDraftDialog(false)} color="primary" variant='outlined' autoFocus>
                        cancel</Button>
                    <Button onClick={()=>handleCancelDraftDialog(true)} color="primary" variant='contained'>
                        Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openPrintDialig}
                maxWidth='lg'
                onClose={()=>setOpenPrintDialig(false)}
            >
                <DialogTitle id="alert-dialog-title">
                    New Invoice
                    <Divider variant='fullWidth'/>
                    <Divider variant='fullWidth'/>
                    <Divider variant='fullWidth'/>
                    <Divider variant='fullWidth'/>
                </DialogTitle>
                <DialogContent>
                <ReactToPrint
                    ref={printRef}
                    content={()=>tableRef.current}
                    trigger={()=>{
                        return (
                            <div>
                                <Button color='primary' variant='outlined' href="#" className={classes.button}>Print</Button>
                                <Button color='primary' variant='outlined'  className={classes.button} onClick={()=>setOpenPrintDialig(false)}>Edit</Button>
                                <Button color='primary' variant='contained' className={classes.floatButton}>Save</Button>
                            </div>
                        )
                    }}
                />
                <FoldedInvoice
                    ref={tableRef}
                >
                    <Box overflow='auto' mb={1}>
                        <Box display='inline' textAlign='center'>
                            <img src={require('../../../assets/blue-icon.jpg')} width={50} height={50}/>
                        </Box>
                        <Box display='inline' pr={5} className={classes.floatRight}>
                            <b>INVOICE</b>
                            <p>Invoice #: {invoiceID}</p>
                            <p>Invoice Date: {dueDate?.format('MMM D YYYY')}</p>
                            <p>Due Date: {moment().format('MMM D YYYY')}</p>
                            <div className={classes.invoiceAmount}>
                                <p>Amount due:</p>
                                <b>${invoiceTotal}</b>
                            </div>
                        </Box>
                    </Box>
                    <div>
                        <Divider/>
                        <p>Bill To:</p>
                        <p>{selectedCustomer?.profile.displayName}</p>
                    </div>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell variant='head'>Service/Product</TableCell>
                                    <TableCell variant='head'>Price</TableCell>
                                    <TableCell variant='head'>Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    invoiceItems.map((item, index)=>{
                                        return (
                                            <TableRow key={index}>
                                                <TableCell variant='body'>{item.name}</TableCell>
                                                <TableCell variant='body'>${item.price}</TableCell>
                                                <TableCell variant='body'>${getAmount(item)}</TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                <TableRow>
                                    <TableCell rowSpan={3} colSpan={1}></TableCell>
                                    <TableCell>Subtotal</TableCell>
                                    <TableCell>${invoiceSubtotal}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Tax</TableCell>
                                    <TableCell>${invoiceTax}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Total</TableCell>
                                    <TableCell>${invoiceTotal}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </FoldedInvoice>
                </DialogContent>
            </Dialog>
        </div>
    )
}
export default NewInvoice