import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions';
import { HeroContainer, HeroImage, HeroText, HeroTextDiv, LandingContainer, ItemTitle, ItemRent, FeatSectionDiv, FeatSectionTitle, FeaturedDiv, SpinnerDiv, ItemImg } from '../styled/LandingPageStyles'
import { Button } from '@material-ui/core';
import Spinner from '../material-ui/Spinner';

// SHOULD THIS JUST BE AN INVENTORY PAGE?

const LandingPage = () => {
    const history = useHistory()
    const dispatch = useDispatch();
    const items = useSelector(state => state.warehouseReducer.items)
    const [featured, setFeatured] = useState();

    const getFeaturedItem = () => {
        const featIndex = Math.floor(Math.random() * Math.floor(items.length));
        // find by index and set the item
        setFeatured(items[featIndex]);
    };
    // get items from store
    useEffect(()=>{
        dispatch(getAllItems());
    },[]);
    // pick one of the items from store
    useEffect(()=>{
        getFeaturedItem()
    },[items])

    console.log(featured)

    return(
        <LandingContainer className="landing-wrapper">
            <HeroContainer className="hero-container">
                <HeroImage className="hero-img" src="https://images.unsplash.com/photo-1521459444000-c2192d774976?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="wedding aisle" />
                <HeroTextDiv className="hero-details" >
                <HeroText className="tag-line" >Facilitate the perfect day</HeroText>
                <Button className="hero-cta" 
                size="large"
                onClick={()=>{
                    history.push("/inventory")
                }}
                >Find Items</Button>
                </HeroTextDiv>
            </HeroContainer>
            <FeatSectionDiv className="featured">
                <FeatSectionTitle className="featured-title">Featured</FeatSectionTitle>
                {/* Eventually will map through the array when there is enough inventory */}
                { featured ?
                    <FeaturedDiv className="featured-item">
                        <ItemImg src={featured.mainImgUrl} />
                        <ItemTitle className='item-name'>{featured.itemName}</ItemTitle>
                        <ItemRent className="rent-rate">Rent: ${featured.rentalRate}</ItemRent>
                        <Button href={`/inventory/item/${featured.id}`}>See More</Button>
                    </FeaturedDiv>   
                    :
                    <SpinnerDiv>
                        <Spinner />
                    </SpinnerDiv>   
                }
            </FeatSectionDiv>

        </LandingContainer>
    )
}

export default LandingPage;