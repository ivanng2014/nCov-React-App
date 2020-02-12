import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/immigration"
      )
      .then(data => {
        const latest = data.data.data[0];
        var myChart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["機場", "深圳灣", "港珠澳大橋", "總計"],
            datasets: [
              {
                label: "大陸居民入境數字",
                data: [
                  latest.data.機場.mainlandArrival,
                  latest.data.深圳灣.mainlandArrival,
                  latest.data.港珠澳大橋.mainlandArrival,
                  latest.data.總計.mainlandArrival
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(99, 255, 132, 0.2)",
                  "rgba(255, 255, 132, 0.2)",
                  "rgba(99, 132, 255, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(99, 255, 132, 1)",
                  "rgba(255, 255, 132, 1)",
                  "rgba(99, 132, 132, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: [
                "資料來源：香港入境處",
                `更新時間:${data.data.data[0].dateString}`
              ]
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
        return myChart;
      });
  }, []);

  return (
    <div>
      <Paper elevation={3} style={{ marginTop: 10, padding: 30 }}>
        <Typography color="primary" align="center" variant="h6" component="h6">
          大陸人士入境資訊
        </Typography>
        <canvas id="myChart" height="250"></canvas>
      </Paper>
    </div>
  );
};
