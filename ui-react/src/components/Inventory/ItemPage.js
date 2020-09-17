import React,{ useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { parseJwt } from '../../utils/parseJwt';
import { getItem, deleteItem } from '../../redux/actions/warehouseActions';
import Button from '@material-ui/core/Button';
import { noImg } from '../../assets/imageAssets';
import { ItemPageContainer, ItemDiv, ItemImgContainer, ItemImg, ItemDetails, ActionsDiv, ItemName, Detail, PriceContainer, ActionContainer } from '../styled/ItemPageStyles';
import ItemPageEdit from './ItemPageEdit';
import { DeleteWithIcon } from '../material-ui/Delete';
import { EditWithIcon } from '../material-ui/Update';
import Customizable from '../material-ui/CustomizablePopover';

import InvNav from '../Navigation/InvNavBar';

const ItemPage = () => {
    const { id } = useParams(); // params hook grabs the id of the item
    // check super user status
    const history = useHistory()
    const today = new Date() // today's date to check if item is avialable now
    const { authState, authService } = useOktaAuth();
    const [superUser, setSuperUser] = useState(false);
    const dispatch = useDispatch();
    const item = useSelector(state => state.warehouseReducer.singleItem);
    // local crud state management
    const [reload, setReload] = useState(false);
    const [toggleEdit, setToggleEdit] = useState(false);    
    useEffect(()=> {
        if (authState.isAuthenticated){
            authService.getAccessToken()
            .then((token) => {
                let user = parseJwt(token)
                setSuperUser(user.SuperUser) 
            });
        };
        dispatch(getItem(id));
    },[authState, authService, superUser, reload]);

    const handleDelete = (id) =>{
        dispatch(deleteItem(id));
    };

    return (
        <>
        <InvNav />
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
                        <Customizable />
                        :
                        null
                    }
                    <PriceContainer>
                        <Detail>Rental Rate: ${item.rentalRate}</Detail>
                        {/* <Detail>Purchase: ${item.buyNow}</Detail> */}
                    </PriceContainer>
                    {/* How should I show the quantity ? */}
                    <Detail>{item.quantity || "N/A"} units available</Detail>
                </ItemDetails>
                { item.isAvailable ?
                    <ActionsDiv>
                        <Button size="large"
                        onClick={() => history.push(`/reserve/item/${id}`)}
                        >Reserve to Rent</Button>
                        {/* <Button size="large" disabled>Buy It</Button> */}
                    </ActionsDiv>
                    :
                    <ActionsDiv>
                        <Button size="large" disabled>Currently Unavailable</Button>
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
        </>
    )
};

export default ItemPage;