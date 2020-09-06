import React, {useState} from 'react'
import {
    withStyles, createStyles, Theme,
} from '@material-ui/core'

import useStyles from './invoicing.styles'
import {BCTabs, BCTab} from '../../components/bc-tab2/bc-tab'
import BCPaper from '../../components/bc-paper/bc-paper'


export default function InvoicingManager() {
    const [curTab, setCurTab] = useState<number>(0)
    const classes = useStyles({ back: true })
    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setCurTab(newValue)
    }
    const handleInformation=()=>{

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
            {
                curTab === 0 &&
                <BCPaper
                    title='Manage Invoices'
                    informationByttonLabel='Rates and Taxes Information'
                    handleInformation={handleInformation}
                >

                </BCPaper>
            }
            {
                curTab === 1 &&
                <BCPaper
                    title='Manage Estimates'
                    informationByttonLabel='Rates and Taxes Information'
                    handleInformation={handleInformation}
                >

                </BCPaper>
            }
        </div>
    )
}