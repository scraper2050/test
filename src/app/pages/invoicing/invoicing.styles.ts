import { makeStyles } from '@material-ui/core/styles'

export interface jobProps {
    back?: boolean
}
const useStyles = makeStyles(theme => ({
    invoicing: {
        backgroundColor: '#E5E5E5'
    },
    invoicingContent: {
        marginTop: 5,
        height: '80vh',
        display: 'flex'
    },
    jobs: (props?: jobProps) => ({
        flex: 1,
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
        marginTop: theme.spacing(2),
        textAlign: props?.back?'left':'right'
    }),
    button: {
        borderRadius: theme.spacing(5),
        marginRight: theme.spacing(2),
    },
    floatButton: {
        borderRadius: theme.spacing(5),
        float: 'right'
    },
    paper: {
        backgroundColor: 'white',
        borderRadius: theme.spacing(1),
        marginTop: theme.spacing(1),
        // paddingRight: '20%',
        textAlign: "left",
        padding: theme.spacing(3),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main
    },
    floatRight: {
        float: "right"
    },
    labelSelect1: {
        display: 'inline-flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 500
    },
    labelSelect2: {
        display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 300, float: 'right', clear: 'right'
    },
    subtitle: {
        fontSize: 24, color: 'black', display: 'inline-block', marginBottom: 23
    },
    paperContent: {
        padding: theme.spacing(2),
    },
    label: {
        fontSize: 18, color: 'black', display: 'inline'
    },
    select: {
        width: 300
    },
    select2: {
        width: 200, margin: 'none', size: 'small'
    },
    addCustomer: {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        width: '100%',
        padding: theme.spacing(1),
        alignItems: 'enter',
        display: 'flex'
    },
    noneBorder: {
        border: 'none'
    },
    invoiceTable: {
        maxHeight: 400,
        overflow: 'auto'
    },
    tableInput: {
        fontSize: 15,
        padding: 5,
        border: 'none'
    },
    invoiceAmount: {
        borderWidth: 1,
        textAlign: 'center',
        borderColor: 'black',
        borderStyle: 'solid'
    }
}))

export default useStyles

