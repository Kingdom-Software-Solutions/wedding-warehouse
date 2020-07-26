import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions'
import { Button } from '@material-ui/core';
import Spinner from '../material-ui/Spinner';

// SHOULD THIS JUST BE AN INVENTORY PAGE?

const LandingPage = () => {
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
        <div>
            <h1>🚧 Landing Page 🚧</h1>
            <p>This is page is under construction. Please go <a href="/inventory">HERE</a> to check out the inventory</p>
            <div>
                <img src="https://images.unsplash.com/photo-1521459444000-c2192d774976?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="wedding aisle" />
                <p>Facilitate the perfect day</p>
            </div>
            <div className="featured">
                <h3>Featured</h3>
                {/* Eventually will map through the array when there is enough inventory */}
                { featured ?
                    <div>
                        <h4>{featured.itemName}</h4>
                        <p>Rent: ${featured.rentalRate}</p>
                        <Button href={`/inventory/item/${featured.id}`}>See More</Button>
                    </div>   
                    :
                        <Spinner />   
                }
            </div>

        </div>
    )
}

export default LandingPage;