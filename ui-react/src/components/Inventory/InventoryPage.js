import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const InventoryPage = props => {
    const history = useHistory();
    console.log(props)
    // convert to hooks later?
    useEffect(()=> {
        props.getAllItems();
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
            {props.items.map(item =>{
                return (
                    <div key={item.id}>
                        <img src={item.mainImgUrl} />
                        <h3>{item.itemName}</h3>
                        <p>{item.description}</p>
                        <span>Rent ${item.rentalRate}</span>
                        <span>Buy ${item.buyNow}</span>
                        {/* Add button to reserve after user flow is built */}
                    </div>
                )
            })}
        </div>
    )
};

const mapStateToProps = state => {
    return {
        items: state.warehouseReducer.items
    }
}

export default connect(mapStateToProps, { getAllItems })(InventoryPage);