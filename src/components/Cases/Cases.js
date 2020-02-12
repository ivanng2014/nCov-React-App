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
  },
  Type: {
    marginLeft: 25
  },
  status: {
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 30
  }
}));

export default props => {
  const [cases, setCases] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(res => {
        let data = _.orderBy(res.data.data, ["index"], ["desc"]);
        console.log(data);
        setCases(data);
      });
  }, []);

  return (
    <Container className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          香港武漢肺炎案例
        </Typography>
      </div>
      <div className={classes.title}>
        <Typography
          align="right"
          color="textSecondary"
          variant="body1"
          component="body1"
        >
          資料來源：
          <a href="https://data.gov.hk/tc-data/dataset/hk-dh-chpsebcddr-novel-infectious-agent?fbclid=IwAR0hU-W9jhr7eWWWy1k1tSFJ6vq5Grp-p7rrkjEcyFSJTBdgyHidvmJAtO4">
            資料一線通
          </a>
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
                />
                <Chip className={classes.Type} label={item.caseType}></Chip>
                <CardActionArea>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h5"
                      display="inline"
                    >
                      {item.age} 歲 {item.gender}
                    </Typography>
                    {item.status === "住院" ? (
                      <Chip
                        className={classes.status}
                        label={item.status}
                        color="primary"
                      />
                    ) : (
                      <Chip
                        className={classes.status}
                        label={item.status}
                        color="secondary"
                      />
                    )}

                    <Typography color="textSecondary">
                      確診日期 : {item.comfirmDate}
                    </Typography>
                    <Typography color="textSecondary">
                      確診日期 : {item.onSetDate}
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
                      color="Secondary"
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
