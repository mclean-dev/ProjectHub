import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
  ;
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem('profile'))
  const dispatch = useDispatch()
  const commentsRef = useRef()

  const handleClick = async () => {
      const finalComment = `${user.result.name}: ${comment}`
      const newComments = await dispatch(commentPost(finalComment, post._id))
      setComments(newComments)
      setComment('')

      commentsRef.current.scrollIntoView({ behavior: 'smooth'})
  }
  return (
    <div >
      <div >
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
        <div style={{ width: "70%" }}>
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
    </div>
  );
};

export default CommentSection;
