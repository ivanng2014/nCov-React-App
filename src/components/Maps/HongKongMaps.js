import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import HongKong from "@svg-maps/hong-kong";
import { SVGMap } from "react-svg-map";
import "./HongKongMaps.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

export default props => {
  let classes = useStyles();
  let [state, setState] = useState();

  const handleLocationMouseOver = event => {
    const pointedLocation = getLocationName(event);
    setState({ pointedLocation });
  };

  const handleLocationMouseOut = () => {
    setState({ pointedLocation: null, tooltipStyle: { display: "none" } });
  };

  const handleLocationMouseMove = event => {
    const tooltipStyle = {
      display: "block",
      top: event.clientY + 10,
      left: event.clientX - 100
    };
    setState({ tooltipStyle });
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
      <h1>Hello Map</h1>
      <SVGMap
        map={HongKong}
        locationClassName={getLocationClassName}
        onLocationMouseOver={handleLocationMouseOver}
        onLocationMouseOut={handleLocationMouseOut}
        onLocationMouseMove={handleLocationMouseMove}
      />
    </div>
  );
};
