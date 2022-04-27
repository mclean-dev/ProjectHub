import React, { useState, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Button, Avatar } from '@mui/material'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


// import memoriesLogo from '../../images/memories-Logo.png'
// import memoriesText from '../../images/memories-Text.png'



const Navbar = () => {
    
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
        <AppBar  position="static" color="inherit">
            <Link to="/" className="brandContainer">
                {/* <img src={memoriesText} alt="icon" height="45px" />
                    <img  src={memoriesLogo} alt="icon" height="40px" /> */}
            </Link>
            <Toolbar >
                {user ? (
                    <div >
                        <Avatar  alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography  variant="h6">{user.result.name}</Typography>
                        <Button variant="contained"  color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar