import React, { Component } from 'react'
import SubHeader from '../../shared/SubHeader'
import Sidebar from '../../shared/Sidebar'
import {Bar} from 'react-chartjs-2';

class Customers extends Component {
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
            <h1>Customer page working now</h1>
        </React.Fragment>
        )
    }
}
export default Customers;