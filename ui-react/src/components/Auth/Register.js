import React, { useState } from 'react';
import { AuthBtn } from '../material-ui/AuthBtn'; 

const Register = () => {
    const [newUser, setNewUser] = useState({});

    const handleChanges = e =>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e =>{
        e.preventDefault();
        // use redux actions to post new user, another days problem
    }

    return(
        <div>
            <p>Register Form</p>
            <form>
                <label>Username</label>
                <input name="username"></input>
                <label>Password</label>
                <input name="password" type="password"></input>
                <AuthBtn>Register</AuthBtn>
            </form>
        </div>
    )
};

export default Register;