import styled from 'styled-components';
import {
    pinkLady,
    spicyMix,
    floralWhite,
    floralWhiteLite,
    jon,
    acadia,
    success
} from '../colors';

export const CheckoutContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 2% 5%;
`;

export const BackLink = styled.div`
    cursor: pointer;
    align-self: flex-start;
`;

export const CheckoutTitle = styled.h2`

`;

export const GuestFormContainer = styled.div`

`;

export const GuestLabel = styled.label`

`;

export const GuestInput = styled.input`

`;

export const NameContainer = styled.div`
    // use if we need to separate name from email
`;

export const ReserveDateContainer = styled.div`

`;

export const DatePickerContainer = styled.div`

`;

export const DateLabel = styled.label`

`;

export const DateInput = styled.input`

`;

export const ConflictContainer = styled.div`

`;

export const ConflictMessage = styled.p`

`;

export const CheckoutCartContainer = styled.div`

`;

export const CheckoutItemContainer = styled.div`

`;
export const CheckoutImageContainer = styled.div`
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
`;

export const CheckoutItemImage = styled.img`

`;

export const CheckoutInfoContainer = styled.div`

`;

export const CheckoutItemName = styled.p`

`;

export const CheckoutItemRate = styled.p`

`;

export const FinalTotalPerDay = styled.p`
    text-align: center;
    .total-amount {
        color: ${success}
    }
`;