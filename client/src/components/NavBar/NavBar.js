/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import { AppBar, Box, Toolbar, Typography, Button, Avatar, Link } from '@mui/material'
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom'

import decode from 'jwt-decode'
import { useDispatch } from 'react-redux'

export default function NavBar() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const logout = () => {
        dispatch({ type: 'LOGOUT' })

        navigate('/')
        setUser(null)

    }

    useEffect(() => {
        const token = user?.token

        if(token) { 
            const decodedToken = decode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')))


    }, [location])

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ borderRadius: 1 }}>
            <Toolbar>
              <Link component={RouterLink} to="/"><Typography variant="h6" component="div" sx={{ flexGrow: 1, textDecoration: "none" }}>
            ProjectBase
          </Typography>
          </Link>

             </Toolbar>
          </AppBar>
        </Box>
     )
}

