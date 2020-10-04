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
import { BackLink, CheckoutContainer, CheckoutTitle, ConflictContainer, ConflictMessage, GuestFormContainer, CheckoutCartContainer, ReserveDateContainer, CheckoutItemContainer, CheckoutImageContainer, CheckoutInfoContainer, CheckoutItemImage, CheckoutItemName, CheckoutItemRate, FinalTotalPerDay, GuestLabel, GuestInput, DatePickerContainer, DateInput, DateLabel, GuestInputContainer, DateInputContainer, MasterInputContainer, CheckoutActions, RemoveText } from '../../styled/inventory/CheckoutStyles';
import { Button } from '@material-ui/core';
import { danger } from '../../styled/colors';
import { noImg } from '../../../assets/imageAssets';
import { priceFormatter } from '../../../utils/priceFormatter';

const Checkout = () => {
    const { authState, authService } = useOktaAuth();
    // custom hook to auto set the user if logged in
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
        // should we filter conflicts out of cart here?
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
        // ADD CHECK AVAILABILITY HERE
        dispatch(checkAvailability(rentStart, rentEnd))
            // if it returns anything, there was a conflict and a modal should appear that either continues without the conflicted items or reloads the checkout page.
        if(conflicts.length > 1){
            alert("There was a conflict with your items")
        } else {
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
        }
    };
    // ADD DISPATCH CLEAR CART HERE
    const handleBack = () => {
        window.history.back()
    };

    console.log(conflicts)
    return(
        <CheckoutContainer>
            <BackLink onClick={handleBack}>Back</BackLink>
            <CheckoutTitle>Checkout</CheckoutTitle>
            {/* Login state is passed to the modal to determine redirect */}
            { finished ? <CheckoutModal loginState={authState.isAuthenticated} /> : null }
            <MasterInputContainer>
                { !activeUser ?
                    // Added form div here due to rendering null if a registered user
                    // when adding validations, may be easier to do styled.form
                    <GuestFormContainer> 
                        <GuestInputContainer>
                            <GuestLabel>First Name:</GuestLabel>
                            <GuestInput name="renterFirstName" onChange={handleChanges} />
                        </GuestInputContainer>
                        <GuestInputContainer>
                            <GuestLabel>Last Name: </GuestLabel>
                            <GuestInput name="renterLastName" onChange={handleChanges} />
                        </GuestInputContainer>
                        <GuestInputContainer>
                            <GuestLabel>Email: </GuestLabel>
                            <GuestInput name="renterEmail" type="email" onChange={handleChanges} />
                        </GuestInputContainer>
                    </GuestFormContainer>
                :
                    null // should prob put users name here
                }
                <ReserveDateContainer className='rent-dates'>
                    <DatePickerContainer>
                        <DateInputContainer>
                            <DateLabel>Pick-up Date:</DateLabel>
                            <DateInput type="date" onChange={onStartChange} value={rentStart} min={today} />
                        </DateInputContainer>
                        <DateInputContainer>
                            <DateLabel>Return Date:</DateLabel>
                            <DateInput type="date" onChange={onEndChange} value={rentEnd} min={rentStart} />
                        </DateInputContainer>
                    </DatePickerContainer>

                    <Button className="availablity-button" onClick={handleCheckAvailability}>Check Availability</Button>
                </ReserveDateContainer>
            </MasterInputContainer>
            <CheckoutCartContainer className="item-container">
                {cart.map(item =>{
                    console.log(conflicts, 'conflicts')
                    // getting an array from the BE of just the item ids
                    let inConflicts = conflicts.filter(conflict => conflict === item.id)
                    if(inConflicts.length > 0){
                        return (
                            <ConflictContainer>
                                <ConflictMessage>{`${item.itemName} is not available in this date range!`}</ConflictMessage>
                                <RemoveText>Remove</RemoveText>
                                <CancelIcon htmlColor={danger} onClick={handleRemoveItem(item.id)} />
                            </ConflictContainer>
                        )
                    } else{
                        return(
                            <CheckoutItemContainer className="checkout-item" key={item.id}>
                                <CheckoutImageContainer>
                                    <CheckoutItemImage src={item.mainImgUrl ? item.mainImgUrl : noImg } alt="thumbnail" />
                                </CheckoutImageContainer>
                                <CheckoutInfoContainer>
                                    <CheckoutItemName>{item.itemName}</CheckoutItemName>
                                    <CheckoutItemRate>{priceFormatter(item.rentalRate)}</CheckoutItemRate>
                                    <CancelIcon htmlColor={danger} onClick={handleRemoveItem(item.id)} />
                                </CheckoutInfoContainer>
                            </CheckoutItemContainer>
                        )
                    }
                })}
            </CheckoutCartContainer>
            <FinalTotalPerDay>Total per Day: <span className="total-amount">{total}</span></FinalTotalPerDay>
            <CheckoutActions>
                <Button className="action clear" onClick={handleClearCart}>Clear Items</Button>
                <Button className="action finalize" onClick={handleFinalize}>Finalize Checkout</Button>
            </CheckoutActions>
        </CheckoutContainer>
    )
};

export default Checkout;
