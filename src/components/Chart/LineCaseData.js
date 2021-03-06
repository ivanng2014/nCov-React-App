import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("caseChart").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/figure"
      )
      .then(data => {
        const latest = data.data.data;

        let labels = [];
        let comfirmCase = [];
        let fulfillReportingCriteria = [];
        let investigation = [];

        latest.map(item => {
          labels.push(item.updateDate);
          comfirmCase.push(item.comfirmCase);
          fulfillReportingCriteria.push(item.fulfillReportingCriteria);
          investigation.push(item.investigation);

          return true;
        });

        var caseChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "確診數字",
                data: comfirmCase,
                backgroundColor: "rgba(255, 99, 132, 0.2)"
              },
              {
                label: "調查個案",
                data: investigation,
                backgroundColor: "rgba(99, 255, 255, 0.2)"
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: [
                "資料來源：資料一線通",
                `更新時間: ${latest.pop().updateDate}`
              ]
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  display: false
                }
              ]
            }
          }
        });
        return caseChart;
      });
  }, []);

  return (
    <div>
      <Paper elevation={3} style={{ marginTop: 10, padding: 30 }}>
        <Typography color="primary" align="center" variant="h6" component="h6">
          香港武漢肺炎患者數字
        </Typography>
        <canvas id="caseChart" height="250"></canvas>
      </Paper>
    </div>
  );
};
