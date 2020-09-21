import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/actions/cartActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { calculateTotal } from '../../../utils/calculateTotal';
// build checkout page
// useEffect to check the reservations on the items in the cart
    // for each item in the cart, check if the reservations have a conflict in the date range selected
    // have a the user set a date range
    // pull that items reservations and check them, if there is one, grey out the item and remove it's rent per day from the total

const Checkout = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartReducer.items)
    const [total, setTotal] = useState("$0.00");

    useEffect(() => {
        setTotal(calculateTotal(cart))
    }, [cart])

    const handleRemoveItem = id => () => {
        dispatch(removeFromCart(id))
    };
    const handleClearCart = e => {
        dispatch(clearCart())
    }

    return(
        <div>
            <h2>Checkout</h2>
            {cart.map(item =>{
                <div key={item.id}>
                    <p>{item.itemName}</p>
                    <p>{item.rentalRate}</p>
                </div>
            })}
            <p>Total per Day: {total}</p>
        </div>
    )
};

export default Checkout;
