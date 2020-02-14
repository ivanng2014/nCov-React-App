import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import Link from "@material-ui/core/Link";

import axios from "axios";
import PieChart from "../Chart/CaseBagel";
import Mainlander from "../Widgets/Mainlander";

const useStyles = makeStyles(theme => ({
  root: {
    width: "96%"
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
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/latestnews"
      )
      .then(res => {
        let latestNews = res.data.data;

        setNews(latestNews);
      });
  }, []);

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle>口罩緊張，切密亂買</AlertTitle>
        市面上口罩供應仍然短缺，建議大家不要亂買。如果想知道多少個是安全範圍，可以參考：
        <Link href="https://wars-mask.surge.sh/">口罩需求計算器</Link>
      </Alert>
      <Alert severity="warning">
        <AlertTitle>Oneshop Academy 招收學生中</AlertTitle>
        如果你有興趣寫同 n-cov.info 同樣的 Web App，可以到 oneshop.academy
        報讀工程師速成班。
        <Link href="https://www.facebook.com/oneshop.cloud/">查詢連結</Link>
      </Alert>
      <Alert severity="info">
        <AlertTitle>需要更多數據</AlertTitle>
        大家有什麼想要加入的數據，可以留言給我們反映。
      </Alert>
      <Alert severity="success">
        <AlertTitle>開放 API </AlertTitle>
        資料庫的數據全部以 API 形式開放，亦歡迎大眾提供意見。
        <br />
        API 網址： api.n-cov.info。
        <Link href="https://documenter.getpostman.com/view/1833220/SWTK4u2J">
          說明書
        </Link>
        <br />
      </Alert>
      <Mainlander />
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
                <Typography variant="h6" component="h6">
                  {item.title}
                </Typography>
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
      <PieChart />
    </div>
  );
};
