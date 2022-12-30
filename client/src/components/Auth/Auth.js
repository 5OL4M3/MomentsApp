import React from "react";
import {Container, Typography, Grid} from '@mui/material';
import AuthForm from './AuthForm/AuthForm.js';
import memories from '../../images/memories.png';

const Auth = () => {

    return (
        <Container sx={{display: 'flex', marginTop: '15%'}} component='main'>
            <Grid>
                <div style={{display: 'flex', left: '30px', alignItems: 'center', marginTop: '20%'}}>
                    <Typography variant="h2" sx={{color: 'white', fontWeight: 'bold', marginRight: '15px'}}>Moments</Typography>
                    <img src={memories} alt='memories' height='60'/>
                </div>
                <Typography variant="h5" sx={{color: 'white', outlineColor: 'black'}}>Post, Share, and Remember your best moments</Typography>
            </Grid>
            <AuthForm/>
        </Container>
        
    );
}

export default Auth;