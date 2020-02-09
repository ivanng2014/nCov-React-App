import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";
import _ from "lodash";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActionArea from "@material-ui/core/CardActionArea";
import Chip from "@material-ui/core/Chip";

import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  title: {
    display: "flex",
    justifyContent: "center",
    margin: "25px"
  },
  card: {
    maxWidth: 500
  },
  casesWrapper: {
    marginTop: 40
  }
}));

export default props => {
  const [cases, setCases] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    axios.get("https://api.n-cov.info/case").then(res => {
      let data = _.orderBy(res.data.data, ["index"], ["desc"]);
      console.log(data);
      setCases(data);
    });
  }, []);

  return (
    <Container className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          香港案例
        </Typography>
      </div>
      <Grid
        className={classes.casesWrapper}
        container
        justify="center"
        alignItems="center"
        spacing={2}
        wrap="wrap"
      >
        {cases.map((item, index) => {
          return (
            <Grid item key={index} style={{ minWidth: 300 }}>
              <Card className={classes.card}>
                <CardHeader
                  title={
                    <Typography color="textPrimary">
                      #{item.index} {item.hkResidents}
                    </Typography>
                  }
                  action={<Chip label={item.status}></Chip>}
                />
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h5">
                      {item.age} 歲 {item.gender}
                    </Typography>
                    <Typography color="textSecondary">
                      確診日期 : {item.reportDate}
                    </Typography>
                    <Typography
                      display="inline"
                      color="primary"
                      variant="subtitle1"
                      gutterBottom
                    >
                      入住醫院 :
                    </Typography>
                    <Typography
                      color="textSecondary"
                      variant="subtitle1"
                      display="inline"
                    >
                      {item.hospital}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
