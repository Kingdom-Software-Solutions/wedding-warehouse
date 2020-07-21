import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addDept, addItem, getAllDepts } from '../../redux/actions/warehouseActions'
import Button from '@material-ui/core/Button';
import { AuthBtn } from '../material-ui/AuthBtn';
import { axiosWithEnv } from '../../utils/axiosWithEnv';
import ImageUpload from './CloudinaryWidget';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { MenuItem, Select } from '@material-ui/core';

//styles
import {
    AddInvContainer,
    FormTitle,
    StyledForm,
    InfoContainer,
    ToggleContainer,
    UploadContainer,
    PriceContainer,
    DeptContainer,
    SubmitContainer
} from '../styled/AddInvStyles';


const AddInventory = props => {
    const dispatch = useDispatch() // won't need with selector
    const history = useHistory();
    let thisDeptId;
    const [depts, setDepts] = useState([]);
    // state to update isCustomizable with a toggle
    const [toggleCustom, setToggleCustom] = useState(false);
    const [newDept, setNewDept] = useState({
        name: ""
    });
    // material ui select needs to be passed a value 👇
    const [deptValue, setDeptValue] = useState("")
    const [newItem, setNewItem] = useState({
        itemName: "",
        description: "",
        quantity: NaN,
        isCustomizable: false,
        mainImgUrl: "",
        thumbnailUrl: "",
        rentalRate: NaN,
        buyNow: NaN,
        departmentId: 1,
    });
    // used to show add dept field or not
    const [toggleDept, setToggleDept] = useState(false)

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


    const handleChanges = e => {
        setNewItem({
            ...newItem,
            [e.target.name]: e.target.value
        });
    };
    // handles customizable change
    const handleToggleCustom = () => {
        setNewItem({
            ...newItem,
            isCustomizable: !newItem.isCustomizable
        })
    }

    const handleDeptId = e =>{
        // filters to assign the department id of the selected dept
        // this was done because I needed a string value (prior to this I had it setting the deptId on the newItem) for the material ui dropdown component but I need to pass a deptId to the BE so I got my cake and ate it too
        let thisDeptId = depts.filter(dept => dept.name === e.target.value)
        console.log(thisDeptId)
        newItem.departmentId = thisDeptId[0].id
        setDeptValue(e.target.value)
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
        setToggleDept(false);
    };

    const handleSubmitItem = async e => {
        e.preventDefault();
        setNewItem({
            ...newItem,
            departmentId: thisDeptId
        })
        await dispatch(addItem(newItem));
        // add success message or failure modal depending on response
        history.push("/inventory")
    };

    console.log(depts)
    console.log(newItem)

    return (
        <AddInvContainer>
            <FormTitle>Add New Item</FormTitle>
            <StyledForm onSubmit={handleSubmitItem}>
                <InfoContainer>
                    <TextField label="Item Name *" name="itemName" onChange={handleChanges}/>
                    <TextField
                    id="standard-multiline-flexible"
                    label="Description"
                    multiline
                    rowsMax={4} 
                    name="description" 
                    onChange={handleChanges}/>
                    <TextField
                    label="Quantity"
                    name="quantity" onChange={handleChanges}
                    type="number"/>
                    <ToggleContainer>
                    { newItem.isCustomizable ?
                        <> 
                        <label>Customizable</label> 
                        <CheckBoxIcon color="primary" onClick={handleToggleCustom}/>
                        </>
                        :
                        <>
                        <label>Customizable?</label> 
                        <CheckBoxOutlineBlankIcon onClick={handleToggleCustom}/>
                        </>
                    }
                    </ToggleContainer>
                </InfoContainer>
                {/* image uploader here */}
                <UploadContainer>
                    <ImageUpload newItem={newItem} setNewItem={setNewItem} />
                    {newItem.thumbnailUrl ? 
                    <img src={newItem.thumbnailUrl} />
                    :
                    null
                    }
                </UploadContainer>
                <PriceContainer>
                    <TextField
                    label="$ Rental Rate"
                    name="rentalRate" onChange={handleChanges}
                    type="number"/>
                    <TextField
                    label="$ Buy Now Price" 
                    name="buyNow" onChange={handleChanges}
                    type="number"/>
                    
                </PriceContainer>
                <DeptContainer>
                    {/* Without this label throws an warning */}
                    <label htmlFor="departmentId"></label>
                    <TextField
                    select
                    label="Department *"
                    value={deptValue}
                    helperText="Please select a department"
                    name="departmentId" onChange={handleDeptId}>                     
                        {depts.map(dept=>{
                            // console.log(dept)
                                return(
                                    <MenuItem
                                    key={dept.id}
                                    value={dept.name}>
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
                </DeptContainer>
                <SubmitContainer>
                    <AuthBtn type="submit">Submit</AuthBtn>
                    <Button href="/inventory">
                        Back
                    </Button>
                </SubmitContainer>
            </StyledForm>
        </AddInvContainer>
    )
};


export default AddInventory;