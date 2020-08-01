import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllItems, deleteItem, updateItem } from '../../redux/actions/warehouseActions';
import { useOktaAuth } from '@okta/okta-react';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';


// page styles
import {
    InvPageContainer,
    MappedItems,
    ItemDiv,
    ImgContainer,
    StyledImg,
    DetailsContainer,
    ActionContainer
} from '../styled/InvPageStyles'
import { DeleteWithIcon } from '../material-ui/Delete';
import { EditWithIcon } from '../material-ui/Update';
import { TextField } from '@material-ui/core';
import { StyledForm } from '../styled/AddInvStyles';
import { parseJwt } from '../../utils/parseJwt';


// this component uses connect to map state to props as opposed to the useDispatch and useSector hooks
const InventoryPage = ({ getAllItems, deleteItem, items, updateItem }) => {
    const history = useHistory();
    const noImg = 'https://res.cloudinary.com/kss-image-cloud/image/upload/v1594874741/no-image_zrmqjk.png' // move this out into it's own export so it can be reused
    const { authState, authService } = useOktaAuth();
    const [superUser, setSuperUser] = useState(false); 
    // const checkSuperUser = (user) => {
    //     let verdict = whitelist.includes(user)
    //     return verdict ? setSuperUser(true) : null
    // };
    

    // local crud state management
    const [reload, setReload] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false); // state to handle reloading page after quick delete/update
    const [update, setUpdate] = useState({
        itemName: "",
        description: "",
        rentalRate: NaN
    })
    const [updateId, setUpdateId] = useState(NaN);

    // admin action to delete item
    const handleDelete = (id) =>{
        deleteItem(id);
    };
    // admin actions to update item
    const handleChanges = e => {
        setUpdate({
            ...update,
            [e.target.name]: e.target.value
        });
    };
    const handleUpdate = e => {
        e.preventDefault();
        updateItem(updateId, update) // dispatch call
        setToggleEdit(false);
        setReload(!reload)
    };
    
    // convert to hooks later for redux?
    useEffect(()=> {
        if (authState.isAuthenticated){
            authService.getAccessToken()
            .then((token) => {
                let user = parseJwt(token)
                setSuperUser(user.SuperUser) 
            });
        }
        getAllItems();
        // if this messes up items, make another useEffect
        // depends on auth status, super user status and if a crud action was taken
    }, [authState, authService, superUser, reload]);
    console.log(superUser)
    // DO NOT PUSH THIS CONSOLE LOG
    // console.log("DO NOT PUSH ME", userInfo, superUser)

    return(
        <InvPageContainer>
            <h2>Inventory</h2>
            {/* Add dropdown filter by department (stretch) */}
            {/* Add search to filter by item (stretch) */}
            { superUser ? 
                <>
                    <Button
                    color="primary"
                    startIcon={<AddIcon />}
                    href="/inventory/addItem"
                    >
                    Add Inventory
                    </Button>
                </>
                :
                null
            }
            {/* Add loading bar when inventory not showing */}
            <MappedItems>
            {items.map(item =>{
                return ( 
                    <ItemDiv key={item.id}>
                        <ImgContainer>
                            {item.mainImgUrl ?
                            <StyledImg src={item.mainImgUrl}
                            alt="item image"/>
                            :
                            <StyledImg src={noImg}
                            alt="item image"/>
                            }
                        </ImgContainer>
                        <DetailsContainer>
                            <h3>{item.itemName}</h3>
                            <p>{item.description}</p>
                            {/* add customizable with "i" icon */}
                            <span>Rent: ${item.rentalRate}</span>
                            {/* <span>Buy ${item.buyNow}</span> */}
                            {toggleEdit ? 
                              <StyledForm onSubmit={handleUpdate}>
                                  <TextField 
                                  label="Edit Item Name" name="itemName"
                                  onChange={handleChanges} />
                                  <TextField                     id="standard-multiline-flexible"
                                  label="Description"
                                  multiline
                                  rowsMax={4} 
                                  name="description"
                                  onChange={handleChanges} />
                                  <TextField                     label="$ Rental Rate"
                                  name="rentalRate" 
                                  type="number"
                                  onChange={handleChanges} />
                                  <Button
                                  color="primary" 
                                  type="submit">Update</Button>
                                  <Button onClick={()=> setToggleEdit(false)}>Back</Button>
                              </StyledForm>  
                            :
                                null
                            }
                        </DetailsContainer>
                        <ActionContainer>
                            <Button disabled>Reserve Now</Button>
                            <Button href={`inventory/item/${item.id}`}>See More</Button>
                        </ActionContainer>
                        { superUser && !toggleEdit ? 
                            <ActionContainer>
                                <EditWithIcon onClick={()=>{
                                    setUpdateId(item.id)
                                    setToggleEdit(true)
                                }} />
                                <DeleteWithIcon onClick={()=>{
                                    setReload(!reload)
                                    handleDelete(item.id)
                                }} />                            
                            </ActionContainer>                     
                        :
                         null
                        }
                    </ItemDiv>
                )
            })}
            </MappedItems>
        </InvPageContainer>
    )
};

const mapStateToProps = state => {
    return {
        items: state.warehouseReducer.items,
        isUpdating: state.warehouseReducer.isUpdating
    }
}

export default connect(mapStateToProps, { getAllItems, deleteItem, updateItem })(InventoryPage);