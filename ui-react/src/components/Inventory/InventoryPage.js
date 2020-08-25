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
    const today = new Date(); // used to check if items are ready today
    const noImg = 'https://res.cloudinary.com/kss-image-cloud/image/upload/v1594874741/no-image_zrmqjk.png' // move this out into it's own export so it can be reused
    const { authState, authService } = useOktaAuth();
    const [superUser, setSuperUser] = useState(false); 

    // local crud state management
    // state to handle reloading page after quick delete/update
    const [reload, setReload] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false); 
    const [update, setUpdate] = useState()
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

    useEffect(()=> {
        if (authState.isAuthenticated){
            authService.getAccessToken()
            .then((token) => {
                let user = parseJwt(token)
                setSuperUser(user.SuperUser) 
            });
        };
        getAllItems();
    }, [authState, authService, superUser, reload]);

    return(
        <InvPageContainer>
            {/* Add dropdown filter by department (stretch) */}
            {/* Add search to filter by item (stretch) */}
            {/* Add button to suggestion form (stretch) */}
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
                            <span>Rent per Day: ${item.rentalRate}</span>
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
                            {item.isAvailable ?
                            <Button onClick={() => history.push(`/reserve/item/${item.id}`)}>Reserve Now</Button>
                            :
                            <Button disabled>Unavailable</Button>                            
                            }
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