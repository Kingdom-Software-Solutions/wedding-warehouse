import styled from 'styled-components';
import {
    // uncomment when needed
    // mainColor,
    // secondaryColor,
    // tertiaryColor,
    accentColor
} from './colors'

// component container
export const AddInvContainer = styled.div`
    // display: flex;
    // flex-direction: column;
`;
// title
export const FormTitle = styled.h3`
    font-size: 3rem;
    text-align: center;
    // border-bottom: 2px solid ${accentColor}
`;
// form style
export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 5%;
`;

// info container
export const InfoContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5%;
`;
// upload container
export const UploadContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2.5%
`;
// price container
export const PriceContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 2.5%;
`;
// dept container
export const DeptContainer = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    margin: 2% 0
`;
// button container
export const SubmitContainer = styled.div`
    width: 25%;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
`;