import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions'
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


// page styles
import {
    InvPageContainer,
    MappedItems,
    ItemDiv,
    ImgContainer,
    StyledImg
} from '../styled/InvPageStyles'


const InventoryPage = props => {
    const history = useHistory();
    console.log(props)
    // convert to hooks later?
    useEffect(()=> {
        props.getAllItems();
    }, [])
    

    return(
        <InvPageContainer>
            <h2>Inventory Here</h2>
            {/* Add dropdown filter by department (stretch) */}
            {/* Add ternary to check if user isAdmin when live to display add inventory button */}
            <Button
            color="primary"
            startIcon={<AddIcon />}
            href="/inventory/addItem"
            >
                Add Inventory
            </Button>
            <MappedItems>
            {props.items.map(item =>{
                return (
                    <ItemDiv key={item.id}>
                        <ImgContainer>
                            <StyledImg src={item.mainImgUrl} />
                        </ImgContainer>
                        <h3>{item.itemName}</h3>
                        <p>{item.description}</p>
                        <span>Rent ${item.rentalRate}</span>
                        <span>Buy ${item.buyNow}</span>
                        {/* Add button to reserve  and to see more (reviews, etc.)after user flow is built */}
                    </ItemDiv>
                )
            })}
            </MappedItems>
        </InvPageContainer>
    )
};

const mapStateToProps = state => {
    return {
        items: state.warehouseReducer.items
    }
}

export default connect(mapStateToProps, { getAllItems })(InventoryPage);