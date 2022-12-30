import React from 'react';
import Post from './Post/Post.js';
import {Grid, CircularProgress} from '@mui/material';
import {useSelector} from 'react-redux';

const Posts = ({setCurrentId, setManipulatePost}) => {
    const posts = useSelector((state) => state.posts)

    return (
        !posts.length ? <CircularProgress/> : (
            <Grid sx={{}} container alignItems='stretch' spacing={4}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post post={post} setCurrentId={setCurrentId} setManipulatePost={setManipulatePost}/>
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;