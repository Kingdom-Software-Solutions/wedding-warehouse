import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/actions/cartActions';

const Cart = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.items)
    console.log(cartItems)

    // add event handlers to remove item and clear cart 
    
    const handleCloseCart = e => {
        props.setOpenCart(false)
    }
    return(
        <div>
            <span onClick={handleCloseCart}>X</span>
            <h2>Your Cart</h2>
            {cartItems.map(item => {
                return(
                    <div key={item.id}>
                    <div >
                        <p>{item.itemName}</p>
                        <p>{item.rental}</p>
                    </div>
                    <span>X</span>
                    </div>
                )
            })}
            <button>Clear Items</button>
            <button>Checkout</button>
        </div>
    )
};

export default Cart;