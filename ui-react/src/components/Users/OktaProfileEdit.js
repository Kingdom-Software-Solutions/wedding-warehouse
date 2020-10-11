import React, { useState, useEffect } from 'react';
import { parseJwt } from '../../utils/parseJwt';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../redux/actions/oktaActions';
import { profileObject } from './oktaProfileObject';

const ProfileEdit = (props) => {
    const dispatch = useDispatch();
    console.log(props)
    const { toggle, showEdit } = props

    const profileState = useSelector(state => state.oktaReducer)
    const [changes, setChanges] = useState(profileObject)

    const handleChanges = e => {
        setChanges({
            ...changes,
            [e.target.name]: e.target.value
        })
    };
    const handleCancel = e => {
        toggle()
    }

    const handleSubmit = e =>{
        e.preventDefault();
        dispatch(updateUserProfile(changes))
        toggle()
    };

    return(
        <div>
            <h3>Edit Profile</h3>
            <button onClick={handleCancel}>Cancel</button>
            <form type="submit" onSubmit={handleSubmit}>
                {/* add avatar placeholder here */}
                <label>Update Avatar</label>
                <input name="avatar" type="file" />
                {/* dont let them crud email unless hitting the update login endpoint, may never be here */}
                {/* <label></label>
                <input name="email" /> */}
                <label>Edit First Name</label>
                <input name="given_name" />
                <label>Edit Last Name</label>
                <input name="family_name" />
                <label>Edit Phone Number</label>
                <input name="phone_number" />
                {/* can add address info later if needed */}
                <button type="submit">Save</button>
            </form>
        </div>
    )
}

export default ProfileEdit;