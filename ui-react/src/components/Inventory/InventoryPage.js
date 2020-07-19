import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllItems, deleteItem } from '../../redux/actions/warehouseActions';
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

// this component uses connect to map state to props as opposed to the useDispatch and useSector hooks
const InventoryPage = ({ getAllItems, deleteItem, items }) => {
    const history = useHistory();
    // for the warning in console. delete this comment after you address this
    // const { getAllItems, deleteItem } = props; // destructure redux actions
    const noImg = 'https://res.cloudinary.com/kss-image-cloud/image/upload/v1594874741/no-image_zrmqjk.png' // move this out into it's own export so it can be reused
    
    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [superUser, setSuperUser] = useState(false); // state for workaround
    const whitelist = ["00ul53sdvnWjre0aF4x6"];
    // local crud state management
    // state to handle reloading page after quick delete/update
    const [reload, setReload] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false)

    // workaround until I can pass superUser attribute from okta
    const checkSuperUser = (user) => {
        let verdict = whitelist.includes(user)
        return verdict ? setSuperUser(true) : null
    };
    // admin action to delete item
    const handleDelete = (id) =>{
        deleteItem(id);
    };
    
    // convert to hooks later for redux?
    useEffect(()=> {
        if (!authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            setUserInfo(null);
          } else {
            authService.getUser().then((info) => {
              checkSuperUser(info.sub) // uses the sub from the healthy response for workaround
              setUserInfo(info);
            });
          }
        getAllItems();
        // if this messes up items, make another useEffect
        // depends on auth status, super user status and if a crud action was taken
    }, [authState, authService, checkSuperUser(), reload]);

    
    console.log(userInfo, superUser)

    return(
        <InvPageContainer>
            <h2>Inventory Here</h2>
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
                              <StyledForm>
                                  <TextField label="Edit Item Name" name="itemName" />
                                  <TextField                     id="standard-multiline-flexible"
                                  label="Description"
                                  multiline
                                  rowsMax={4} 
                                  name="description" />
                                  <TextField                     label="$ Rental Rate"
                                  name="rentalRate" 
                                  type="number" />
                                  <Button>Update</Button>
                                  <Button onClick={()=> setToggleEdit(false)}>Back</Button>
                              </StyledForm>  
                            :
                                null
                            }
                        </DetailsContainer>
                        <ActionContainer>
                            <Button disabled>Reserve Now</Button>
                            <Button disabled>See More</Button>
                        </ActionContainer>
                        { superUser && !toggleEdit ? 
                            <ActionContainer>
                                <EditWithIcon onClick={()=> setToggleEdit(true)} />
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
        items: state.warehouseReducer.items
    }
}

export default connect(mapStateToProps, { getAllItems, deleteItem })(InventoryPage);