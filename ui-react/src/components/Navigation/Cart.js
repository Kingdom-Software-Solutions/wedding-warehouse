import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Cart = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.items)
    console.log(cartItems)
    
    const handleCloseCart = e => {
        props.setOpenCart(false)
    }
    return(
        <div>
            <span onClick={handleCloseCart}>X</span>
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