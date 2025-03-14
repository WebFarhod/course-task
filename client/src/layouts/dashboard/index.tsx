import { ReactNode } from "react";
import Header from "./header";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Toolbar,
} from "@mui/material";
import Main from "./main";
import { RouterLink } from "../../routes/components";

interface IProps {
  children: ReactNode;
}

// const menuItems = ["Dashboard", "Profile", "Settings", "Logout"];
const menuItems = [
  { title: "Dashboard", path: "/" },
  { title: "Course", path: "/course" },
  { title: "Student", path: "/student" },
];

export default function DashboardLayout({ children }: IProps) {
  return (
    <>
      <Header />
      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box" },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map(({ title, path }, index) => (
                <ListItem key={index} component={RouterLink} href={path}>
                  <ListItemText primary={title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          <Main>{children}</Main>
        </Box>
      </Box>
    </>
  );
}
