import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Cart = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.items)
    console.log(cartItems)
    return(
        <div>
            <h2>Your Cart</h2>
            {cartItems.map(item => {
                <div key={item.id}>
                    <p>{item.itemName}</p>
                    <p>{item.rental}</p>
                </div>
            })}
        </div>
    )
};

export default Cart;