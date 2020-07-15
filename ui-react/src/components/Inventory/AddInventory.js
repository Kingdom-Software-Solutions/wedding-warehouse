import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDept, addItem, getAllDepts } from '../../redux/actions/warehouseActions'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import { AuthBtn } from '../material-ui/AuthBtn';
import axios from 'axios';
import { axiosWithEnv } from '../../utils/axiosWithEnv';
import ImageUpload from './CloudinaryWidget';


const AddInventory = props => {
    const dispatch = useDispatch() // won't need with selector
    const [depts, setDepts] = useState([]);
    const [newDept, setNewDept] = useState({
        name: ""
    });
    const [newItem, setNewItem] = useState({
        itemName: "",
        description: "",
        mainImgUrl: "",
        rentalRate: 0,
        buyNow: 0,
        departmentId: NaN
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
            departmentId: e.target.value
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
    // handles file for upload

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(addItem(newItem));
        // add success message or failure modal depending on response
    }

    console.log(depts)
    console.log(newItem)

    return (
        <div>
            <h3>Add Item to Inventory</h3>
            <form onSubmit={handleSubmit}>
                <label>Item Name</label>
                <input name="itemName" onChange={handleChanges}/>
                <label>Description</label>
                <textarea name="description" onChange={handleChanges}/>
                {/* image uploader here */}
                {/* <Button
                variant="contained"
                color="primary"
                type="file"
                onClick={handleCloudinary}
                startIcon={<AddAPhotoIcon />}
                >
                Upload
                </Button> */}
                <ImageUpload newItem={newItem} setNewItem={setNewItem} />
                <label>Rental Rate</label>
                <input name="rentalRate" onChange={handleChanges}/>
                <label>Buy Now Price</label>
                <input name="buyNow" onChange={handleChanges}/>
                <label htmlFor="departmentId">Select Department</label>
                <select name="departmentId" required={true} onChange={handleDeptId}>
                    <option value="" disabled selected>Required</option>
                    {depts.map(dept=>{
                        // console.log(dept)
                            return(
                                <option
                                key={dept.id}
                                value={dept.id}>
                                    {dept.name}
                                </option>
                            );
                    })};
                </select>
                { toggleDept ? <>
                <input name="name" onChange={newDeptChanges} />
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
            </form>
        </div>
    )
};


export default AddInventory;