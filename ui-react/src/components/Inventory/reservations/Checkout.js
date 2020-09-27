import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { removeFromCart, clearCart } from '../../../redux/actions/cartActions';
import { reserveItem } from '../../../redux/actions/reserveActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { calculateTotal } from '../../../utils/calculateTotal';

const Checkout = () => {
    const { authState, authService } = useOktaAuth();
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartReducer.items)
    const [rentStart, setRentStart] = useState();
    const [rentEnd, setRentEnd] = useState();
    const [reserveUser, setReserveUser] = useState()
    const [newReservation, setNewReservation] = useState();
    const [total, setTotal] = useState("$0.00");

    useEffect(() => {
       // pull that items reservations and check them, if there is one, grey out the item and remove it's rent per day from the total
            // build a utility function to do this and run here so we don't bloat this component => in /utils/checkAvailability
            // THIS SHOULD LIVE ON THE INVENTORY PAGE AND SAVE USERS FROM ADDING THINGS THAT WON'T BE AVAILABLE. 
            // IF THIS CODE IS STILL HERE AFTER THERE IS A MODAL ON INVENTORY PAGE LOAD ASKING FOR DATE, SOMETHING IS WRONG. KEEP DATE IN STATE
        setTotal(calculateTotal(cart))
    }, [cart, rentStart, rentEnd])

    // Date and Time change handlers
    const onStartChange = (e) =>{
        e.preventDefault()
        setRentStart(e.target.value)
    };
    const onEndChange = e => {
        e.preventDefault()
        setRentEnd(e.target.value)
    };

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
        e.preventDefault();
        // add reserve item dispatch
        // needs to match BE table => exception is id which will be parsed from cart
        let newReservation = reserveUser
        newReservation.rentDate = rentStart;
        newReservation.returnDate = rentEnd;
        newReservation.items = cart; // pass an array to parse in BE
        if(!authState.isAuthenticated){
            newReservation.userStatus = "Guest"
        }
        
        dispatch(reserveItem(newReservation)) // change action to reservation
    };
    const handleBack = () => {
        window.history.back()
    }
    return(
        <div>
            <a onClick={handleBack}>Back</a>
            <h2>Checkout</h2>
            <div className='rent-dates'>
                <label>Pick-up Date</label>
                <input type="date" onChange={onStartChange} />
                <label>Return Date</label>
                <input type="date" onChange={onEndChange} />
            </div>
            
            {cart.map(item =>{
                return(
                    <div key={item.id}>
                        <img src={item.thumbnailUrl} alt="thumbnail" />
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
