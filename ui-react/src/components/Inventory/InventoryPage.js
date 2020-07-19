import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllItems } from '../../redux/actions/warehouseActions';
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


const InventoryPage = props => {
    const history = useHistory();
    // for the warning in console. delete this comment after you address this
    const { getAllItems } = props;
    const noImg = 'https://res.cloudinary.com/kss-image-cloud/image/upload/v1594874741/no-image_zrmqjk.png'
    
    const { authState, authService } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);
    const [superUser, setSuperUser] = useState(false); // state for workaround
    const whitelist = ["00ul53sdvnWjre0aF4x6"];

    // workaround until I can pass superUser attribute from okta
    const checkSuperUser = (user) => {
        let verdict = whitelist.includes(user)
        return verdict ? setSuperUser(true) : null
    }
    
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
    }, [authState, authService, checkSuperUser()])
    
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
            {/* Add ternary for spinner of null if retrieving items */}
            <MappedItems>
            {props.items.map(item =>{
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
                        </DetailsContainer>
                        <ActionContainer>
                            <Button disabled>Reserve Now</Button>
                            <Button disabled>See More</Button>
                        </ActionContainer>
                        {/* <DeleteWithIcon /> */}
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

export default connect(mapStateToProps, { getAllItems })(InventoryPage);