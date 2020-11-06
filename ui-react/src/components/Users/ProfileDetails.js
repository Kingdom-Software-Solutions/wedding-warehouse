import React, { useState, useEffect } from 'react';
import ProfileEdit from './OktaProfileEdit';
import CircularProgress from '@material-ui/core/CircularProgress';


const ProfileDetails = ({ userInfo }) => {
    const [showEdit, setShowEdit] = useState(false);

    const toggleEdit = () => {
    setShowEdit(!showEdit)
    };

    return(
        <>
            {!showEdit ?
                <div>
                <p>{userInfo.first_name} {userInfo.last_name}</p>
                <p>It's great to see you! See your upcoming or past reservations by clicking "Menu". Take a look at what we have for your event <a href="/inventory">here</a>!
                </p>
                {/* UNCOMMENT IF WORKING ON OKTA STRETCH */}
                {/* <button onClick={()=> toggleEdit()}>Edit Profile</button> */}
                </div>
            :
            // dont forget to pass down boolean state (showEdit)
                <ProfileEdit toggle={toggleEdit}  showEdit={showEdit} />
            }
        </>
    )
}

export default ProfileDetails;