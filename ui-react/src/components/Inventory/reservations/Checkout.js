import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { removeFromCart, clearCart } from '../../../redux/actions/cartActions';
import { reserveItems, checkAvailability } from '../../../redux/actions/reserveActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { calculateTotal } from '../../../utils/calculateTotal';
import { useGetUser } from '../../../okta/getOktaUser';
import CheckoutModal from '../../material-ui/modals/CheckoutModal';

const Checkout = () => {
    const { authState, authService } = useOktaAuth();
    const activeUser = useGetUser()
    const history = useHistory()
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cartReducer.items)
    const dates = useSelector(state => state.reserveReducer.dates);
    const conflicts = useSelector(state => state.reserveReducer.conflicts)
    const today = new Date().toISOString().split('T')[0];
    const [rentStart, setRentStart] = useState(dates.pickUp);
    const [rentEnd, setRentEnd] = useState(dates.returnal);
    const [reserveUser, setReserveUser] = useState(activeUser || {
        renterFirstName: "",
        renterLastName: "",
        renterEmail: "",        
    })
    const [total, setTotal] = useState("$0.00");
    const [finished, setFinished] = useState(false)

    useEffect(() => {
       // pull that items reservations and check them, if there is one, grey out the item and remove it's rent per day from the total
        setTotal(calculateTotal(cart))
    }, [cart, rentStart, rentEnd, conflicts]); // rent start and rentEnd will rerender price if item is unavailable

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

    const handleCheckAvailability = () => {
        dispatch(checkAvailability(rentStart, rentEnd))
    }

    const handleRemoveItem = id => () => {
        dispatch(removeFromCart(id))
    };
    const handleClearCart = e => {
        dispatch(clearCart())
    }
    const handleFinalize = e => {
        // will eventually integrate with paypal or stripe to take online payments with a widget
        e.preventDefault();
        // NEED TO CHECK FOR CONFLICTS ONE LAST TIME HERE, PASS ERROR TO CHECKOUT MODAL IF THERE IS ONE
        let newReservation = reserveUser;
        newReservation.rentDate = rentStart;
        newReservation.returnDate = rentEnd;
        newReservation.items = cart; // pass an array to parse in BE

        if(!authState.isAuthenticated){
            newReservation.userStatus = "Guest"
        }
        dispatch(reserveItems(newReservation)) 
        // Add modal logic to open here until online payment is built
        setFinished(true)
        // post payment widget:
            // modal should say payment was successful then do redirect
    };
    const handleBack = () => {
        window.history.back()
    };

    console.log(conflicts)
    return(
        <div>
            <a onClick={handleBack}>Back</a>
            <h2>Checkout</h2>
            { finished ? <CheckoutModal loginState={authState.isAuthenticated} /> : null }
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
                <input type="date" onChange={onStartChange} value={rentStart} min={today} />
                <label>Return Date</label>
                <input type="date" onChange={onEndChange} value={rentEnd} min={rentStart} />
                <button onClick={handleCheckAvailability}>Check Availability</button>
            </div>
            
            {cart.map(item =>{
                console.log(conflicts, 'conflicts')
                let inConflicts = conflicts.filter(conflict => conflict.id === item.id)
                if(inConflicts.length > 0){
                    return (
                        <div>
                            <p>{`${item.itemName} is not available in your date range`}</p>
                        </div>
                    )
                } else{
                    return(
                        <div key={item.id}>
                            <img src={item.thumbnailUrl} alt="thumbnail" />
                            <p>{item.itemName}</p>
                            <p>{item.rentalRate}</p>
                            <CancelIcon onClick={handleRemoveItem(item.id)} />
                        </div>
                    )
                }
            })}
            <p>Total per Day: {total}</p>
            <button onClick={handleClearCart}>Clear Items</button>
            <button onClick={handleFinalize}>Finalize Checkout</button>
        </div>
    )
};

export default Checkout;
