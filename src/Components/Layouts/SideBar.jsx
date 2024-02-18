import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

export default function SideBar({ checkType }) {
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    right: false,
  });
  const goToSpecificRoute = (text) => {
    if (text === "Info") {
      navigate("/admin");
      return;
    }
    if (text === "Add Course") {
      navigate("/admin/addcourse");
      return;
    }
    if (text === "All Courses") {
      navigate("/admin/allcourse");
      return;
    }
    if (text === "All Students") {
      navigate("/admin/allstudents");
      return;
    }
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {checkType === "admin" && (
        <List>
          {["Info", "Add Course", "All Courses", "All Students", "Drafts"].map(
            (text, index) => (
              <ListItem
                key={text}
                button
                onClick={() => goToSpecificRoute(text)}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      )}
      {checkType === "student" && (
        <List>
          {["student", "etc"].map((text, index) => (
            <ListItem
              key={text}
              button
              onClick={() => goToSpecificRoute(text)}
              disablePadding
            >
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button variant="contained" onClick={toggleDrawer(anchor, true)}>
            {anchor}
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
