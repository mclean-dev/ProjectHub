import React, { useState, useEffect } from 'react' 
import { Container, Paper, Grow, Grid, AppBar, TextField, Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import { getPosts, getPostsBySearch } from '../../actions/posts'

import Pagination from '../Pagination/Pagination'

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
    
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery()
    const navigate = useNavigate()
    const page = query.get('page') || 1
  

  

  return (
    <Grow in>
      <Container maxWidth='xl' >
        <Grid  container  justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3} >
            <AppBar  position="static" color="inherit" >
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            <Paper  elevation={6}>
              <Pagination page={page} />
            </Paper>
          </Grid>
        </Grid>
        </Container>
      </Grow>
  )
}

export default Home