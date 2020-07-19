import React,{ useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions/userActions'
import { AuthBtn } from '../material-ui/AuthBtn'
import TextField from '@material-ui/core/TextField';

const Login = props => {
    const history = useHistory()
    const [user, setUser] = useState({
        username: '',
        password: '',
        showPassword: false,
    });
    const handleChanges = e =>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleClickShowPassword = () => {
        setUser({ ...user, showPassword: !user.showPassword });
    };

    const handleSubmit = e =>{
        e.preventDefault();
        props.loginUser(user);
        setUser({})
        history.push("/inventory")
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <TextField label="Username" name="username" onChange={handleChanges} />
                <TextField 
                label="Password" name="password" type="password" onChange={handleChanges}/>
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