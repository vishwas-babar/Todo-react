import React from 'react'

function ActionComp({ showDropDown, deleteAll, setFilterOnComplete, setFilterOnPending, removeAllFilters, dropdownState }) {
    return (
        <div className={`action-container`}>
            <button onClick={showDropDown}  className="filter">FILTER</button>
            <div className={`dropdown-container ${dropdownState}`} id="filter-dropdown">
                <a onClick={removeAllFilters} className="all-filter" href="#">
                    All
                </a>
                <a onClick={setFilterOnPending} className="pending-filter" href="#">
                    Pending
                </a>
                <a onClick={setFilterOnComplete} className="completed-filter" href="#">
                    Completed
                </a>
            </div>
            <button onClick={deleteAll} className="delete-all">DELETE ALL</button>
        </div>

    )
}

export default ActionComp