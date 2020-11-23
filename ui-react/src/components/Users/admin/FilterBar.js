// file for admin table filters
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { Grid, GridItem, Container, Input, Text, Select } from "@chakra-ui/react"
import { filterReservations } from '../../../redux/actions/adminActions';

const FilterBar = ({ reservations }) => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        name: "",
        startDate: "",
        returnDate: "",
        returnStatus: null
    })

    useEffect(() => {
        let re = new RegExp(values.name, 'i')
        filterNames()
        console.log('in use effect', reservations)

    }, [values])

    function filterNames(){
        let searchString = values.name
        let filteredNames = reservations.filter(renter => {
            let nameString = `${renter.renterFirstName} ${renter.renterLastName}`
            console.log(nameString)
            return (
                nameString.includes(searchString)
            );
        })
        console.log(filteredNames)
        // create a filter action in redux to reuse 
        dispatch(filterReservations(filteredNames))

    }

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
                onChange={handleChanges}>
                    <option value="true">Returned</option>
                    <option value="false">Not Returned</option>
                </Select>
            </GridItem>
        </Grid>
        </>
    )
}

export default FilterBar;
