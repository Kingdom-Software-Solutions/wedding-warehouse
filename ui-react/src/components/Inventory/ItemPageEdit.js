import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateItem } from '../../redux/actions/warehouseActions'
import { ItemEditForm, InfoContainer, ToggleContainer } from '../styled/ItemDetailsStyles';
import TextField from '@material-ui/core/TextField';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Button from '@material-ui/core/Button';

const ItemPageEdit = ({ id, reload, setReload, setToggleEdit }) => {
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
    const handleToggleCustom = () => {
        setEditItem({
            ...editItem,
            isCustomizable: !editItem.isCustomizable
        })
    }

    const handleChanges = e => {
        setEditItem({
            ...editItem,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = e => {
        e.preventDefault();
        dispatch(updateItem(id, editItem))
        setReload(!reload)
    };

    console.log(editItem)

    return(
        <ItemEditForm onSubmit={handleUpdate}>
            <InfoContainer>
            <TextField 
            label="Edit Item Name" name="itemName"
            onChange={handleChanges} />
            <TextField                     id="standard-multiline-flexible"
            label="Edit Item Description"
            multiline
            rowsMax={4} 
            name="description"
            onChange={handleChanges} />
            <TextField                     
            label="$ Edit Rental Rate"
            name="rentalRate" 
            type="number"
            onChange={handleChanges} />
            <TextField
            label="$ Edit Buy Now Price" 
            name="buyNow" onChange={handleChanges}
            type="number"/>
            <TextField
            label="Edit Quantity"
            name="quantity" onChange={handleChanges}
            type="number"/>
            <ToggleContainer>
            { editItem.isCustomizable ?
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
            <Button
            onClick={handleUpdate}
            color="primary" 
            type="submit">Update</Button>
            <Button onClick={()=> setToggleEdit(false)}>Back</Button>
        </ItemEditForm>  
    )

};

export default ItemPageEdit;