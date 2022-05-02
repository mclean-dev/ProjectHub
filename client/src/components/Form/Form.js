import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper, Box } from '@mui/material'
import FileBase from 'react-file-base64'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
    ;
    const navigate = useNavigate();
    const post = useSelector((state) => currentId ? (state.posts.posts.find(p => p._id === currentId)) : null )
    const dispatch = useDispatch();
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: '' })
    const user = JSON.parse(localStorage.getItem('profile'))

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])
    const handleSubmit = (e) => {
        e.preventDefault()
        if(currentId) {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name}))
        } else {
        dispatch(createPost({...postData, name: user?.result?.name}, navigate))
        }
        clear();
    }
    const clear = () => {
        setCurrentId(null)
        setPostData({title: '', message: '', tags: '', selectedFile: '' })
    }

    if(!user?.result?.name) {
        return (
            <Paper sx={{padding: 1}} >
                <Typography variant="h6" align="center">
                    Please sign in to create your own projects and comment on other projects.
                </Typography>
            </Paper>
        )
    }
    return (
        <Paper elevation={6} sx={{padding: 2}}>
            {/* <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} > */}
            <form autoComplete="off" noValidate onSubmit={handleSubmit} sx={{display: 'flex', flexWrap: 'wrap', justifyContent: "center"}}>
                <Typography variant="h6">{currentId ? 'Editing' : 'Submit'} a Project</Typography>
                <TextField name="title" variant="outlined" label="Title" fullWidth margin="normal" value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4}  margin="dense" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                <TextField name="tags" variant="outlined" label="Tags" fullWidth margin="dense" value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                <Box sx={{ width: '97%', margin: '10px 0'}} ><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}></FileBase></Box>
                <Button sx={{marginBottom: '10px'}} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>

                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    )
}

export default Form;