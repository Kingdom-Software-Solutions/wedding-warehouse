import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { removeFromCart, clearCart } from '../../../redux/actions/cartActions';
import { reserveItems } from '../../../redux/actions/reserveActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { calculateTotal } from '../../../utils/calculateTotal';
import { useGetUser } from '../../../okta/getOktaUser';

const Checkout = () => {
    const { authState, authService } = useOktaAuth();
    const activeUser = useGetUser()
    const history = useHistory()
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cartReducer.items)
    const dates = useSelector(state => state.reserveReducer.dates);
    const [rentStart, setRentStart] = useState(dates.pickUp);
    const [rentEnd, setRentEnd] = useState(dates.returnal);
    const [reserveUser, setReserveUser] = useState(activeUser || {
        renterFirstName: "",
        renterLastName: "",
        renterEmail: "",        
    })
    const [total, setTotal] = useState("$0.00");

    useEffect(() => {
       // pull that items reservations and check them, if there is one, grey out the item and remove it's rent per day from the total
       // SHOULD ADD A FINAL CHECK IN FINALIZE TO HANDLE CONFLICTS OF TWO PEOPLE TRYING TO RENT THE SAME THING AT THE SAME TIME
    //    "/daterange/all" <-- reservation endpoint to get all reservations in daterange
            // build a utility OR CUSTOM HOOK? function to do this and run here so we don't bloat this component => in /utils/checkAvailability
            // THIS SHOULD LIVE ON THE INVENTORY PAGE AND SAVE USERS FROM ADDING THINGS THAT WON'T BE AVAILABLE. 
        setTotal(calculateTotal(cart))
    }, [cart, rentStart, rentEnd]); // rent start and rentEnd will rerender price if item is unavailable

    const handleChanges = e => {
        e.preventDefault();
        setReserveUser({
            ...reserveUser,
            [e.target.name]: e.target.value
        })
    }

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
        // will eventually integrate with paypal or stripe to take online payments with a widget
        alert("Feature not complete")
        e.preventDefault();
        // add reserve item dispatch
        // needs to match BE table => exception is id which will be parsed from cart
        console.log(`RENT START: ${rentStart} and  RENT END: ${rentEnd} on submit`)
        let newReservation = reserveUser;
        console.log(newReservation)
        newReservation.rentDate = rentStart;
        newReservation.returnDate = rentEnd;
        newReservation.items = cart; // pass an array to parse in BE
        if(!authState.isAuthenticated){
            newReservation.userStatus = "Guest"
        }
        dispatch(reserveItems(newReservation)) // change action to reservation
        // Add modal logic to open here
        // if logged in go to profile
        // otherwise send guest to inventory
    };
    const handleBack = () => {
        window.history.back()
    };
    console.log(rentStart, rentEnd)
    console.log(reserveUser)
    return(
        <div>
            <a onClick={handleBack}>Back</a>
            <h2>Checkout</h2>
            { !activeUser ?
                <> 
                    <label>First Name:</label>
                    <input name="renterFirstName" onChange={handleChanges} />
                    <label>Last Name: </label>
                    <input name="renterLastName" onChange={handleChanges} />
                    <label>Email: </label>
                    <input name="renterEmail" type="email" onChange={handleChanges} />
                </>
            :
                null
            }
            <div className='rent-dates'>
                <label>Pick-up Date</label>
                <input type="date" onChange={onStartChange} value={rentStart} />
                <label>Return Date</label>
                <input type="date" onChange={onEndChange} value={rentEnd} />
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
