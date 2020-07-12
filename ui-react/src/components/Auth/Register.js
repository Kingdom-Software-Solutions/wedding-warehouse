import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/userActions';
import { AuthBtn } from '../material-ui/AuthBtn'; 

const Register = props => {
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
                <label>Username</label>
                <input name="username" onChange={handleChanges}></input>
                <label>Password</label>
                <input name="password" type="password" onChange={handleChanges}></input>
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
        isPosting: state.isPosting,
        user: state.user
    }
}

export default connect(mapStateToProps, { registerUser })(Register);