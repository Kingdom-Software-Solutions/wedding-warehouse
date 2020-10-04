// RESERVE ITEM FORM (DEPRECATED)(DO NOT DELETE UNTIL CHECKOUT IS BUILT)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { getItem } from '../../redux/actions/warehouseActions';
import { Button } from '@material-ui/core';
import { reserveItem } from '../../redux/actions/reserveActions';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const ReserveItem = () => {
    const { id } = useParams();
    const { authState, authService } = useOktaAuth();
    const dispatch = useDispatch();
    const item = useSelector(state => state.warehouseReducer.singleItem)
    // Date and Time State
    const today = new Date().toISOString().split('T')[0];
    const returnDefault = new Date();
    // needs to be 3 days in the future at default for return date
    returnDefault.setDate(returnDefault.getDate() + 3)
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(returnDefault.toISOString().split('T')[0]); 
    // first name, last name, email needed 
    const [reserveUser, setReserveUser] = useState({
        renterFirstName: "",
        renterLastName: "",
        renterEmail: "",
        // status to tell the BE whether to tie this reservation to a user or not
        userStatus: ""
    })
    // use okta to get current user
    useEffect(() => {
        if (authState.isAuthenticated){
            authService.getUser()
            .then((user) => {
                console.log(user)
                setReserveUser({
                    ...reserveUser,
                    firstName: user.given_name,
                    lastName: user.family_name,
                    email: user.email,
                    userStatus: "loggedIn"
                });
            });
        };
        dispatch(getItem(id));
    }, [authService, authState])

    // Date and Time change handlers
    const onStartChange = (e) =>{
        e.preventDefault()
        setStartDate(e.target.value)
    };
    const onEndChange = e => {
        e.preventDefault()
        setEndDate(e.target.value)
    };
    const handleChanges = e => {
        e.preventDefault();
        setReserveUser({
            ...reserveUser,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        // add reserve item dispatch
        // needs to match BE table
        let newReservation = reserveUser
        newReservation.itemId = id
        newReservation.rentDate = startDate;
        newReservation.returnDate = endDate;
        if(!authState.isAuthenticated){
            newReservation.userStatus = "Guest"
        }
        // console.log(newReservation)
        // pass the item id and the new reservations to BE
        dispatch(reserveItem(id, newReservation))
    };
    // console.log("reserveUser", reserveUser)
    // console.log("item", item)
    return(
        <div>
            <h2>Reserve {item.itemName || "Error"}</h2>
            <form onSubmit={handleSubmit}>
                <label>First Name</label>
                <input type="text" name="renterFirstName" defaultValue={reserveUser.firstName} onChange={handleChanges} />
                <label>Last Name</label>
                <input type="text" name="renterLastName" defaultValue={reserveUser.lastName} onChange={handleChanges} />
                <label>Email</label>
                <input name="renterEmail" defaultValue={reserveUser.email} onChange={handleChanges} />
                {/* Start Date */}
                <label>Reserve Start</label>
                <input type="date"
                onChange={onStartChange}
                min={today}
                />
                {/* End Date */}
                <label>Reserve End</label>
                <input 
                type="date" 
                name="reserveEnd"
                onChange={onEndChange}
                min={startDate}
                />
                <Button color="secondary"
                onClick={() => window.history.back()}
                >
                    Back
                </Button>
                <Button type="submit" color="primary">
                    Finalize
                </Button>
            </form>
            {/* Add checkout to pay online here in later release */}
        </div>
    )
};

export default ReserveItem;