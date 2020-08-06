// RESERVE ITEM FORM
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { parseJwt } from '../../utils/parseJwt';
import { getItem } from '../../redux/actions/warehouseActions';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const ReserveItem = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { authState, authService } = useOktaAuth();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    // disable users from selecting in the past or before start date
    // const disabledDates = [yesterday, startDate]
    // first name, last name, email needed 
    const [reserveUser, setReserveUser] = useState({
        name: "",
        email: ""
    })
    // use okta to get current user
    useEffect(() => {
        if (authState.isAuthenticated){
            authService.getAccessToken()
            .then((token) => {
                let user = parseJwt(token)
                console.log(user)
                setReserveUser(user)
            });
        };
        dispatch(getItem(id));
    }, [authService, authState])
    // since users are on okta maybe just have a reservation table that saves a name and uses the in place, users_rented table => rename reservation_rented
    const onStartChange = (value) =>{
        setStartDate(value)
    };
    return(
        <div>
            <h2>Reserve Item</h2>
            <form>
                <input name="name" value={reserveUser.userN} />
                <input name="email" value={reserveUser.email} />
                {/* Start Date */}
                <Calendar
                onChange={onStartChange}
                value={startDate}
                />
            </form>
        </div>
    )
};

export default ReserveItem;