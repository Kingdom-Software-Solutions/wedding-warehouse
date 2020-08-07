// RESERVE ITEM FORM
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { getItem } from '../../redux/actions/warehouseActions';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const ReserveItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { authState, authService } = useOktaAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date()); // needs to be 3 days in the future at default
    // disable users from selecting in the past or before start date
    // const disabledDates = [yesterday, startDate]
    // first name, last name, email needed 
    const [reserveUser, setReserveUser] = useState({
        firstName: "",
        lastName: "",
        email: ""
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
                    email: user.email
                });
            });
        };
        dispatch(getItem(id));
    }, [authService, authState])
    // since users are on okta maybe just have a reservation table that saves a name and uses the in place, users_rented table => rename reservation_rented
    const onStartChange = (e) =>{
        e.preventDefault()
        setStartDate(e.target.value)
    };
    const onEndChange = e => {
        e.preventDefault()
        setEndDate(e.target.value)
    }
    // console.log(reserveUser)
    return(
        <div>
            <h2>Reserve Item</h2>
            <form>
                <label>First Name</label>
                <input type="text" name="first" defaultValue={reserveUser.firstName} />
                <label>Last Name</label>
                <input type="text" name="last" defaultValue={reserveUser.lastName} />
                <label>Email</label>
                <input name="email" defaultValue={reserveUser.email} />
                {/* Start Date */}
                <label>Reserve Start</label>
                <input type="date"
                onChange={onStartChange}
                value={startDate}
                />
                {/* End Date */}
                <label>Reserve End</label>
                <input 
                type="date" 
                name="reserveEnd"
                onChange={onEndChange}
                />
            </form>
        </div>
    )
};

export default ReserveItem;