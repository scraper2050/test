import React, {useEffect} from 'react'
import { Switch, Route } from 'react-router-dom'

import NewInvoice from './invoice-new'
import Jobs from './job-list'

const JobsRoute: React.FC = () => {
    return (
        <Switch>
            <Route exact path='/invoicing/jobs'><Jobs/></Route>
            <Route path='/invoicing/jobs/new'><NewInvoice/></Route>
        </Switch>
    )
}
export default JobsRoute