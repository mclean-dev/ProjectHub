import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button, Box} from "@mui/material";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";

import { commentPost } from '../../actions/posts'

const CommentBox = styled(Box)(({ theme }) => ({
  display: 'flex', 
  justifyContent: 'space-between',
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  }
}))

const CommentSection = ({ post }) => {
  ;
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const commentsRef = useRef()

  const handleClick = async () => {
      const finalComment = `${user.result.name}: ${comment}`
      setComments([...comments, finalComment])
      setComment('')
      console.log(commentsRef)
      console.log(commentsRef.current)
      dispatch(commentPost(finalComment, post._id))
  }

  useEffect(() => {
    
    commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest'})
   
  }, [comments])
  

  return (
    <CommentBox>
      <div style={{ height: '200px', overflowY: 'auto'}} >
        <Typography gutterBottom variant="h6">
          Comments
        </Typography>
        {comments.map((comment, index) => (
          <Typography key={index} gutterBottom variant="subtitle1">
            <strong>{comment.split(':')[0]}</strong>
            {comment.split(':')[1]}
          </Typography>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result.name && (
        <div style={{margin: "0 0.5rem"}}>
        <Typography gutterBottom variant="subtitle1">
          Write a comment
        </Typography>
        <TextField
          fullWidth
          rows={4}
          variant="outlined"
          label="comment"
          multiline
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button 
          style={{ marginTop: '10px'}}
          fullWidth
          disabled={!comment}
          variant="contained"
          color="primary"
          onClick={handleClick}
        >Add comment.</Button>
      </div>
      )}
    </CommentBox>
  );
};

export default CommentSection;
