// file for admin table filters
import React, { useState, useEffect } from 'react';
import { Grid, GridItem, Container, Input, Text, Select } from "@chakra-ui/react"


const FilterBar = (reservations) => {
    console.log(reservations)
    const [values, setValues] = useState({
        name: "",
        startDate: "",
        returnDate: "",
        returnStatus: null
    })

    const handleChanges = e => {
        e.preventDefault();
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }

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
                <Select name='returnStatus' placeholder="Select Status">
                    <option value="true">Returned</option>
                    <option value="false">Not Returned</option>
                </Select>
            </GridItem>
        </Grid>
        </>
    )
}

export default FilterBar;
