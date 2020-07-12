import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions'
import { AuthBtn } from '../material-ui/AuthBtn'

const Login = props => {
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
        props.loginUser(user);
        setUser({})
        history.push("/inventory")
    }
    return(
        <div>
            <h3>Login</h3>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input name="username" onChange={handleChanges}></input>
                <label>Password</label>
                <input name="password" type="password" onChange={handleChanges}></input>
                <AuthBtn type="submit">Login</AuthBtn>
                <AuthBtn onClick={() => {
                    history.push("/register")
                }}>New User?</AuthBtn>
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isPosting: state.userReducer.isPosting,
        user: state.userReducer.state
    }
}

export default connect(mapStateToProps, { loginUser })(Login);