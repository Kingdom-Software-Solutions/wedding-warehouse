import { useOktaAuth } from '@okta/okta-react';

export const getOktaUser = () =>{
    const { authState, authService } = useOktaAuth();
    if (authState.isAuthenticated){
        authService.getUser()
        .then((user) => {
            console.log("okta user hook ran", user)
            return user
        });
    }
};