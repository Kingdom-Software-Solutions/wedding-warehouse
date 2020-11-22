import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllReservations } from '../../../redux/actions/reserveActions';

import { DataGrid } from '@material-ui/data-grid';
import { sortModel, columns} from './utils';
import { Center } from "@chakra-ui/react"
import CircularProgress from '@material-ui/core/CircularProgress';
import { Container } from '@material-ui/core';
import FilterBar from './FilterBar';



const ProfileAdmin = ({ userInfo }) => {
    const dispatch = useDispatch();
    const reservations = useSelector(state => state.reserveReducer.reservations)

    useEffect(() => {
        dispatch(getAllReservations())
    }, [])

    return(
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
        <h3>User Reservations</h3>
        <FilterBar reservations={reservations} />
        <Container className='reservationsTable' maxWidth='md'>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={reservations} columns={columns} pageSize={10} checkboxSelection 
                sortingOrder={['desc', 'asc']}
                sortModel={sortModel}
                />
            </div>
        </Container>
      </div>
    )
}

export default ProfileAdmin;