import React, { useEffect } from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
  CardMedia,
  Box,
  Card,
  CardActionArea,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import placeholder from "../../images/placeholder.png";

const PostCard = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexWrap: "wrap",
    flexDirection: "column",
  },
}));

const ImageSection = styled("div")(({ theme }) => ({
  marginLeft: "20px",
  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
  },
}));

const RecPosts = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));

const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const test = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      const searchQuery = `(${post.title}|${post.message}|${post.tags.join(
        "|"
      )})`;
      dispatch(getPostsBySearch(searchQuery));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
          borderRadius: "15px",
          height: "39vh",
        }}
      >
        <CircularProgress size="7em" />
      </Paper>
    );
  }
  const recommendedPosts = Array.isArray(posts)
    ? posts.filter(({ _id }) => _id !== post._id).slice(0, 4)
    : posts;
  const openPost = (_id) => navigate(`/posts/${_id}`);
  return (
    <Paper style={{ padding: "20px", borderRadius: "10px" }} elevation={6}>
      <PostCard>
        <Box sx={{ borderRadius: "10px", margin: 1, flex: 1 }}>
          <Typography variant="h3" component="h2">
            {post.title}
          </Typography>
          <Typography
            gutterBottom
            variant="h6"
            color="textSecondary"
            component="h2"
          >
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">
            {post.message}
          </Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">
            {moment(post.createdAt).fromNow()}
          </Typography>
          <Divider sx={{ margin: "20px 0" }} />
          <CommentSection post={post} />
          <Divider sx={{ margin: "20px 0" }} />
        </Box>
        <ImageSection>
          <CardMedia
            component="img"
            image={post.selectedFile || placeholder}
            alt={post.title}
            sx={{
              borderRadius: "10px",
              objectFit: "cover",
              width: "100%",
              maxHeight: "600px",
            }}
          />
        </ImageSection>
      </PostCard>
      {recommendedPosts.length && (
        <Box sx={{ borderRadius: 1, margin: "10px", flex: 1 }}>
          <Typography gutterBottom variant="h5">
            You might also like:{" "}
          </Typography>
          <Divider />
          <RecPosts>
            {recommendedPosts.map(
              ({ title, message, name, likes, selectedFile, _id }) => (
                <Card
                  variant="outlined"
                  sx={{ margin: "20px", cursor: "pointer" }}
                >
                  <CardActionArea onClick={() => openPost(_id)} key={_id}>
                    <CardMedia
                      component="img"
                      image={selectedFile || placeholder}
                      sx={{ width: "250px" }}
                    />
                    <Typography
                      sx={{ padding: "0 1rem" }}
                      gutterBottom
                      variant="h6"
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{ padding: "0 1rem" }}
                      gutterBottom
                      variant="subtitle2"
                    >
                      {name}
                    </Typography>
                    <Typography
                      sx={{ padding: "0 1rem" }}
                      gutterBottom
                      variant="subtitle2"
                    >
                      {message}
                    </Typography>
                  </CardActionArea>
                </Card>
              )
            )}
          </RecPosts>
        </Box>
      )}
    </Paper>
  );
};

export default PostDetails;
