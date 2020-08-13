import React from 'react'
import SubHeader from '../../shared/SubHeader'
import Sidebar from '../../shared/Sidebar'

export const Content = () => {
    return (
        <React.Fragment>
            {/* SubHeader */}
            <SubHeader />
            {/* Main Container */}
            <div className="app-body main-container">
                {/* Siderbar */}
                <Sidebar />
                {/* Main Content */}
                <main className="main mainfull">

                </main>
            </div>
        </React.Fragment>
    )
}

export default Content