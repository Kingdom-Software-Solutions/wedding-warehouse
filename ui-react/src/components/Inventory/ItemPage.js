import React,{ useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { getItem } from '../../redux/actions/warehouseActions';

import Button from '@material-ui/core/Button';
import { noImg } from '../../assets/imageAssets';


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
    },[authState, authService,checkSuperUser()]);

    console.log(item)
    console.log(item.isAvailable)
    console.log("super user status", superUser)
    return (
        <div>
            <Button href="/inventory">Back</Button>
            <h2>{item.itemName}</h2>
            <img src={item.mainImgUrl || noImg} />
            <p>{item.description}</p>
            { item.isCustomizable ?
                <div>Customizable</div>
                :
                null
            }
            <p>Rental Rate: ${item.rentalRate}</p>
            <p>Purchase: ${item.buyNow}</p>
            {/* How should I show the quantity */}
            <p>{item.quantity || 0} units available</p>
            { item.isAvailable ?
                <div>
                    <Button>Reserve to Rent</Button>
                    <Button>Buy</Button>
                </div>
                :
                <div>
                    <Button disabled>Not Available</Button>
                    <Button>Buy</Button>
                </div>
            }
        </div>
    )
};

export default ItemPage;