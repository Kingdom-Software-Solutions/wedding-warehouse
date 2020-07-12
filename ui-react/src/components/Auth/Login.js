import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { AuthBtn } from '../material-ui/AuthBtn'

const Login = () => {
    const history = useHistory()
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
            <h3>Login</h3>
            <form>
                <label>Username</label>
                <input name="username"></input>
                <label>Password</label>
                <input name="password" type="password"></input>
                <AuthBtn type="submit">Login</AuthBtn>
                <AuthBtn onClick={() => {
                    history.push("/register")
                }}>New User?</AuthBtn>
            </form>
        </div>
    )
};

export default Login;