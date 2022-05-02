import React, { useState } from "react";

import {
  Card,
  CardActions,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import { useNavigate } from "react-router-dom";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";

import placeholder from "../../../images/placeholder.png";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [likes, setLikes] = useState(post?.likes);

  const openPost = () => navigate(`/posts/${post._id}`);
  const userID = user?.result?.googleId || user?.result?._id;

  const hasLikedPost = post.likes.find((like) => like === userID);
  const handleLike = async () => {
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userID));
    } else {
      setLikes([...post.likes, userID]);
    }

    dispatch(likePost(post._id));
  };
  const Likes = ({ post, userID }) => {
    if (likes.length > 0) {
      return likes.find((like) => like === userID) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card
      raised
      elevation={6}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "10px",
        height: "100%",
        position: "relative",
      }}
    >
      <CardActionArea onClick={openPost}>
        <CardMedia
          height="0"
          image={post?.selectedFile || placeholder}
          title={post.title}
          alt={post.title}
          sx={{
            paddingTop: "56.25%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backgroundBlendMode: "darken",
          }}
        />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: "20px",
              left: "20px",
              color: "white",
            }}
          >
            <Typography variant="h6">{post.name}</Typography>
            <Typography variant="body2">
              {moment(post.createdAt).fromNow()}
            </Typography>
          </Box>

          <div>
            <Typography variant="body2" color="textSecondary">
              {post.tags.map((tag) => `#${tag} `)}
            </Typography>
          </div>
          <Typography variant="h5" gutterBottom>
            {post.title}
          </Typography>

          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={handleLike}
        >
          <Likes post={post} userID={userID} />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Stack direction="row" spacing={1}>
            <IconButton
              color="primary"
              aria-label="Edit post"
              onClick={() => setCurrentId(post._id)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="primary"
              aria-label="Delete Post"
              onClick={() => dispatch(deletePost(post._id))}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
