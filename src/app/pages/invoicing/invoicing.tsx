import React, {} from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Switch, Route, Redirect, useLocation, useHistory } from 'react-router-dom'
import List from '@material-ui/core/List';
import {ListItem, ListItemText} from '@material-ui/core';

import createBCTheme from './create-theme'
import BCSidebar from '../../components/bc-sidebar/bc-sidebar'
import JobsRoute from './job'
import InvoiceManage from './invoice-manage'
import BCSnackbar from '../../components/bc-snackbar/bc-snackbar'
import BCSubHeader from '../../components/bc-sub-header/bc-sub-header'
import BCToolBarSearchInput from '../../components/bc-toolbar-search-input/bc-toolbar-search-input'
import useStyles from './invoicing.styles'

const theme = createBCTheme({})

const LINK_DATA = [
    {
      'label': 'Jobs',
      'link': '/invoicing/jobs'
    },
    {
      'label': 'Manage',
      'link': '/invoicing/manage'
    },
  ];
  
const InvoicingScreen = () => {
    const classes = useStyles()
    const location = useLocation()
    const history = useHistory()
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.invoicing}>
                <BCSubHeader title={'Invoicing'}>
                    <BCToolBarSearchInput style={{
                        'marginLeft': 'auto',
                        'width': '321px'
                    }}/>
                </BCSubHeader>
                <div className={classes.invoicingContent}>
                    <BCSidebar>
                        <List component="nav">
                            {
                                LINK_DATA.map(list=>{
                                    return (
                                        <ListItem
                                            key={list.link}
                                            button
                                            onClick={()=>history.push(list.link)}
                                            selected={location.pathname==list.link}>
                                            <ListItemText primary={list.label}/>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </BCSidebar>
                    <Switch>
                        <Route exact path='/invoicing'>
                            <Redirect to='/invoicing/jobs'/>
                        </Route>
                        <Route path='/invoicing/jobs'>
                            <JobsRoute/>
                        </Route>
                        <Route path='/invoicing/manage'>
                            <InvoiceManage/>
                        </Route>
                    </Switch>
                    <BCSnackbar/>
                </div>
            </div>
        </ThemeProvider>
    )
}
export default InvoicingScreen