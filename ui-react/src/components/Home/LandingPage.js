import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions'

// SHOULD THIS JUST BE AN INVENTORY PAGE?

const LandingPage = () => {
    const dispatch = useDispatch();
    const items = useSelector(state => state.warehouseReducer.items)
    const [featured, setFeatured] = useState();

    const getFeaturedItem = () => {
        const featIndex = Math.floor(Math.random() * Math.floor(items.length));
        // filter array by index then set the item
        // setFeatured(filter) 
    };
    // get items from store
    useEffect(()=>{
        dispatch(getAllItems());
    },[]);
    // pick one of the items from store
    useEffect(()=>{
        getFeaturedItem()
    },[items])

    console.log(items)

    return(
        <div>
            <h1>🚧 Landing Page 🚧</h1>
            <p>This is page is under construction. Please go <a href="/inventory">HERE</a> to check out the inventory</p>
            <div>
                <img />
                <p>Facilitate the perfect day</p>
            </div>
            <div className="featured">
                <h3>Featured</h3>
                <p>Featured Item here</p>
            </div>

        </div>
    )
}

export default LandingPage;