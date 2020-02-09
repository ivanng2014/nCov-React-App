import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Typography from "@material-ui/core/Typography";

import LinkIcon from "@material-ui/icons/Link";

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
    width: "100%",
    overflowX: "auto",
    display: "flex",
    justifyContent: "center"
  },
  table: {
    maxWidth: "80%"
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
    flexWrap: "warp"
  }
}));

export default props => {
  const [state, setState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [columns] = useState([
    {
      title: "來源",
      field: "source",
      render: rowData => {
        return rowData.source.replace(" RSS 總目錄", "");
      }
    },
    {
      title: "標題",
      field: "title"
    },
    {
      title: "更新時間",
      field: "published",
      render: rowData => {
        let date = new Date(rowData.published)
          .toString()
          .replace(" GMT+0800 (香港標準時間)", "");
        return <h4>{date}</h4>;
      }
    },
    {
      title: "文章連結／分享",
      field: "url",
      render: rowData => {
        let url = rowData.url;
        return (
          <div className={classes.linkShare}>
            <a href={url} rel="noopener noreferrer" target="_blank">
              <LinkIcon />
            </a>
            <WhatsappShareButton url={url}>
              <WhatsAppIcon />
            </WhatsappShareButton>

            <FacebookShareButton url={url}>
              <FacebookIcon />
            </FacebookShareButton>

            <TelegramShareButton url={url}>
              <TelegramIcon />
            </TelegramShareButton>
          </div>
        );
      }
    }
  ]);

  const classes = useStyles();
  useEffect(() => {
    axios.get("https://api.n-cov.info/articles/100").then(res => {
      console.log(res.data.data);
      setState(res.data.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div classNmae={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          武漢肺炎相關新聞
        </Typography>
      </div>
      <div classNmae={classes.table}>
        <MaterialTable
          title="文章"
          columns={columns}
          data={state}
          isLoading={isLoading}
          options={{
            pageSize: 10,
            actionsColumnIndex: -1,
            exportButton: true
          }}
        />
      </div>
    </div>
  );
};
