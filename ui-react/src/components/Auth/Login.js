import React,{ useState } from 'react';
import { AuthBtn } from '../material-ui/AuthBtn'

const Login = () => {
    const [user, setUser] = useState({});
    const handleChanges = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e =>{
        e.preventDefault();
        // use redux actions to post new user, another days problem
    }
    return(
        <div>
            <p>Login Form</p>
            <form>
                <label>Username</label>
                <input name="username"></input>
                <label>Password</label>
                <input name="password" type="password"></input>
                <AuthBtn>Login</AuthBtn>
                <AuthBtn>New User?</AuthBtn>
            </form>
        </div>
    )
};

export default Login;