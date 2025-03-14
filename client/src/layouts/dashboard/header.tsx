import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  Toolbar,
} from "@mui/material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Popover,
  Typography,
  alpha,
} from "@mui/material";
import { AppDispatch, RootState } from "../../store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logout } from "../../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { RouterLink } from "../../routes/components";

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { title: "Dashboard", path: "/" },
    { title: "Course", path: "/course" },
    { title: "Student", path: "/student" },
  ];
  return (
    <>
      <AppBar
        sx={{
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleDrawer}
            sx={{ display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <AccountPopover />
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={toggleDrawer}
        // sx={{ display: { lg: "none" } }}
        sx={{
          width: 240,
          flexShrink: 0,
          // display: { xs: "none", lg: "block" },
          display: { lg: "none" },
          "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
        }}
      >
        <List>
          {menuItems.map(({ title, path }, index) => (
            <ListItem key={index} component={RouterLink} href={path}>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {/* Desktop Sidebar (Faqat katta ekranlarda ko‘rinadi) */}
    </>
  );
}

function AccountPopover() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { user } = useTypedSelector((state) => state.auth.data);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const Handlelogout = () => {
    dispatch(logout());
    setOpen(null);
    navigate("/login");
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={undefined}
          alt={user?.username}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.username?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed", m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={Handlelogout}
          sx={{ typography: "body2", color: "error.main", py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
