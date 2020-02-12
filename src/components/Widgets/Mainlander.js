import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Container from "@material-ui/core/Container";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  tableTitle: {
    backgroundColor: "#DDDDDD"
  },
  warpper: {},
  root: {
    width: "100%",
    marginTop: 15,
    marginBottom: 15
  }
}));

export default props => {
  const classes = useStyles();

  const [mainlandArrival, setMainlandArrival] = useState(0);

  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/immigration"
      )
      .then(res => {
        let mainlander = 0;

        res.data.data.slice(0, 14).map(item => {
          mainlander += item.data.機場.mainlandArrival;
          mainlander += item.data.高鐵西九龍.totalArrival;
          mainlander += item.data.紅磡.totalArrival;
          mainlander += item.data.羅湖.totalArrival;
          mainlander += item.data.落馬洲支線.totalArrival;
          mainlander += item.data.港珠澳大橋.totalArrival;
          mainlander += item.data.落馬洲.totalArrival;
          mainlander += item.data.文錦渡.totalArrival;
          mainlander += item.data.深圳灣.totalArrival;
          mainlander += item.data.沙頭角.totalArrival;
          mainlander += item.data.中國客運碼頭.totalArrival;
          mainlander += item.data.港澳客輪碼頭.totalArrival;
          mainlander += item.data.屯門客運碼頭.totalArrival;
          return true;
        });

        setMainlandArrival(mainlander);
        return true;
      });
  }, []);

  return (
    <Container className={classes.root}>
      <Paper elevation={3} className={classes.warpper}>
        <Card>
          <CardContent>
            <Typography>
              <Typography
                color="primary"
                align="center"
                variant="h6"
                component="h6"
              >
                過去 14 日內地相關入境數字
              </Typography>
            </Typography>
          </CardContent>
          <CardContent>
            <Typography
              color="textPrimary"
              align="center"
              variant="body"
              component="body"
            >
              過去 14 日，從
              高鐵西九龍、紅磡、羅湖、落馬洲支線、港珠澳大橋、落馬洲、文錦渡、沙頭角、深圳灣、中國客運碼頭、港澳客輪碼頭及屯門客運碼頭的
              *全部旅客* 加機場入境的 *中國旅客*，總數為：
            </Typography>
            <Typography
              color="secondary"
              align="center"
              variant="h2"
              component="h2"
            >
              {mainlandArrival} 人次
            </Typography>
          </CardContent>
        </Card>
        <div></div>
      </Paper>
    </Container>
  );
};
