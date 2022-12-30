import React from 'react';
import {Container} from '@mui/material'
import Main from './components/Main/Main.js';
import { BrowserRouter, Routes , Route} from 'react-router-dom';
import Auth from './components/Auth/Auth.js';
import {GoogleOAuthProvider} from '@react-oauth/google';


const App = () => {
    return (
        <GoogleOAuthProvider clientId="388156859806-ffooibshqli9ac9r67ufvhavvmpl1nnr.apps.googleusercontent.com">
            <BrowserRouter>
                <Container maxWidth="lg">
                    <Routes>
                        <Route path='/' exact element={<Auth/>} />
                        <Route path='/main' exact element={<Main/>} />
                    </Routes>
                </Container>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;