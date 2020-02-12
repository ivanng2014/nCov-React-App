import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("mainlandArrival").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/immigration"
      )
      .then(data => {
        const latest = data.data.data.reverse();

        let label = [];
        let mainlandArrival = [];
        let hkDeparture = [];

        latest.map(item => {
          label.push(item.dateString.replace(" ", ""));
          mainlandArrival.push(item.data.總計.mainlandArrival);
          hkDeparture.push(
            item.data.深圳灣.hkDepartue + item.data.港珠澳大橋.hkDepartue
          );
          return true;
        });

        var caseChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: label,
            datasets: [
              {
                label: "大陸居民來港",
                data: mainlandArrival,
                backgroundColor: "rgba(99, 255, 132, 0.2)"
              },
              {
                label: "香港居民出境大陸",
                data: hkDeparture,
                backgroundColor: "rgba(255, 99, 135, 0.2)"
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: [
                "資料來源：香港入境處",
                `更新時間:${data.data.data.pop().dateString}`
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
          中港出入境數據（時序）
        </Typography>
        <canvas id="mainlandArrival" height="250"></canvas>
      </Paper>
    </div>
  );
};
