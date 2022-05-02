import React, { useState, useEffect } from "react";
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
  TextField,
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

import { getPosts, getPostsBySearch } from "../../actions/posts";

import openingTag from "../../images/openingTag.png";
import closingTag from "../../images/closingTag.png";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
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
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
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
  const query = useQuery();
  const location = useLocation();
  const searchQuery = query.get("searchQuery");
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");
    setUser(null);
  };
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

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
      <AppBar position="static" sx={{ borderRadius: 1, mb: 3 }}>
        <Toolbar sx={{ justifyContent: "space-between", padding: "0 0.5rem" }}>
          <Stack direction="row">
            <Link
              to="/"
              component={RouterLink}
              variant="h5"
              color="inherit"
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
                placeholder="Search…"
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
                  color="secondary"
                  onClick={handleClick}
                >
                  <Avatar alt={user.result.name} src={user.result.imageUrl}>
                    {user.result.name.charAt(0)}
                  </Avatar>
                </Button>
                <Menu
                  id="basic-menu"
                  sx={{display: "flex", justifyContent: "center", alignItems: "center"}}

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
                <Typography variant="h6" sx={{ lineHeight: "2" }}>
                  {user.result.name}
                </Typography>
                <Button variant="contained" color="secondary" onClick={logout}>
                  Logout
                </Button>
              </Stack>
            )
          ) : (
            <Button
              component={RouterLink}
              to="/auth"
              variant="contained"
              color="secondary"
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
