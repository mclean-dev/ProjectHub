import React, {useEffect} from 'react'
import { Paper, Typography, CircularProgress, Divider } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom' 


import { getPost, getPostsBySearch } from '../../actions/posts'
import CommentSection from './CommentSection'


const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const test = useSelector((state) => console.log(state))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const { id } = useParams()

    useEffect(() => {
      dispatch(getPost(id))
    
     }, [id])

    useEffect(() => {
      if(post) {
        dispatch(getPostsBySearch('none'))
      }
         
    }, [post])
    

    if(!post) return null;
    
    if(isLoading) {
      return (<Paper elevation={6}  >
      <CircularProgress size="7em" />
      </Paper>)
    }
   const recommendedPosts = posts.filter(({ _id }) => _id !== post._id ) 

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6} >
    <div >
        <div >
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div >
          <img  src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
        {recommendedPosts.length && (
        <div >
        <Typography gutterBottom variant="h5" >You might also like: </Typography>
        <Divider />
        <div >
        {recommendedPosts.map(({ title, message, name, likes, selectedFile, _id}) => (
          <div >
            {title}
          </div> 
        ))}
        </div>
        </div>)}
    </div></Paper>
     

  )
}

export default PostDetails