import React from 'react'
import { Link } from 'react-router-dom'

import './activity.scoped.scss';

const Activity: () => JSX.Element = () => {
    const tableHeads = ['Photo','Name','Recent Activity','Action'];
    const tableList = ['ddd','www','ddd','www'];

    return(
        <div className="card customTableHeaderTop col-sm-12 p-0">
            <div className="table-container card-body p-0">
                <table className = "table table-responsive-sm table-hover table-outline mb-0 ">
                    <thead>
                        <tr>
                            {
                                tableHeads&&
                                tableHeads.map((data, ind) =>(
                                    <th>{data}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableList&&
                            tableList.map((head, ind)=>(
                                <tr>
                                    <td>
                                        <div className="avatar">
                                        <img
                                            src="https://www.bootdey.com/img/Content/avatar/avatar7.png"
                                            className="img-avatar"
                                        />
                                        </div>
                                    </td>
                                    <td className="custom-text-color">
                                        Albert Gonzalege
                                    </td>
                                    <td className="custom-text-color">
                                        <div className="recent_activity_box blue_background">
                                        <div className="status_dot blue_dot"></div>
                                        <div>Job Scheduled</div>
                                        </div>
                                    </td>
                                    <td>
                                        <Link to='/reports'>
                                            <button className="btn btn-oval btn-default customBtn">
                                                View More                                   
                                            </button>
                                        </Link>  
                                    </td>
                                </tr>
                            ))
                        }               
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Activity;