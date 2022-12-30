import React, { useState, useEffect } from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {AppBar, Avatar, Button, Toolbar, Typography, Grid} from '@mui/material';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { Container } from '@mui/system';

const NavBar = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const logout = () => {
        dispatch({type: 'LOGOUT'});
        navigate('/');
        setUser(null);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);
            
            if(decodedToken * 1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    
    return (
        <AppBar sx={{ flexDirection: 'row', alignItems: 'center', width: "100%", height: '10%',}} color='inherit'>
            <div style={{display: 'flex', position: 'absolute', left: '30px', alignItems: 'center'}}>
                <Typography sx={{color: 'rgba(0,183,255, 1)', marginRight: '15px', fontWeight: 'bold',}} variant='h2' align='center'>Moments</Typography>
                <img src={memories} alt='memories' height='60'/>
            </div>
            <Toolbar sx={{display: 'flex', position: 'absolute', right: '30px'}}>
                {user ? (
                    (user.token) ? (
                        <Grid container sx={{display:'flex', alignItems: 'center'}}>
                            <Avatar alt={user?.result?.name} src={user?.result?.picture}>{(user?.result?.name.charAt(0))}</Avatar>
                            <Typography sx={{marginLeft: '10px'}} variant='h6'>{user?.result?.name}</Typography>
                            <Button sx={{marginLeft: '10px'}} variant='contained' color='secondary' onClick={logout}>Logout</Button>
                        </Grid>
                    ) : ( 
                        <Container sx={{display:'flex'}}>
                            <Avatar alt={user?.name} src={user?.picture}>{(user?.name.charAt(0))}</Avatar>
                            <Typography variant='h6'>{user?.name}</Typography>
                            <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                        </Container>
                    )
                ) : (
                    <div>
                        <Button component={Link} to='/' variant='contained' color='primary'>Sign In</Button>
                    </div>
                )}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;



