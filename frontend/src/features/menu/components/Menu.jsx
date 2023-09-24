import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import LayersIcon from "@mui/icons-material/Layers";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Link } from "react-router-dom";

export function MainMenu(props) {
  return (
    <React.Fragment>
      <Link
        to="/cleanings"
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Cleanings" />
        </ListItemButton>
      </Link>
      <Link
        to="/children"
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Children" />
        </ListItemButton>
      </Link>
      <Link
        to="/salary"
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Salary" />
        </ListItemButton>
      </Link>
      <Link
        to="/fields"
        style={{ textDecoration: "inherit", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <LayersIcon />
          </ListItemIcon>
          <ListItemText primary="Fields" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}