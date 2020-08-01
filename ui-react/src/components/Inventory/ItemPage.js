import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { getItem, deleteItem } from '../../redux/actions/warehouseActions';
import Button from '@material-ui/core/Button';
import { noImg } from '../../assets/imageAssets';
import { ItemPageContainer, ItemDiv, ItemImgContainer, ItemImg, ItemDetails, ActionsDiv, ItemName, Detail, Customizable, PriceContainer, ActionContainer } from '../styled/ItemPageStyles';
import ItemPageEdit from './ItemPageEdit';
import { DeleteWithIcon } from '../material-ui/Delete';
import { EditWithIcon } from '../material-ui/Update';

// add function to handle reserve item

// add tool tip for isCustomizable


const ItemPage = () => {
    const { id } = useParams(); // params hook grabs the id of the item
    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [superUser, setSuperUser] = useState(false);// state for workaround
    const whitelist = ["00ul53sdvnWjre0aF4x6"];
    // workaround until I can pass superUser attribute from okta
    const checkSuperUser = (user) => {
        console.log("user in function", user)
        let verdict = whitelist.includes(user)
        return verdict ? setSuperUser(true) : null
    };
    const dispatch = useDispatch();
    const item = useSelector(state => state.warehouseReducer.singleItem);
    // local crud state management
    const [reload, setReload] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);    
    useEffect(()=> {
        if (!authState.isAuthenticated) {
            // When user isn't authenticated, forget any user info
            setUserInfo(null);
            } else {
            authService.getUser().then((info) => {
                checkSuperUser(info.sub) // uses the sub from the healthy response for workaround to show item CRUD
                setUserInfo(info);
            });
        }
        dispatch(getItem(id))
    },[authState, authService,checkSuperUser(), reload]);

    console.log(item)
    console.log(item.isAvailable)
    console.log("super user status", superUser)

    const handleDelete = (id) =>{
        dispatch(deleteItem(id));
    };

    return (
        <ItemPageContainer>
            <Button className="back-btn" size="large" href="/inventory">Back</Button>
            <ItemDiv>
                <ItemName>{item.itemName}</ItemName>
                <ItemImgContainer>
                    <ItemImg img src={item.mainImgUrl || noImg}/>
                </ItemImgContainer>
                <ItemDetails>
                    <Detail>{item.description}</Detail>
                    { item.isCustomizable ?
                        <Customizable>Customizable</Customizable>
                        :
                        null
                    }
                    <PriceContainer>
                        <Detail>Rental Rate: ${item.rentalRate}</Detail>
                        <Detail>Purchase: ${item.buyNow}</Detail>
                    </PriceContainer>
                    {/* How should I show the quantity ? */}
                    <Detail>{item.quantity || "N/A"} units available</Detail>
                </ItemDetails>
                { item.isAvailable ?
                    <ActionsDiv>
                        <Button size="large">Reserve to Rent</Button>
                        {/* <Button size="large" disabled>Buy It</Button> */}
                    </ActionsDiv>
                    :
                    <ActionsDiv>
                        <Button size="large" disabled>Check Availability</Button>
                        {/* <Button className="buy-btn" size="large" disabled>Buy It</Button> */}
                    </ActionsDiv>
                }
                { superUser && !toggleEdit ? 
                    <ActionContainer>
                        <EditWithIcon onClick={()=>{
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
            { toggleEdit ?
                <ItemPageEdit id={id}
                reload={reload} 
                setReload={setReload} toggleEdit={toggleEdit} setToggleEdit={setToggleEdit} /> 
            :
                null
            }
        </ItemPageContainer>
    )
};

export default ItemPage;