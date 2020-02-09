import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    display: "flex",
    justifyContent: "center"
  },
  title: {
    margin: 30,
    display: "flex",
    justifyContent: "center"
  },
  Paper: {
    width: "100%",
    minHeight: 300,
    padding: 20
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <div classNmae={classes.root}>
      <div className={classes.title}>
        <Typography variant="h4" component="h4">
          關於《雁橋曰》
        </Typography>
      </div>
      <Paper elevation={3} className={classes.Paper}>
        <Typography variant="body1" component="body1">
          這個網站沒有《關於我們》，因為這是一位 Data Scientist
          在工餘的時間花一個周末去建成的。
          <br />
          <br />
          事源於我想要找政府所謂的 Open Data
          去研究「武漢肺炎」的資訊時，發現香港政府只提供 .CSV / PDF 資料。
          <br />
          <br />
          如果被外國的 Programmer 知道，這肯定是 2020
          年的國際級的笑話。抱著一個方便自己，方便別人的想法，我花了點時間利用
          AWS Lambda 去把一些基本的資料從 CSV 轉成 JSON Format ，亦公開
          api.n-cov.info 這個 API ，希望有心人可以把資料轉成 App
          或者更漂亮的圖表網站。
          <br />
          <br />
          至於 API 的 Doc… 我還未寫好，過兩天吧。(眼神死)
          <br />
          <br />
          如果有什麼想交流的話，請到{" "}
          <a href="https://www.facebook.com/AnserBridge/">這裡</a> PM 我。
        </Typography>
      </Paper>
    </div>
  );
};
