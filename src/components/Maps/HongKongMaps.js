import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HongKong from "@svg-maps/hong-kong";
import { SVGMap } from "react-svg-map";
import "./HongKongMaps.css";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import axios from "axios";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    margin: "25px"
  }
}));

export default props => {
  let districts = {
    九龍城區: "Kowloon City",
    沙田: "Sha Tin",
    東區: "Eastern",
    南區: "Southern",
    葵青: "Kwai Tsing",
    中西區: "Central and Western",
    油尖旺區: "Yau Tsim Mong",
    灣仔: "Wan Chai",
    屯門: "Tuen Mun",
    黃大仙: "Wong Tai Sin",
    北區: "North",
    觀塘: "Kwun Tong",
    西貢: "Sai Kung",
    離島: "Island",
    深水埗: "Sham Shui Po",
    荃灣: "Tsuen Wan",
    元朗: "Yuen Long",
    大埔: "Tai Po"
  };
  let classes = useStyles();
  let [state, setState] = useState();
  let [location, setLocation] = useState();

  useEffect(() => {
    axios
      .get(
        "https://qs1v1ed9pd.execute-api.ap-southeast-1.amazonaws.com/default"
      )
      .then(res => {
        let buildings = res.data.data;
        console.log(buildings);
      });
  }, []);

  const handleLocationMouseOver = event => {
    const pointedLocation = getLocationName(event);
    setState({ pointedLocation });
  };

  const handleLocationMouseOut = () => {
    setState({ pointedLocation: null, tooltipStyle: { display: "none" } });
  };

  const getLocationClassName = (location, index) => {
    // Generate random heat map
    return `svg-map__location svg-map__location--heat${index % 4}`;
  };

  let getLocationName = event => {
    return event.target.attributes.name.value;
  };

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          地圖數據
        </Typography>
      </div>
      <SVGMap
        map={HongKong}
        locationClassName={getLocationClassName}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
      />
    </div>
  );
};
