import React,{ useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../redux/actions/warehouseActions';
import Button from '@material-ui/core/Button';
import { noImg } from '../../assets/imageAssets';

const ItemPage = () => {
    const { id } = useParams(); // params hook grabs the id of the item
    const dispatch = useDispatch();
    const item = useSelector(state => state.warehouseReducer.singleItem);
    useEffect(()=> {
        dispatch(getItem(id))
    },[]);

    console.log(item)
    console.log(item.isAvailable)
    return (
        <div>
            <Button href="/inventory">Back</Button>
            <h2>{item.itemName}</h2>
            <img src={item.mainImgUrl || noImg} />
            <p>{item.description}</p>
            { item.isCustomizable ?
                <div>Customizable</div>
                :
                null
            }
            <p>Rental Rate: ${item.rentalRate}</p>
            <p>Purchase: ${item.buyNow}</p>
            {/* How should I show the quantity */}
            <p>{item.quantity || 0} units available</p>
            { item.isAvailable ?
                <div>
                    <Button>Reserve to Rent</Button>
                    <Button>Buy</Button>
                </div>
                :
                <div>
                    <Button disabled>Not Available</Button>
                    <Button>Buy</Button>
                </div>
            }
        </div>
    )
};

export default ItemPage;