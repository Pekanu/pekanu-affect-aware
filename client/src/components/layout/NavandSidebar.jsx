import { useContext } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { useTheme } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

import Brand from "../utils/Brand";
import { DashboardDrawer, DashboardHeading } from "./DashboardFrame";
import { authContext } from "../../store/authContext";

export default function NavandSidebar({ open, setOpen }) {
  const { logout } = useContext(authContext);
  const { type } = useContext(authContext);

  const theme = useTheme();

  const navItems = [
    {
      text: "Home",
      icon: HomeRoundedIcon,
      type: "nav",
      nav: "/dashboard",
    },
    {
      text: "My Courses",
      icon: LibraryBooksRoundedIcon,
      type: "nav",
      nav: "/courses",
    },
    {
      text: "All Courses",
      icon: SchoolRoundedIcon,
      type: "nav",
      nav: "/all-courses",
    },
    {
      text: "Logout",
      icon: ExitToAppRoundedIcon,
      type: "action",
      action: logout,
    },
  ];

  const adminNavItems = [
    {
      text: "Home",
      icon: HomeRoundedIcon,
      type: "nav",
      nav: "/admin",
    },
    {
      text: "Logout",
      icon: ExitToAppRoundedIcon,
      type: "action",
      action: logout,
    },
  ];

  return (
    <>
      <CssBaseline />
      <DashboardHeading
        open={open}
        handleDrawerOpen={() => {
          setOpen(true);
        }}
      >
        <Brand
          imageClassName="h-10"
          textClassName="text-2xl text-gray-800 font-medium"
          className=""
        />
      </DashboardHeading>
      {type === "admin" ? (
        <DashboardDrawer
          theme={theme}
          open={open}
          handleDrawerClose={() => {
            setOpen(false);
          }}
          type={type}
          items={adminNavItems}
        />
      ) : (
        <DashboardDrawer
          theme={theme}
          open={open}
          handleDrawerClose={() => {
            setOpen(false);
          }}
          type={type}
          items={navItems}
        />
      )}
    </>
  );
}
