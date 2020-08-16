import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import { AuthBtn } from '../material-ui/AuthBtn'; 
import { TextField } from '@material-ui/core';

// IMPLEMENT OKTA IN REGISTRATION?
//https://developer.okta.com/docs/reference/api/users/#create-user-with-password // have dispatch post to okta then insert new user in db. 

const Register = (props) => {
    console.log(props)
    const history = useHistory()
    const [newUser, setNewUser] = useState({});

    const handleChanges = e =>{
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e =>{
        e.preventDefault();
        props.registerUser(newUser);
        setNewUser({
            username: "",
            password: ""
        });
        // push to inventory page
        history.push("/inventory")
    };
    
    return(
        <div>
            <h3>Register</h3>
            <form onSubmit={handleSubmit}>
                <TextField label="Username" name="username" onChange={handleChanges}/>
                <TextField label="Password" name="password" type="password" onChange={handleChanges}/>
                <AuthBtn type="submit">Register</AuthBtn>
                <AuthBtn onClick={()=>{
                    history.push("/login")
                }}>Returning Users</AuthBtn>
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isPosting: state.userReducer.isPosting,
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps, { registerUser })(Register);