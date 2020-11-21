import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPastReservations } from '../../redux/actions/reserveActions';
import CircularProgress from '@material-ui/core/CircularProgress';


const PastReservations = ({ userInfo }) => {
    const { email } = userInfo
    console.log(email)
    const dispatch = useDispatch()
    const reservations = useSelector(state => state.reserveReducer.reservations)

    useEffect(() => {
        dispatch(getPastReservations(email))
    }, [])

    console.log(reservations)

    return(
        <>
            <div>
            <h3>Reservation History</h3>
            {reservations.length < 1 ?
                <p>No Reservations yet</p>
            :
                <div>
                    {reservations.map(reservation => {
                        return(
                            <div key={reservation.reservationId}>
                                <p>Item: {reservation.itemName}</p>
                                <p>Rent Date: {reservation.rentStart}</p>
                                <p>Return Date:{reservation.returnDate}</p>
                                <p>Return Status: {reservation.returned ? "Returned" : "Overdue" }</p>
                            </div>
                        )
                    })}
                </div>
            }
            </div>
        </>
    )
}

export default PastReservations;