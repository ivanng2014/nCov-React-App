import React from "react";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

import HomeIcon from "@material-ui/icons/Home";
import InfoIcon from "@material-ui/icons/Info";
import MailIcon from "@material-ui/icons/Mail";
import TimelineIcon from "@material-ui/icons/Timeline";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import CollectionsIcon from "@material-ui/icons/Collections";
import ApartmentIcon from "@material-ui/icons/Apartment";
import CodeIcon from "@material-ui/icons/Code";

import "./Sidebar.css";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default prop => {
  const classes = useStyles();
  return (
    <div
      className={classes.list}
      id="list"
      role="presentation"
      onClick={prop.onClick}
      onKeyDown={prop.onKeyDown}
    >
      <List>
        <ListItem button key="主頁" component="a" href="/">
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="主頁" />
        </ListItem>
        <ListItem button key="相關新聞" component="a" href="/news">
          <ListItemIcon>
            <CollectionsIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="相關新聞" />
        </ListItem>
        <ListItem button key="感染案例" component="a" href="/infected">
          <ListItemIcon>
            <LocalHospitalIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="感染案例" />
        </ListItem>
        <ListItem button key="高危地區" component="a" href="/building">
          <ListItemIcon>
            <ApartmentIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="高危地區" />
        </ListItem>
        <ListItem button key="數字統計" component="a" href="/stat">
          <ListItemIcon>
            <TimelineIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="數字統計" />
        </ListItem>
      </List>
      <Divider />
      <ListItem
        button
        key="提供意見"
        component="a"
        href="https://www.facebook.com/AnserBridge/"
      >
        <ListItemIcon>
          <MailIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="提供意見" />
      </ListItem>
      <ListItem button key="關於我" component="a" href="/aboutme">
        <ListItemIcon>
          <InfoIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="關於我" />
      </ListItem>

      <ListItem
        button
        key="我想學寫Code"
        component="a"
        href="https://oneshop.academy/courses/6ef2c7d1d434b898fc74412b636387ecc7d44c40"
        target="_blank"
      >
        <ListItemIcon>
          <CodeIcon color="primary" />
        </ListItemIcon>
        <ListItemText primary="我想學寫Code" />
      </ListItem>
    </div>
  );
};
