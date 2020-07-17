import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDept, addItem, getAllDepts } from '../../redux/actions/warehouseActions'
import Button from '@material-ui/core/Button';
import { AuthBtn } from '../material-ui/AuthBtn';
import { axiosWithEnv } from '../../utils/axiosWithEnv';
import ImageUpload from './CloudinaryWidget';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';

//styles
import {
    AddInvContainer,
    FormTitle,
    StyledForm
} from '../styled/AddInvStyles'
import { MenuItem, Select } from '@material-ui/core';

const AddInventory = props => {
    const dispatch = useDispatch() // won't need with selector
    const history = useHistory()
    const [depts, setDepts] = useState([]);
    const [newDept, setNewDept] = useState({
        name: ""
    });
    // material ui select needs to be passed a value 👇
    const [initDept, setInitDept] = useState("")
    const [newItem, setNewItem] = useState({
        itemName: "",
        description: "",
        mainImgUrl: "",
        thumbnailUrl: "",
        rentalRate: NaN,
        buyNow: NaN,
        departmentId: 1
    });
    // used to show add dept field or not
    const [toggleDept, setToggleDept] = useState(false);

    // get dept for <select> on mount
    useEffect(()=>{
        // dispatch(getAllDepts());
        // maybe convert to get depts redux dispatch
        axiosWithEnv().get("/api/departments")
        .then(res => {
            console.log(res)
            setDepts(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    },[toggleDept]);

    // cloud image uploader

    const handleChanges = e => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    };

    const handleDeptId = e =>{
        setNewItem({
            ...newItem,
            departmentId: parseInt(e.target.value)
        })
    }

    // dispatches add dept
    const newDeptChanges = e =>{
        setNewDept({
            ...newDept,
            [e.target.name]: e.target.value
        })
    }
    const postDept = e =>{
        dispatch(addDept(newDept));
        setToggleDept(false)
    };

    const handleSubmitItem = e => {
        e.preventDefault();
        dispatch(addItem(newItem));
        // add success message or failure modal depending on response
        history.push("/inventory")
    }

    console.log(depts)
    console.log(newItem)

    return (
        <AddInvContainer>
            <FormTitle>Add New Item</FormTitle>
            <StyledForm onSubmit={handleSubmitItem}>
                <TextField label="Item Name *" name="itemName" onChange={handleChanges}/>
                <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                rowsMax={4} 
                name="description" 
                onChange={handleChanges}/>
                {/* image uploader here */}
                <ImageUpload newItem={newItem} setNewItem={setNewItem} />
                {newItem.thumbnailUrl ? 
                <img src={newItem.thumbnailUrl} />
                :
                null
                }
                <TextField
                label="$ Rental Rate"
                name="rentalRate" onChange={handleChanges}
                type="number"/>
                <TextField
                label="$ Buy Now Price" 
                name="buyNow" onChange={handleChanges}
                type="number"/>
                {/* Without this label throws an error */}
                <label htmlFor="departmentId"></label>
                <TextField
                select
                label="Department *"
                value={initDept}
                helperText="Please select a department"
                name="departmentId" onChange={handleDeptId}>
                    {depts.map(dept=>{
                        // console.log(dept)
                            return(
                                <MenuItem
                                key={dept.id}
                                value={dept.id}>
                                    {dept.name}
                                </MenuItem>
                            );
                    })};
                </TextField>
                { toggleDept ? <>
                <TextField label="New Department" name="name" onChange={newDeptChanges} />
                <Button onClick={postDept}>Add</Button>
                <Button onClick={()=>{
                    setToggleDept(false)
                }}>Cancel</Button>
                </>
                :
                <Button onClick={()=>{
                    setToggleDept(true)
                }}>Add New Department</Button>
                }
                <AuthBtn type="submit">Submit</AuthBtn>
                <Button href="/inventory">
                    Back
                </Button>
            </StyledForm>
        </AddInvContainer>
    )
};


export default AddInventory;