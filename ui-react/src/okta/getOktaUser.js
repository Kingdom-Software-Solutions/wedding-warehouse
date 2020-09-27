import { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';

export const useGetUser = () =>{
    const { authState, authService } = useOktaAuth();
    const [oktaUser, setOktaUser] = useState();
    useEffect(()=>{
        if (authState.isAuthenticated){
            authService.getUser()
            .then((user) => {
                console.log("get okta user hook ran", user)
                setOktaUser(user)
            });
        }
    })
    return oktaUser;
};