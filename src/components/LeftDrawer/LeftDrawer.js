import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

// import { ReactComponent as HarputLogo } from "../../assets/images/harputLogo.svg";
import { routes } from "../../routes";
import NavbarUserMenu from "../NavbarUserMenu"

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${0}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const LeftDrawer = (props) => {
  const { children } = props;
  const [open, setOpen] = useState(true);
  let navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{ display: 'flex'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            component="div"
            sx={{
              margin: "10px",
              marginLeft: 0,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <HarputLogo height={30} width={"100%"} /> */}
          </Box>
          </Box>
          <NavbarUserMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        onBackdropClick={handleDrawerClose}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        open={open}
        // PaperProps={{
        //   sx: {
        //     backgroundColor: "blue",
        //     color: "red",
        //   }
        // }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {routes.filter(x => x.shonOnSidebar === true).map((route, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`${route.path}`);
                  }}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={`${route.name}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {<MailIcon />}
              </ListItemIcon>
              <ListItemText primary={'Asd'} />
            </ListItemButton>
          </ListItem>
          </List>
        </Box>
      </Drawer>
      <Main open={open}>
        <Toolbar />
        {children}
      </Main>
    </Box>
  );
};

export default LeftDrawer;