import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { signOut } from "firebase/auth";

import { logout, selectAuth } from "../../slices/authSlice";
import { auth } from "../../helpers/firebase";

const NavbarUserMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(selectAuth);
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
      <Typography textAlign="center">{`${user?.displayName}`}</Typography>
      <Tooltip title="Kullanıcı">
        <IconButton
          onClick={handleOpenUserMenu}
          size="large"
          color="inherit"
          sx={{ p: 0, ml: 1 }}
        >
          <Avatar alt={user?.displayName} src={user?.photoURL}>
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Profil</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUserMenu();
            signOut(auth).then(() => {
              dispatch(logout());
              navigate("/login");
            })
          }}
        >
          <Typography textAlign="center">Çıkış</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};
export default NavbarUserMenu;
