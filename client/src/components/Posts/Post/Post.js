import React, { useState } from 'react'

import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, useRadioGroup } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined'

const Post = ({ post, setCurrentId }) => {
    

    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'))
    const navigate = useNavigate()
    const [likes, setLikes] = useState(post?.likes)


    const openPost = () => navigate(`/posts/${post._id}`)
    const userID = user?.result?.googleId || user?.result?._id

    const hasLikedPost = post.likes.find((like) => like === (userID))
    const handleLike = async () => {

        if(hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== (userID)))
        } else {
            setLikes([...post.likes, userID])
        }
        
        dispatch(likePost(post._id))
    }
    const Likes = ({post, userID}) => {

        if (likes.length > 0) {
          return likes.find((like) => like === (userID))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return (<><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>);
      };
    
    return (
        <Card  raised elevation={6}>
            <div  onClick={openPost}>
            <CardMedia  image={post?.selectedFile } title={post.title} />
            <div >
                <Typography variant="h6">{post.name}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>

            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div >
                <Button style={{ color: "white" }} size="small" onClick={() => setCurrentId(post._id)}>
                    <MoreHorizIcon fontSize="medium" />
                </Button>
            </div>)}
            <div >
                <Typography variant="body2" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
            </div>
            <Typography variant="h5"  gutterBottom>{post.title}</Typography>

            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" >{post.message}</Typography>
            </CardContent>
            </div> 
            <CardActions >
                <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
                    <Likes post={post} userID={userID} />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete 
                </Button>)}
            </CardActions>
        </Card>
    )
}

export default Post;