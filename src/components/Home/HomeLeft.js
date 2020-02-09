import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  cardBottom: {
    display: "flex",
    justifyContent: "flex-end"
  },
  card: {
    marginTop: 15
  },
  cardTitle: {
    backgroudColor: "#333333"
  }
}));

export default props => {
  const classes = useStyles();

  const [news, setNews] = useState([]);
  useEffect(() => {
    axios.get("https://api.n-cov.info/latestnews").then(res => {
      let latestNews = res.data.data;
      console.log(latestNews);
      setNews(latestNews);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>網頁尚未完成</AlertTitle>
        網頁仍然有大量未完整的地方，仍然在努力中。
      </Alert>
      <Alert severity="info">
        <AlertTitle>需要更多數據</AlertTitle>
        大家有什麼想要加入的數據，可以留言給我們反映。
      </Alert>
      <Alert severity="success">
        <AlertTitle>開放 API </AlertTitle>
        資料庫的數據全部以 API 形式開放，亦歡迎大眾提供意見。
        <br />
        API 網址： api.n-cov.info。 (P.S. 未寫 Doc :P)
      </Alert>
      <Card className={classes.card} elevation={3}>
        <CardContent className={classes.cardTitle}>
          <Typography color="primary" variant="h5" component="h2">
            最新消息
          </Typography>
        </CardContent>
        {news.map(item => {
          return (
            <div key={item._id}>
              <CardContent>
                <Typography variant="body1" component="body1">
                  {item.content}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardBottom}>
                <Button size="small">
                  <a href={item.url}>{item.source}</a>
                </Button>
              </CardActions>
            </div>
          );
        })}
      </Card>
    </div>
  );
};
