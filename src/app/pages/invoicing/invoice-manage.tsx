import React, {useState} from 'react'
import {
    withStyles, createStyles, Theme,
} from '@material-ui/core'

import useStyles from './invoicing.styles'
import {BCTabs, BCTab} from '../../components/bc-tab2/bc-tab'


export default function InvoicingManager() {
    const [curTab, setCurTab] = useState<number>(0)
    const classes = useStyles({ back: true })
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurTab(newValue)
    }
    return (
        <div className={classes.jobs}>
            <BCTabs
                value={curTab}
                onChange={handleTabChange}
            >
                <BCTab label='Invoices'/>
                <BCTab label='Estimates'/>
            </BCTabs>
        </div>
    )
}