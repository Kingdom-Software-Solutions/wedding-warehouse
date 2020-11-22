import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getUpcomingReservations } from '../../redux/actions/reserveActions';

import CircularProgress from '@material-ui/core/CircularProgress';



const UpcomingReservations = ({ userInfo }) => {
    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reserveReducer.reservations)
    const { email } = userInfo;

    const [showEdit, setShowEdit] = useState(false); // can prob use for cancelations

    // I should be able to cancel from here
    const toggleEdit = () => {
    setShowEdit(!showEdit)
    };

    useEffect(() => {
        dispatch(getUpcomingReservations(email))
    },[])

    console.log(reservations)

    return(
        <>
            {!showEdit ?
                <>
                {reservations.map(reservation => {
                    return(
                        <div key={reservation.reservationId}>
                            <p>Item: {reservation.itemName}</p>
                            <p>Rent Date: {reservation.rentStart}</p>
                            <p>Return Date:{reservation.returnDate}</p>
                        </div>
                    )
                })}
                </>  
            :
                <div>
                    Placeholder
                </div>
            }
        </>
    )
}

export default UpcomingReservations;