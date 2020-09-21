import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/actions/cartActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { CartContainer, TopBar } from '../styled/navigation/CartStyles';
import { calculateTotal } from '../../utils/calculateTotal';

const Cart = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.items)
    const [total, setTotal] = useState("$0.00");

    useEffect(() => {
        setTotal(calculateTotal(cartItems))
    }, [cartItems])

    // add event handlers to remove item and clear cart 
    // INVESTIGATE REDUX PERSIST TO KEEP ITEMS IN CART EVEN AFTER REFRESH
    const handleCloseCart = e => {
        props.setOpenCart(false)
    }
    const handleRemoveItem = id => () => {
        dispatch(removeFromCart(id))
    };
    const handleClearCart = e => {
        dispatch(clearCart())
    }
    return(
        <CartContainer>
            <TopBar>
                <h2>Your Cart</h2>
                <CloseIcon onClick={handleCloseCart}>Close X</CloseIcon>
            </TopBar>
            {cartItems.map(item => {
                return(
                    <div key={item.id}>
                    <div >
                        <p>{item.itemName}</p>
                        <p>{item.rental}</p>
                    </div>
                    <CancelIcon onClick={handleRemoveItem(item.id)} />
                    </div>
                )
            })}
            <p>Total per day: {total}</p>
            <button onClick={handleClearCart}>Clear Items</button>
            <button>Checkout</button>
        </CartContainer>
    )
};

export default Cart;