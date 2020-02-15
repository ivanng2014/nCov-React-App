import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import axios from "axios";

const useStyles = makeStyles(theme => ({
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
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/articles/search/口罩銷售"
      )
      .then(res => {
        let latestNews = res.data.data[0];
        console.log(latestNews);

        setNews(latestNews);
      });
  }, []);

  return (
    <Card elevation={3} className={classes.card}>
      <CardContent className={classes.cardTitle}>
        <Link href={news.url} target="_blank">
          <Typography
            align="center"
            color="primary"
            variant="h5"
            component="h2"
          >
            口罩銷售或派發點(持續更新）
          </Typography>
        </Link>
        <Typography align="center" color="Secondary" variant="p" component="p">
          更新日期：
          {`${new Date(news.published).getMonth() + 1}月${new Date(
            news.published
          ).getDate()}日`}
        </Typography>
      </CardContent>
    </Card>
  );
};
