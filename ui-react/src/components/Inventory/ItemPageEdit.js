import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../redux/actions/warehouseActions'
import ItemPage from './ItemPage';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const ItemPageEdit = () => {
    const params = useParams(); // might pass id down
    const dispatch = useDispatch();
    const [editItem, setEditItem] = useState({
        itemName: "",
        description: "",
        quantity: NaN,
        isCustomizable: false,
        rentalRate: NaN,
        buyNow: NaN,
    });
    const [toggleCustomize, setToggleCustomize] = useState();

    const handleChanges = () => {
        setEditItem({
            ...editItem,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        dispatch()
    }

    return(
            <ItemEditForm onSubmit={handleUpdate}>
            <TextField 
            label="Edit Item Name" name="itemName"
            onChange={handleChanges} />
            <TextField                     id="standard-multiline-flexible"
            label="Description"
            multiline
            rowsMax={4} 
            name="description"
            onChange={handleChanges} />
            <TextField            
            label="$ Rental Rate"
            name="rentalRate" 
            type="number"
            onChange={handleChanges} />
            <Button
            color="primary" 
            type="submit">Update</Button>
            <Button onClick={()=> setToggleEdit(false)}>Back</Button>
        </ItemEditForm>  
    )

};

export default ItemPageEdit;