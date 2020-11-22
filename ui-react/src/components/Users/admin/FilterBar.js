// file for admin table filters
import React, {useState} from 'react';

// Check chakra for snack bars!!


const FilterBar = (reservations) => {
    return(
        <div style={{display: 'flex', justifyContent: 'center'}}>
        <span>Filter Name</span>
        <span>Filter Dates</span>
        <span>Filter Returned</span>
        </div>
    )
}

export default FilterBar;
