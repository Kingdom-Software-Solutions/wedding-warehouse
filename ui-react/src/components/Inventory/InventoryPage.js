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
    const noImg = 'https://res.cloudinary.com/kss-image-cloud/image/upload/v1594874741/no-image_zrmqjk.png'
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
                        {/* add ternary for image placholder */}
                        <ImgContainer>
                            {item.mainImgUrl ?
                            <StyledImg src={item.mainImgUrl}
                            alt="item image"/>
                            :
                            <StyledImg src={noImg}
                            alt="item image"/>
                            }
                        </ImgContainer>
                        <h3>{item.itemName}</h3>
                        <p>{item.description}</p>
                        <span>Rent: ${item.rentalRate}</span>
                        <span>Buy ${item.buyNow}</span>
                        <Button>Reserve Now</Button>
                        <Button>See More</Button>
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