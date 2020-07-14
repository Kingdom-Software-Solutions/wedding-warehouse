import React, { useState, useEffect } from 'react';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import { AuthBtn } from '../material-ui/AuthBtn';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { axiosWithEnv } from '../../utils/axiosWithEnv';

const AddInventory = props => {
    const [depts, setDepts] = useState([]);
    const [newItem, setNewItem] = useState({
        itemName: "",
        description: "",
        rentalRate: 0,
        buyNow: 0,
    });
    const [error, setError] = useState({ message: ""});

    // get dept for <select> on mount
    useEffect(()=>{
        axiosWithEnv().get("/api/departments")
        .then(res => {
            console.log(res)
            setDepts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[]);


    return (
        <div>
            <h3>Add Item to Inventory</h3>
            <form>
                <label>Item Name</label>
                <input />
                <label>Description</label>
                <textarea name="description" />
                {/* image uploader here */}
                <Button
                variant="contained"
                color="primary"
                // className={classes.button}
                startIcon={<AddAPhotoIcon />}
                >
                Upload
                </Button>
                <label>Rental Rate</label>
                <input />
                <label>Buy Now Price</label>
                <input />
                <label htmlFor="deptId">Select Department</label>
                <select name="deptId" required={true}>
                    <option value="" disabled selected>Required</option>
                    {depts.map(dept=>{
                        console.log(dept)
                            return(
                                <option
                                key={dept.id}
                                value={dept.id}>
                                    {dept.name}
                                </option>
                            );
                    })};
                </select>
                <AuthBtn>Submit</AuthBtn>
                <Button href="/inventory">
                    Back
                </Button>
            </form>
        </div>
    )
};


export default AddInventory;