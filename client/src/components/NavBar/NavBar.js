import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Link,
  Stack,
  useMediaQuery,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import CodeIcon from "@mui/icons-material/Code";

import { getPostsBySearch } from "../../actions/posts";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#616161",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    color: "#424242",
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const isMed = useMediaQuery("(max-width: 900px)");

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = useCallback(() => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);
  }, [dispatch, navigate]);

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location, user?.token, logout]);

  const handleKeyPress = (e) => {
    setSearch(e.target.value);
    if (e.key === "Enter") {
      searchPost();
    }
  };
  const searchPost = () => {
    if (search.trim()) {
      navigate(`/posts/search?searchQuery=${search || "none"}`);
      dispatch(getPostsBySearch(search));
    } else {
      navigate("/");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "white", borderRadius: 1, mb: 3 }}>
        <Toolbar sx={{ justifyContent: "space-between", padding: "0 0.5rem" }}>
          <Stack direction="row">
            <Link
              to="/"
              component={RouterLink}
              variant="h5"
              color="black"
              underline="none"
              sx={{
                mr: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isMobile ? <CodeIcon fontSize="large" /> : "ProjectHub"}
            </Link>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search???"
                inputProps={{ "aria-label": "search" }}
                onKeyUp={handleKeyPress}
              />
            </Search>
          </Stack>
          {user ? (
            isMed ? (
              <>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <Avatar alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                  </Avatar>
                </Button>
                <Menu
                  id="basic-menu"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>{user.result.name}</MenuItem>
                  <MenuItem onClick={logout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <Stack direction="row" spacing={2}>
                <Avatar alt={user.result.name} src={user.result.imageUrl}>
                  {user.result.name.charAt(0)}
                </Avatar>
                <Typography variant="h6" color="black" sx={{ lineHeight: "2" }}>
                  {user.result.name}
                </Typography>
                <Button variant="contained" color="primary" onClick={logout}>
                  <Typography>Logout</Typography>
                </Button>
              </Stack>
            )
          ) : (
            <Button
              component={RouterLink}
              to="/auth"
              variant="contained"
              color="primary"
              spacing={{ xs: 0, sm: 1, md: 1, lg: 1 }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
