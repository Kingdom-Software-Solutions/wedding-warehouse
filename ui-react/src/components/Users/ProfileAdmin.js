import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations } from '../../redux/actions/reserveActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProfileContainer } from '../styled/profile/ProfileMainStyles';


const ProfileAdmin = ({ userInfo }) => {
    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reserveReducer.reservations)

    const [showEdit, setShowEdit] = useState(false);

    // edit admin actions?
    const toggleEdit = () => {
    setShowEdit(!showEdit)
    };

    useEffect(() => {
        dispatch(getAllReservations())
    }, [])

    return(
        <>
            {!showEdit ?
                <div>
                {reservations.map(reservation => {
                    return (
                        <div key={reservation.reservationId}>
                            <p>Renter Name: {reservation.renterFirstName} {reservation.renterLastName}</p>
                            <p>Renter Email: {reservation.renterEmail}</p>
                            <p>Dates: {reservation.rentStart} {reservation.returnDate}</p>
                            <p>Status: {reservation.returned ? "Returned" : "Not Returned"} </p>
                        </div>
                    )
                })
                }
                </div>
            :
                <div>Placeholder</div>
            }
        </>
    )
}

export default ProfileAdmin;