import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const InventoryPage = props => {
    const history = useHistory();
    console.log(props)

    useEffect(()=> {
        getAllItems();
    }, [])
    

    return(
        <div>
            <h2>Inventory Here</h2>
            {/* Add ternary to check if user isAdmin when live to display add inventory button */}
            <Button
            color="primary"
            startIcon={<AddIcon />}
            href="/inventory/addItem"
            >
                Add Inventory
            </Button>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        items: state.warehouseReducer.items
    }
}

export default connect(mapStateToProps, { getAllItems })(InventoryPage);