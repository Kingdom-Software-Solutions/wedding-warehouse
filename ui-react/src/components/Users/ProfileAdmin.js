import React, { useState, useEffect } from 'react';
import ProfileEdit from './OktaProfileEdit';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProfileContainer } from '../styled/profile/ProfileMainStyles';


const ProfileAdmin = ({ userInfo }) => {
    const [showEdit, setShowEdit] = useState(false);

    // edit admin actions?
    const toggleEdit = () => {
    setShowEdit(!showEdit)
    };

    return(
        <>
            {!showEdit ?
                <div>
                Placeholder
                </div>
            :
                <div>Placeholder</div>
            }
        </>
    )
}

export default ProfileAdmin;