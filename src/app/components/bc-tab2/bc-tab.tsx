import {
    withStyles, createStyles, Theme,
    Tabs, Tab,
} from '@material-ui/core'

export const BCTabs = withStyles((theme: Theme) =>
    createStyles({
        root: {
            borderBottom: '1px solid black',
            textTransform: 'none'
        },
        indicator: {
            backgroundColor: theme.palette.primary.main,
            height: 5
        },
    })
)(Tabs)

export const BCTab = withStyles((theme: Theme) =>
    createStyles({
        root: {
        textTransform: 'none'
        },
    })
)(Tab)
