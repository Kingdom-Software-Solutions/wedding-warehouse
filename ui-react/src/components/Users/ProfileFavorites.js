import React, { useState, useEffect } from 'react';
import ProfileEdit from './OktaProfileEdit';
import CircularProgress from '@material-ui/core/CircularProgress';


const ProfileFavorites = ({ userInfo }) => {
    const [showEdit, setShowEdit] = useState(false); // can prob use for cancelations

    // I should be able to cancel from here
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

export default ProfileFavorites;