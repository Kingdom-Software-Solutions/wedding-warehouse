// file for admin table filters
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Grid, GridItem, Container, Input, Text, Select } from "@chakra-ui/react"
import { filterReservations } from '../../../redux/actions/adminActions';
import { getAllReservations } from '../../../redux/actions/reserveActions';

const FilterBar = ({ reservations }) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: "",
        startDate: "",
        returnDate: "",
        returnStatus: null
    })

    useEffect(() => {
        filterNames()
        filterReturnStatus()
        console.log('in use effect', reservations)

    }, [values])

    // filter functions
    function filterNames(){
        let searchString = values.name
        let filteredNames = reservations.filter(renter => {
            let nameString = `${renter.renterFirstName} ${renter.renterLastName}`
            return (
                nameString.includes(searchString)
            );
        });
        console.log(filteredNames)
        dispatch(filterReservations(filteredNames))
    };

    function filterReturnStatus(){
        // handle sqlite integer booleans
        if (process.env.REACT_APP_BASE_URL === "development"){
            if(values.returnStatus === 'true'){
                values.returnStatus = 1
            } else if(values.returnStatus === 'false'){
                values.returnStatus = 0
            }
        }
        console.log(values.returnStatus)
        let filteredStatus = reservations.filter(renter => renter.returned === values.returnStatus)
        console.log("filter by status", filteredStatus)
        dispatch(filterReservations(filteredStatus))
    };

    const handleChanges = e => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }
    console.log(reservations)
    console.log(values)

    return(
        <>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <GridItem style={{display: 'flex'}}>
                <Text mb="8px">Filter Name</Text>
                <Input          
                value={values.name}
                name="name"
                onChange={handleChanges}
                placeholder="Search a name"
                size="sm"/>
            </GridItem>
            <GridItem style={{display: 'flex'}}>
                <Text mb='8px'>Filter Dates:</Text>
                <Input
                    value={values.startDate}
                    name="startDate"
                    onChange={handleChanges}
                    type='date'
                    size="sm"
                />
                    <Input
                    value={values.returnDate}
                    name="returnDate"
                    onChange={handleChanges}
                    type='date'
                    size="sm"
                />
            </GridItem>
            <GridItem style={{display: 'flex'}}>
                <Text mb='8px'>Filter Status</Text>
                <Select name='returnStatus' placeholder="Select Status"
                value={null}
                onChange={handleChanges}>
                    {/* this has to be 0 and 1 as values cuz sqlite, need to check what it is in postgres 🙄 */}
                    {/* may need to use a .env check */}
                    <option value={true}>Returned</option>
                    <option value={false}>Not Returned</option>
                </Select>
            </GridItem>
        </Grid>
        </>
    )
}

export default FilterBar;
