import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";

import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

import {
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton
} from "react-share";

import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import FacebookIcon from "@material-ui/icons/Facebook";
import TelegramIcon from "@material-ui/icons/Telegram";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  Card: {
    maxWidth: 275,
    padding: 15
  },
  title: {
    margin: 30,
    display: "flex",
    justifyContent: "center"
  },
  linkShare: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "warp",
    margin: 3
  },
  cardtitle: {
    fontSize: 14
  },
  content: {
    padding: 5,
    marginBottom: 10,
    height: 100
  },
  green: {
    color: "green"
  },
  blue: {
    color: "#2196f3"
  },
  tele: {
    color: "#3f51b5"
  },
  serchBar: {
    margin: 15,
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "333333"
  }
}));

export default props => {
  const [news, setNews] = useState([]);

  const classes = useStyles();
  useEffect(() => {
    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/articles/50"
      )
      .then(res => {
        setNews(res.data.data);
      });
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          武漢肺炎相關新聞
        </Typography>
      </div>
      <form className={classes.serchBar} noValidate autoComplete="off">
        <TextField
          id="search-basic"
          label="新聞快速搜尋"
          onChange={event => {
            axios
              .get(
                "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/articles/search/" +
                  event.target.value
              )
              .then(res => {
                setNews(res.data.data.slice(0, 50));
              });
          }}
        />
      </form>
      <Grid
        className={classes.casesWrapper}
        container
        justify="center"
        alignItems="center"
        spacing={2}
        wrap="wrap"
      >
        {news.map((item, index) => {
          return (
            <Grid item key={index} style={{ minWidth: 300 }}>
              <Card className={classes.Card}>
                <CardContent>
                  <Typography
                    className={classes.cardtitle}
                    color="textSecondary"
                    gutterBottom
                  >
                    來源 :{item.source.replace(" RSS 總目錄", "")}
                  </Typography>
                  <Typography variant="h5" component="h2"></Typography>
                  <Typography className={classes.pos} color="primary">
                    更新時間 :{" "}
                    {new Date(item.published).toLocaleDateString("zh-HK", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      timeStyle: "long"
                    })}
                  </Typography>
                </CardContent>
                <CardActionArea className={classes.content}>
                  <Link href={item.url} target="_blank">
                    <Typography
                      className={classes.pos}
                      align="justify"
                      color="textPrimary"
                    >
                      {item.title}
                    </Typography>
                  </Link>
                </CardActionArea>
                <div className={classes.linkShare}>
                  <WhatsappShareButton className={classes.pop} url={item.url}>
                    <WhatsAppIcon
                      className={classes.green}
                      title={`${item.title +
                        item.source} - Shared by n-cov.info`}
                    />
                  </WhatsappShareButton>

                  <FacebookShareButton className={classes.pop} url={item.url}>
                    <FacebookIcon className={classes.blue} />
                  </FacebookShareButton>

                  <TelegramShareButton className={classes.pop} url={item.url}>
                    <TelegramIcon className={classes.tele} />
                  </TelegramShareButton>
                </div>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
