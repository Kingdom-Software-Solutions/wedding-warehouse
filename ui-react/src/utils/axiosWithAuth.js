import axios from 'axios';

export const axiosWithAuth = () =>{
    const token = window.localStorage.getItem('token');

    let url;
    if (process.env.REACT_APP_BASE_URL === "development") {
      url = "http://localhost:5000";
    } else {
      url = "future host url here";
    }

    return axios.create({
        baseURL: url,
        headers:{
            Authorization: token
        }
    })
}