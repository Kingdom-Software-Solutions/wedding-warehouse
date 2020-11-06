import axios from 'axios';


export const axiosWithOkta = () =>{
    const token = localStorage.getItem("okta-token-storage")
    // baseurl is https://{yourOktaDomain}.com/api/{apiversion}
    return axios.create({
        baseURL: "https://dev-964935.okta.com/api/v1",
        headers:{
            Authorization: `Bearer ${token.accessToken}`
        }
    })
}