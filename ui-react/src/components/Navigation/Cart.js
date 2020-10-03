import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, clearCart } from '../../redux/actions/cartActions';
import CancelIcon from '@material-ui/icons/Cancel';
import CloseIcon from '@material-ui/icons/Close';
import { ButtonContainer, CartContainer, CartItem, CartTitle, DetailsImage, ImageContainer, ItemDetails, ItemName, ItemRate, TopBar, TotalPerDay } from '../styled/navigation/CartStyles';
import { calculateTotal } from '../../utils/calculateTotal';
import { priceFormatter } from '../../utils/priceFormatter';
import { noImg } from '../../assets/imageAssets';
import { InfoContainer } from '../styled/AddInvStyles';
import { danger } from '../styled/colors';
import { Button } from '@material-ui/core';

const Cart = props => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cartReducer.items)
    const [total, setTotal] = useState("$0.00");

    useEffect(() => {
        setTotal(calculateTotal(cartItems))
    }, [cartItems])

    // add event handlers to remove item and clear cart 
    const handleCloseCart = e => {
        props.setOpenCart(false)
    }
    const handleRemoveItem = id => () => {
        dispatch(removeFromCart(id))
    };
    const handleClearCart = e => {
        dispatch(clearCart())
    }
    return(
        <CartContainer>
            <TopBar>
                <CartTitle>Your Cart</CartTitle>
                <CloseIcon onClick={handleCloseCart} />
            </TopBar>
            {cartItems.map(item => {
                return(
                    <CartItem key={item.id}>
                        <ItemDetails>
                            <ImageContainer>
                                {item.thumbnailUrl ?
                                    <DetailsImage src={item.thumbnailUrl} />
                                :
                                    <DetailsImage src={noImg} />
                                }
                            </ImageContainer>
                            <InfoContainer>
                                <ItemName>{item.itemName}</ItemName>
                                <ItemRate>{priceFormatter(item.rentalRate)}</ItemRate>
                            </InfoContainer>
                        <CancelIcon htmlColor={danger} fontSize="small" className="remove-item" onClick={handleRemoveItem(item.id)} />
                        </ItemDetails>
                    </CartItem>
                )
            })}
            <TotalPerDay>Total per day: <span className="total-amount">{total}</span></TotalPerDay>
            <ButtonContainer>
                <Button className="action clear" onClick={handleClearCart}>Clear Items</Button>
                <Button className="action checkout" onClick={() => history.push("/checkout")}>Checkout</Button>
            </ButtonContainer>
        </CartContainer>
    )
};

export default Cart;