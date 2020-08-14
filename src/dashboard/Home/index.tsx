import React, { Component } from 'react'
import SubHeader from './SubHeader'
import { Bar, Line } from 'react-chartjs-2';

import './style.scoped.scss';
import ToggleSidebar from '../ToggleSidebar';

const Home: () => JSX.Element = () => {
    const data = {
        labels: ['Sun\n 10', 'Mon\n 11', 'Tue\n 12', 'Wed\n 13', 'Thu\n 13', 'Fri\n 14', 'Sat\n 15'],
        datasets: [
            {
                label: 'Line Dataset',
                fill: false,
                type: 'line',
                pointShape: 'circle',
                backgroundColor: '#0082C3',
                borderColor: 'rgba(255,255,255,0)',
                radius: 5,
                pointHoverRadius: 8,
                pointHoverBorderWidth: 5,
                pointHoverBorderColor: 'rgba(255,255,255,1)',
                pointHoverBackgroundColor: '#0082C3',
                data: [65, 59, 80, 81, 56, 30, 50],
            },
            {
                label: 'Jobs',
                backgroundColor: '#0082C3',
                borderColor: 'rgba(0,0,0,0)',
                borderWidth: 1,
                barThickness: 10,
                data: [65, 59, 80, 81, 56, 30, 50]
            }]
    }
    const invoice_data = {
        labels: ['Sun\n 10', 'Mon\n 11', 'Tue\n 12', 'Wed\n 13', 'Thu\n 13', 'Fri\n 14', 'Sat\n 15'],
        datasets: [
            {
                label: 'Jobs',
                fill: false,
                lineTension: 0.3,
                backgroundColor: 'rgba(0,0,0,0)',
                borderColor: 'rgba(255,255,255,1)',
                borderWidth: 2,
                pointBorderColor: 'rgba(0,0,0,0)',
                pointHoverRadius: 6,
                pointHoverBorderWidth: 15,
                pointHoverBorderColor: 'rgba(255,255,255,0.4)',
                pointHoverBackgroundColor: 'rgba(255,255,255,1)',
                hoverBorderDashOffset: 10,
                data: [65, 59, 80, 81, 56, 30, 50]
            }
        ]
    }
    return (
        <React.Fragment>
            <SubHeader />
            <div className="app-body dashboard-container">
                <ToggleSidebar />
                {/* <div className="left-navbar sidebar" id="left-navbar">
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
            </div> */}

                <main className="main mainfull">
                    <div className="container-fluid">
                        {/* <router-outlet></router-outlet> */}
                        <div className="ng-star-inserted">
                            <div className="animated fadeIn">
                                <div className="row dashboard-counts">
                                    <div className="col-sm-6 col-lg-3 card-box-list">
                                        <div className="card text-white  custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                            <div className="dashB-flex card-body pb-0 mt-2 mb-2">
                                                <div className="col-md-3 col-xs-3 res-p-0">
                                                    <i aria-hidden="true" className="fa fa-user-circle-o fa-3x"></i>
                                                </div>
                                                <div className="col-md-9 col-xs-9">
                                                    <div className="text-value card-box-count">3</div>
                                                    <div className="mb-2 card-box-title ng-star-inserted">Customers</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-lg-3 card-box-list">
                                        <div className="card text-white custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                            <div className="dashB-flex card-body pb-0 mt-2 mb-2">
                                                <div className="col-md-3 col-xs-3 res-p-0">
                                                    <i aria-hidden="true" className="fa fa-user-circle-o fa-3x"></i>
                                                </div>
                                                <div className="col-md-9 col-xs-9">
                                                    <div className="text-value card-box-count">0</div>
                                                    <div className="mb-2 card-box-title">Technicians</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-lg-3 card-box-list">
                                        <div className="card text-white custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                            <div className="dashB-flex card-body pb-0 mt-2 mb-2">
                                                <div className="col-md-3 col-xs-3 res-p-0">
                                                    <i aria-hidden="true" className="fa fa-sticky-note-o fa-3x"></i>
                                                </div>
                                                <div className="col-md-9 col-xs-9" style={{ paddingRight: "0" }}>
                                                    <div className="text-value card-box-count">0</div>
                                                    <div className="mb-2 card-box-title">Reports <small >(To Be Approved)</small></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-lg-3 card-box-list">
                                        <div className="card text-white custom-light-blue-bg custom-card card-box-inner curso-pointer">
                                            <div className="dashB-flex card-body pb-0 mt-2 mb-2">
                                                <div className="col-md-3 col-xs-3 res-p-0">
                                                    <i aria-hidden="true" className="fa fa-user-circle-o fa-3x"></i>
                                                </div>
                                                <div className="col-md-9 col-xs-9">
                                                    <div className="text-value card-box-count">27</div>
                                                    <div className="mb-2 card-box-title">Tickets</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mt-2">
                                    <div className="col-md-6 responsivePadding">
                                        <div className="card customTableHeaderTop custom-min-height">
                                            <div className="card-header customTableHeader p-0">
                                                <label className="p-10 m-0 customTableTitleLeft">Jobs</label>
                                                <small className="m-0 float-right tableRightBack dark-blue-bg"><i className="fa fa-plus"></i> New Ticket</small>
                                            </div>
                                            <div className="card-body p-0">
                                                <div style={{ display: "block", padding: "20px 10px" }} className="ng-star-inserted">
                                                    <Bar
                                                        data={data}
                                                        height={330}
                                                        options={{
                                                            responsive: true,
                                                            maintainAspectRatio: false,
                                                            title: {
                                                                display: true,
                                                                text: '',
                                                                fontSize: 20
                                                            },
                                                            legend: {
                                                                display: false,
                                                                position: 'right'
                                                            },
                                                            tooltips: {
                                                                enabled: true,
                                                                backgroundColor: "rgba(0,0,0,1)",
                                                                displayColors: false,
                                                                position: 'average',
                                                                xPadding: 10,
                                                                yPadding: 10,
                                                                callbacks: {
                                                                    label: (tooltipItem, data) => {
                                                                        return `${tooltipItem.value}`
                                                                    },
                                                                    title: () => {
                                                                        return ""
                                                                    }
                                                                }
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
                                    <div className="col-md-3 responsivePadding">
                                        <div className="card customTableHeaderTop custom-min-height">
                                            <div className="card-body p-0 blue-gray-bg" style={{ borderRadius: "7px" }}>
                                                <div className="invoice-paid blue-gray-bg">
                                                    <div className="card-header customTableHeader blue-gray-bg p-0">
                                                        <label className="p-10 m-0 customTableTitleLeft curso-pointer">Vendor Activity</label>
                                                    </div>
                                                    <div className="details">
                                                        <b >0</b>
                                                        <p >Active Jobs</p>
                                                    </div>
                                                    <div style={{ display: "block", padding: "20px 10px" }} className="ng-star-inserted">
                                                        <Line
                                                            height={250}
                                                            data={invoice_data}
                                                            options={{
                                                                responsive: true,
                                                                maintainAspectRatio: false,
                                                                title: {
                                                                    display: true,
                                                                    text: '',
                                                                    fontSize: 20
                                                                },
                                                                legend: {
                                                                    display: false,
                                                                    position: 'right'
                                                                },
                                                                tooltips: {
                                                                    displayColors: false,
                                                                    // enabled: true,
                                                                    backgroundColor: "rgba(0,0,0,1)",
                                                                    position: 'average',
                                                                    xPadding: 10,
                                                                    yPadding: 10,
                                                                    callbacks: {
                                                                        label: (tooltipItem, data) => {
                                                                            return `${tooltipItem.value}`
                                                                        },
                                                                        title: () => {
                                                                            return ""
                                                                        }
                                                                    }
                                                                },
                                                                scales: {
                                                                    xAxes: [
                                                                        {
                                                                            gridLines: {
                                                                                display: false,
                                                                                offsetGridLines: true
                                                                            },
                                                                            // scaleLabel: {
                                                                            //     display: true,
                                                                            //     labelString: "Happiness",

                                                                            //   }
                                                                            // type: 'time',
                                                                            // time: {
                                                                            //     unit: 'week'
                                                                            // },
                                                                            ticks: {
                                                                                // beginAtZero: false,
                                                                                fontColor: "white"
                                                                            }
                                                                        }
                                                                    ],
                                                                    yAxes: [{
                                                                        gridLines: {
                                                                            display: false,
                                                                            offsetGridLines: true
                                                                        },
                                                                        ticks: {
                                                                            beginAtZero: true,
                                                                            fontColor: "white"
                                                                        },

                                                                    }]
                                                                },
                                                            }}
                                                        />
                                                    </div>

                                                    {/* <div  className="ng-star-inserted">
                                                <div className="chartjs-size-monitor">
                                                    <div className="chartjs-size-monitor-expand">
                                                        <div className=""></div>
                                                    </div>
                                                    <div className="chartjs-size-monitor-shrink">
                                                        <div className=""></div>
                                                    </div>
                                                </div>
                                                <canvas height="222px" width="260px" className="chartjs-render-monitor" style={{display: "block", width: "260px", height: "222px"}}></canvas>
                                            </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3 responsivePadding groupsList">
                                        <div className="card customTableHeaderTop custom-min-height">
                                            <div className="card-header customTableHeader p-0 newGroup">
                                                <label className="p-10 m-0 customTableTitleLeft">Groups</label>
                                                <small className="m-0 float-right  tableRightBack dark-blue-bg"><i className="fa fa-plus"></i> Groups</small>
                                            </div>
                                            <div className="table-container card-body p-0">
                                                <div className="no-record ng-star-inserted">
                                                    <b >No Groups Found</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-4 responsivePadding">
                                        <div className="card customTableHeaderTop">
                                            <div className="card-header customTableHeader p-0">
                                                <label className="p-10 m-0 customTableTitleLeft">Customer Activity</label>
                                                <small className="m-0 float-right tableRightBack dark-blue-bg" ><i className="fa fa-plus"></i> New Customer</small>
                                                {/* <small  className="m-0 float-right tableRightBack dark-blue-bg" href="/customers/newcustomer"><i  className="fa fa-plus"></i> New Customer</small> */}
                                            </div>
                                            <div className="table-container card-body p-0">
                                                <table className="table table-responsive-sm table-hover table-outline mb-0 ng-star-inserted">
                                                    <thead >
                                                        <tr >
                                                            <th className="text-center">Logo</th>
                                                            <th >Name</th>
                                                            <th >Recent Activity</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody >
                                                        <tr className="ng-star-inserted">
                                                            <td className="text-center">
                                                                <div className="avatar">
                                                                    <img className="img-avatar" src="https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png" />
                                                                </div>
                                                            </td>
                                                            <td >
                                                                <div >Shelley Poehler </div>
                                                            </td>
                                                            <td >
                                                                <span className="avatar-status badge-primary"></span>
                                                                <div className="activity-badge ">
                                                                    <span className="pointer"></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="ng-star-inserted">
                                                            <td className="text-center">
                                                                <div className="avatar">
                                                                    <img className="img-avatar" src="https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png" />
                                                                </div>
                                                            </td>
                                                            <td >
                                                                <div >Contact name test. </div>
                                                            </td>
                                                            <td >
                                                                <span className="avatar-status badge-primary"></span>
                                                                <div className="activity-badge ">
                                                                    <span className="pointer"></span>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr className="ng-star-inserted">
                                                            <td className="text-center">
                                                                <div className="avatar">
                                                                    <img className="img-avatar" src="https://www.tridentconsultant.com/wp-content/uploads/2019/07/user-dummy-200x200.png" />
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
                                            <div className="table-container card-body p-0">
                                                <div className="no-record ng-star-inserted">
                                                    <b >No Technicians Found</b>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-3 recent-info-boxes responsivePadding">
                                        <div className="col-md-12 p-0">
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
                                        <div className="col-md-12 p-0">
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
                                                        <img src="/assets/blue-icon.jpg" />
                                                    </div>
                                                    <div className="col-md-9 col-xs-9 padding-right-0">
                                                        <div className="text-value card-box-count">0</div>
                                                        <div className="mb-2 card-box-title">Tags Not Programmed</div>
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
export default Home;