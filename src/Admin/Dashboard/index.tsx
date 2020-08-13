import React, { Component } from 'react'
import SubHeader from '../../shared/SubHeader'
import Sidebar from '../../shared/Sidebar'
import './style.scss';
import {Bar} from 'react-chartjs-2';

class Dashboard extends Component {
    render()
    {
        const data = {
            labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday','Friday', 'Satusday'],
            datasets: [
              {
                label: 'Jobs',
                backgroundColor: '#0082C3',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                barThickness:10,
                barRadius:0.5,
                pointHoverRadius: 5,
                pointRadius: 1,
                pointHitRadius: 10,       
                barRoundness: 5,
                cornerRadius: 20,      
                radius:4,   
                data: [65, 59, 80, 81, 56, 30, 50]
              }
            ]
          }

        return(
        <React.Fragment>
            {/* Main Container */}
            <SubHeader />

            {/* Dashboard Container */}
            <div className="app-body dashboard-container">
                <div className="left-navbar sidebar" id="left-navbar">
                    <ul className="nav navbar-nav response-nav">
                        <li  className="nav-item active">
                            <a className="nav-item">Dashboard</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item">People</a>
                        </li>
                        <li className="dropdown nav-item">
                            <a className="dropdown-toggle nav-item" data-toggle="dropdown">Customers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item">Tags</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item">Inventory</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item">Admin</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item">Integrations</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-item">Invoicing</a>
                        </li>
                    </ul>
                </div>

                <main className="main mainfull">
                    <div className="container-fluid">
                    {/* <router-outlet></router-outlet> */}
                    <div className="ng-star-inserted">
                        <div className="animated fadeIn">
                            <div  className="row dashboard-counts">
                                <div  className="col-sm-6 col-lg-3 card-box-list">
                                    <div  className="card text-white  custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                        <div className="dashB-flex card-body pb-0 mt-2 mb-2">
                                            <div  className="col-md-3 col-xs-3 res-p-0">
                                                <i  aria-hidden="true" className="fa fa-user-circle-o fa-3x"></i>
                                            </div>
                                            <div className="col-md-9 col-xs-9">
                                                <div  className="text-value card-box-count">3</div>
                                                <div  className="mb-2 card-box-title ng-star-inserted">Customers</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div  className="col-sm-6 col-lg-3 card-box-list">
                                    <div  className="card text-white custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                        <div  className="dashB-flex card-body pb-0 mt-2 mb-2">
                                            <div  className="col-md-3 col-xs-3 res-p-0">
                                                <i  aria-hidden="true" className="fa fa-user-circle-o fa-3x"></i>
                                            </div>
                                            <div  className="col-md-9 col-xs-9">
                                                <div  className="text-value card-box-count">0</div>
                                                <div  className="mb-2 card-box-title">Technicians</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div  className="col-sm-6 col-lg-3 card-box-list">
                                    <div  className="card text-white custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                        <div  className="dashB-flex card-body pb-0 mt-2 mb-2">
                                            <div  className="col-md-3 col-xs-3 res-p-0">
                                                <i  aria-hidden="true" className="fa fa-sticky-note-o fa-3x"></i>
                                            </div>
                                            <div  className="col-md-9 col-xs-9" style={{ paddingRight: "0" }}>
                                                <div  className="text-value card-box-count">0</div>
                                                <div  className="mb-2 card-box-title">Reports <small >(To Be Approved)</small></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div  className="col-sm-6 col-lg-3 card-box-list">
                                    <div  className="card text-white custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                        <div  className="dashB-flex card-body pb-0 mt-2 mb-2">
                                            <div  className="col-md-3 col-xs-3 res-p-0">
                                                <i  aria-hidden="true" className="fa fa-user-circle-o fa-3x"></i>
                                            </div>
                                            <div  className="col-md-9 col-xs-9">
                                                <div  className="text-value card-box-count">27</div>
                                                <div  className="mb-2 card-box-title">Tickets</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            
                            <div  className="row mt-2">
                                <div  className="col-md-6 responsivePadding">
                                    <div  className="card customTableHeaderTop custom-min-height">
                                        <div  className="card-header customTableHeader p-0">
                                            <label  className="p-10 m-0 customTableTitleLeft">Jobs</label>
                                            <small  className="m-0 float-right tableRightBack dark-blue-bg"><i  className="fa fa-plus"></i> New Ticket</small>
                                        </div>
                                        <div  className="card-body p-0">
                                            <div  style={{display: "block", padding: "20px 10px"}} className="ng-star-inserted">
                                            <Bar
                                                data={data}
                                                options={{                                                                                                
                                                    title:{
                                                        display:true,
                                                        text:'',
                                                        fontSize:20
                                                    },
                                                    legend:{
                                                        display:true,
                                                        position:'right'
                                                    },
                                                    scales: {
                                                        yAxes: [{
                                                            ticks: {
                                                                beginAtZero: true
                                                            }
                                                        }]
                                                    },   
                                                }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div  className="col-md-3 responsivePadding">
                                    <div  className="card customTableHeaderTop custom-min-height">
                                        <div  className="card-body p-0 blue-gray-bg" style={{ borderRadius:"7px"}}>
                                            <div  className="invoice-paid blue-gray-bg">
                                                <div  className="card-header customTableHeader blue-gray-bg p-0">
                                                    <label  className="p-10 m-0 customTableTitleLeft curso-pointer">Vendor Activity</label>
                                                </div>
                                                <div className="details">
                                                    <b >0</b>
                                                    <p >Active Jobs</p>
                                                </div>
                                                <div  className="ng-star-inserted">
                                                    <div className="chartjs-size-monitor">
                                                        <div className="chartjs-size-monitor-expand">
                                                            <div className=""></div>
                                                        </div>
                                                        <div className="chartjs-size-monitor-shrink">
                                                            <div className=""></div>
                                                        </div>
                                                    </div>
                                                    <canvas height="222px" width="260px" className="chartjs-render-monitor" style={{display: "block", width: "260px", height: "222px"}}></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div  className="col-md-3 responsivePadding groupsList">
                                    <div  className="card customTableHeaderTop custom-min-height">
                                        <div  className="card-header customTableHeader p-0 newGroup">
                                            <label  className="p-10 m-0 customTableTitleLeft">Groups</label>
                                            <small  className="m-0 float-right  tableRightBack dark-blue-bg"><i  className="fa fa-plus"></i> Groups</small>
                                        </div>
                                        <div  className="table-container card-body p-0">
                                            <div  className="no-record ng-star-inserted">
                                                <b >No Groups Found</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div  className="row mt-2">
                                <div  className="col-md-4 responsivePadding">
                                    <div  className="card customTableHeaderTop">
                                        <div  className="card-header customTableHeader p-0">
                                            <label  className="p-10 m-0 customTableTitleLeft">Customer Activity</label>
                                            <small  className="m-0 float-right tableRightBack dark-blue-bg" ><i  className="fa fa-plus"></i> New Customer</small>
                                            {/* <small  className="m-0 float-right tableRightBack dark-blue-bg" href="/customers/newcustomer"><i  className="fa fa-plus"></i> New Customer</small> */}
                                        </div>
                                        <div  className="table-container card-body p-0">
                                            <table  className="table table-responsive-sm table-hover table-outline mb-0 ng-star-inserted">
                                                <thead >
                                                    <tr >
                                                        <th  className="text-center">Logo</th>
                                                        <th >Name</th>
                                                        <th >Recent Activity</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    <tr  className="ng-star-inserted">
                                                        <td  className="text-center">
                                                            <div  className="avatar">
                                                                <img className="img-avatar" src="https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png"/>
                                                            </div>
                                                        </td>
                                                        <td >
                                                            <div >Shelley Poehler </div>
                                                        </td>
                                                        <td >
                                                            <span  className="avatar-status badge-primary"></span>
                                                            <div  className="activity-badge ">
                                                                <span  className="pointer"></span>                                            
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr  className="ng-star-inserted">
                                                        <td  className="text-center">
                                                            <div  className="avatar">
                                                                <img  className="img-avatar" src="https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png"/>
                                                            </div>
                                                        </td>
                                                        <td >
                                                            <div >Contact name test. </div>
                                                        </td>
                                                        <td >
                                                            <span  className="avatar-status badge-primary"></span>
                                                            <div  className="activity-badge ">
                                                                <span  className="pointer"></span>                                            
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="ng-star-inserted">
                                                        <td className="text-center">
                                                            <div className="avatar">
                                                                <img className="img-avatar" src="https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png"/>
                                                            </div>
                                                        </td>
                                                        <td >
                                                            <div >Test Chris</div>
                                                        </td>
                                                        <td >
                                                            <span className="avatar-status badge-primary"></span>
                                                            <div className="activity-badge ">
                                                                <span className="pointer"></span>                                            
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-5 responsivePadding">
                                    <div className="card customTableHeaderTop">
                                        <div className="card-header customTableHeader p-0">
                                            <label className="p-10 m-0 customTableTitleLeft">Technicians</label>
                                            <small className="m-0 float-right  tableRightBack dark-blue-bg "><i className="fa fa-plus"></i> New Technician</small>
                                        </div>
                                        <div  className="table-container card-body p-0">
                                            <div  className="no-record ng-star-inserted">
                                                <b >No Technicians Found</b>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-3 recent-info-boxes responsivePadding">
                                    <div  className="col-md-12 p-0">
                                        <div className="card blue-gray-bg curso-pointer text-white card-box-inner">
                                            <div className="card-body pb-0 mt-3 mb-4">
                                                <div className="col-md-3 col-xs-3 res-p-0">
                                                    <i aria-hidden="true" className="fa fa-wrench fa-3x"></i>
                                                </div>
                                                <div className="col-md-9 col-xs-9 padding-right-0">
                                                    <div className="text-value card-box-count">0 </div>
                                                    <div className="mb-2 card-box-title curso-pointer">Total Inventory</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div  className="col-md-12 p-0">
                                        <div className="card blue-gray-bg text-white card-box-inner curso-pointer">
                                            <div className="card-body pb-0 mt-3 mb-4">
                                                <div className="col-md-3 col-xs-3 res-p-0">
                                                    <i aria-hidden="true" className="fa fa-wrench fa-3x"></i>
                                                </div>
                                                <div className="col-md-9 col-xs-9 padding-right-0">
                                                    <div className="text-value card-box-count">0</div>
                                                    <div className="mb-2 card-box-title curso-pointer">Newly Added Inventory</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-12 p-0">
                                        <div className="card blue-gray-bg text-white curso-pointer card-box-inner">
                                            <div className="card-body pb-0 mt-3 mb-4">
                                                <div className="col-md-3 col-xs-3 customImg res-p-0">
                                                    <img src="/assets/blue-icon.jpg"/>
                                                </div>
                                                <div  className="col-md-9 col-xs-9 padding-right-0">
                                                    <div  className="text-value card-box-count">0</div>
                                                    <div  className="mb-2 card-box-title">Tags Not Programmed</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </main>
            </div>
        
        </React.Fragment>
        )
    }
}
export default Dashboard;