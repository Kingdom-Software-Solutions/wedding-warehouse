import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { warehouseReducer } from '../../redux/reducers/warehouseReducer';

const InventoryPage = props => {
    const history = useHistory();
    

    return(
        <div>
            <h2>Inventory Here</h2>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        items: state.warehouseReducer.items
    }
}

export default connect(mapStateToProps, {})(InventoryPage);