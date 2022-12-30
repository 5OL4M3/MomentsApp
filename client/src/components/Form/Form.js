import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@mui/material';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts.js';

const Form = ({currentId, setCurrentId, setManipulatePost}) => {
    const [postData, setPostData] = useState({
        title: '', message: '', tags: '', selectedFile: ''
    });
    const dispatch = useDispatch();
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));
    useEffect(() => {
        if (post) {
            setPostData(post);
        }
    }, [post]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        } else {
            dispatch(createPost({...postData, name: user?.result?.name}));
        }
        clear();
    }
    
    const clear = () => {
        setCurrentId(null);
        setPostData({title: '', message: '', tags: '', selectedFile: ''});
    }

    return (
        <Paper sx={{padding: 2}}>
            <form style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}} autoComplete='off' noValidate onSubmit={handleSubmit}>
                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField 
                    sx={{margin: 1}}
                    name='title' 
                    variant='outlined' 
                    label='Title' 
                    fullWidth value={postData.title} 
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />
                <TextField 
                    sx={{margin: 1}}
                    name='message' 
                    variant='outlined' 
                    label='Message' 
                    fullWidth 
                    value={postData.message} 
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                <TextField 
                    sx={{margin: 1}}
                    name='tags' 
                    variant='outlined' 
                    label='Tag' 
                    fullWidth 
                    value={postData.tags} 
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />
                <div style={{width: '97%', margin: '10px 0'}}>
                    <FileBase 
                        type="file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button sx={{marginBottom: 1}}variant='contained' color='primary' size='large' type='submit' onClick={() => {setManipulatePost(false);}} fullWidth>Submit</Button>
                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;