import axios from 'axios';


export const axiosWithAuth = () =>{
    // catch for development
    const token = localStorage.getItem("okta-token-storage")
    

    // checks for environment
    let url;
    if (process.env.REACT_APP_BASE_URL === "development") {
      url = "http://localhost:5000";
    } else {
      url = "https://wedding-warehouse.herokuapp.com/";
    }

    return axios.create({
        baseURL: url,
        headers:{
            Authorization: `Bearer ${token.accessToken.accessToken}`
        }
    })
}