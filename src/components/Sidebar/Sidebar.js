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

        {["相關新聞", "感染案例", "檢疫大廈", "數字統計"].map((text, index) => {
          return (
            <ListItem button key={text} component="a" href={text}>
              <ListItemIcon>
                {index % 4 === 0 ? (
                  <CollectionsIcon color="primary" />
                ) : index % 4 === 1 ? (
                  <LocalHospitalIcon color="primary" />
                ) : index % 4 === 2 ? (
                  <ApartmentIcon color="primary" />
                ) : (
                  <TimelineIcon color="primary" />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
      <Divider />
      {["提供意見", "關於我"].map((text, index) => {
        return (
          <ListItem button key={text} component="a" href={text}>
            <ListItemIcon>
              {index % 3 === 0 ? (
                <InfoIcon color="primary" />
              ) : index % 3 === 1 ? (
                <MailIcon color="primary" />
              ) : (
                <CodeIcon color="primary" />
              )}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
      <ListItem
        button
        key="我想學寫Code"
        component="a"
        href="https://oneshop.academy/"
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
