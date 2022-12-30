import React from 'react';
import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts.js';

const Post = ({post, setCurrentId, setManipulatePost}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    
    const Likes = () => {
        if (post.likes.length > 0) {
          return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    };

    return (
        <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '10px', height: '100%', position: 'relative'}}>
            <CardMedia sx={{height: 0, paddingTop: '56.25%', backgroundColor: 'rgba(0, 0, 0, 0.4)', backgroundBlendMode: 'darken'}} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
            <div style={{position: 'absolute', marginTop: '5%', marginLeft: '5%', color: 'white'}}>
                <Typography variant='h6'>{post.name}</Typography>
                <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <div style={{position: 'absolute', marginTop: '5%', right: '2%', color: 'white'}}>
                    <Button style={{color: 'white'}} size="small" onClick={() => {setCurrentId(post._id); setManipulatePost(true);}}>
                        <MoreHorizIcon />
                    </Button>
                </div>
            )}
            
            <Typography sx={{marginLeft: '5%', marginTop: '2%'}} gutterBottom variant="h5" component="h2">{post.title}</Typography>
            <div style={{display: 'flex', justifyContent: 'space-between', marginLeft: '5%'}}>
                <Typography variant='body2' color="textSecondary"> {post.tags.map((tag) => `#${tag} `)} </Typography>
            </div>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            <CardActions sx={{padding: '0 16px 8px 16px', display: 'flex', justifyContent: 'space-between',}}>
                <Button size='small' color='primary' onClick={() => {dispatch(likePost(post._id));}}>
                    <Likes/>
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button  size='small' onClick={() => {dispatch(deletePost(post._id))}}>
                        <DeleteIcon fontSize='small' />
                        Delete
                    </Button>
                )}
                
            </CardActions>
        </Card>
    );
}

export default Post;