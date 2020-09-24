import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../../redux/actions/cartActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { calculateTotal } from '../../../utils/calculateTotal';
// build checkout page
// useEffect to check the reservations on the items in the cart
    // THIS SHOULD LIVE ON THE INVENTORY PAGE AND SAVE USERS FROM ADDING THINGS THAT WON'T BE AVAILABLE. 
    // SHOULD CLEAN UP INVENTORY CODE AND BREAK INTO SMALLER PARTS FIRST TO BE MORE MANAGEABLE
    // IF THIS CODE IS STILL HERE AFTER THERE IS A MODAL, SOMETHING IS WRONG
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
    const handleFinalize = e => {
        // will eventually integrate with paypal or stripe to take online payments 
        // mvp will just need to show a modal explaining what happens next and how to pay
        // if logged in redirect user back to profile
        // if guest, redirect back to inventory
        alert("Feature not complete")
    }

    return(
        <div>
            <a href={window.history.back()}>Back</a>
            <h2>Checkout</h2>
            {cart.map(item =>{
                return(
                    <div key={item.id}>
                        <p>{item.itemName}</p>
                        <p>{item.rentalRate}</p>
                        <CancelIcon onClick={handleRemoveItem(item.id)} />
                    </div>
                )
            })}
            <p>Total per Day: {total}</p>
            <button onClick={handleClearCart}>Clear Items</button>
            <button onClick={handleFinalize}>Finalize Checkout</button>
        </div>
    )
};

export default Checkout;
