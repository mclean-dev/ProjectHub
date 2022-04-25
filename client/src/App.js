import React from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { Container } from '@mui/material'

import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'

function App() {
  const user = JSON.parse(localStorage.getItem('profile'))

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Routes>
          <Route path='/' element={<Navigate replace to='/posts' />} />
          <Route path='/posts' element={<Home />} />
          <Route path='/posts/search' element={<Home />} />
          <Route path="/auth" element={() => (!user ? <Auth /> : <Navigate replace to="/posts" />)} />

        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
