import { useOktaAuth } from '@okta/okta-react';
import { parseJwt } from './parseJwt'

export const getOktaUser = () => {
    const { authState, authService } = useOktaAuth()
    if (!authState.isAuthenticated) {
        // When user isn't authenticated, forget any user info
        return null
      } else {
        // parse the token to get the scoped information
        authService.getIdToken()
        .then((token) => {
            let user = parseJwt(token)
            return user
        });
      }
}