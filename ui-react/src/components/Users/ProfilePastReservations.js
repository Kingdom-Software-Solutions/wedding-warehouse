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
            </div>
        </>
    )
}

export default PastReservations;