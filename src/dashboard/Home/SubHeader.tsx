import React from 'react'

export const SubHeader = () => {
    return (
        <div className="sub-header">
            <div className="row m-0">
                <h2 className="sub-title ng-star-inserted">Dashboard</h2>
                <div className="search-container">
                    <input name="search" placeholder="Search.." type="text" />
                    <button className="searchButton" type="submit">
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SubHeader

