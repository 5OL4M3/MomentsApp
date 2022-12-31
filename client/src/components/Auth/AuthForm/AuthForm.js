import React, {useState} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container, Divider} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import LockOutlineIcon from '@mui/icons-material/LockOutlined';
import {Input} from './Input.js'
import {GoogleLogin} from '@react-oauth/google';
import {useDispatch} from 'react-redux';
import jwt_decode from 'jwt-decode';
import {signin, signup} from '../../../actions/auth.js';

const initialState = {firstName: '', lastName: '', email: '', password: '', passwordConfirmation: ''}

const Auth = () => {
    const working = false;
    const [showPassword, setShowPassword] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
            dispatch(signup(formData, navigate, setErrorMsg))
        }
        else {
            dispatch(signin(formData, navigate, setErrorMsg))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prev) => !prev);
        setShowPassword(false);
    }

    const onSuccess = async (res) => {
        const {name, picture, sub} = jwt_decode(res?.credential);
        
        try {
            dispatch({type: 'AUTH', data: {name, picture, sub}});

            navigate('/main');
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Container maxWidth="xs">
            <Paper sx={{marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '15px', borderRadius: '15px'}} elevation={3}>
                <Avatar>
                    <LockOutlineIcon />
                </Avatar>
                <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Log In'}</Typography>
                <form style={{width: '100%', marginTop: '10px'}} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignup && (
                            <>
                                <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name='email' label='Email Address' handleChange={handleChange} type='email' autoFocus error={errorMsg}/>
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} autoFocus error={errorMsg}/>
                        {isSignup && <Input name="passwordConfirmation" label="Confirm Password" handleChange={handleChange} type={showPassword ? "text" : "password"} error={errorMsg}/>}
                    </Grid>
                    {working && <GoogleLogin onSuccess={(response) => onSuccess(response)} onError={() => console.log('Error')}/>}
                    <Button sx={{marginTop: "15px"}}type="submit" fullWidth variant='contained' color='primary'>
                        {isSignup ? 'Sign Up' : 'Log In'}
                    </Button>

                    {isSignup ? (
                        <Grid sx={{alignItems: 'center', marginTop: '10px'}} container justify='flex-end'>
                            <Typography color='textSecondary'>Have an account already? </Typography>
                            <Button onClick={switchMode}>
                                Log in
                            </Button>
                        </Grid>
                        ) : (
                            <div>
                                <Divider sx={{marginTop: '20px', marginBottom: '20px'}}variant="middle" />
                                <Button onClick={switchMode} variant='contained' sx={{backgroundColor: '#42b72a', marginLeft: '23%'}}>
                                    {isSignup ? 'Log In': 'Create new account'}
                                </Button>
                            </div>
                        )
                    }
                    
                    
                </form> 
            </Paper>
        </Container>
    );
}

export default Auth;
