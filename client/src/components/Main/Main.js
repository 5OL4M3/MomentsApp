import React, { useState, useEffect } from "react";
import Posts from '../Posts/Posts.js';
import Form from '../Form/Form.js';
import {Container, Grow, Grid, Dialog} from '@mui/material';
import {getPosts} from '../../actions/posts.js';
import { useDispatch } from 'react-redux';
import Navbar from '../NavBar/NavBar.js'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const [manipulatePost, setManipulatePost] = useState(false);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return (
        <Container>
            <Navbar/>
            <Grow in>
                <Container sx={{marginTop: '10%', marginBottom: '10%'}}>
                    <Grid container justify='space-between' alignItems='stretch' spacing={5}>
                        <Grid item xs={16} sm={16}>
                            <Posts setCurrentId={setCurrentId} setManipulatePost={setManipulatePost}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
            <Dialog open={manipulatePost} onClose={() => setManipulatePost(false)}>
                <Form setManipulatePost={setManipulatePost} currentId={currentId} setCurrentId={setCurrentId}/>
            </Dialog>
            <AddCircleOutlinedIcon sx={{position: 'fixed', bottom: '50px', right: '70px', fontSize: '70px', cursor: 'pointer', color: 'white'}} onClick={() => {setManipulatePost(true); setCurrentId(null)}}/>
            
        
        </Container>

    );
}

export default Home;

/*

<Container>
            <Navbar/>
            <Grow in>
                <Container sx={{marginTop: '10%'}}>
                    <Grid container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>

*/