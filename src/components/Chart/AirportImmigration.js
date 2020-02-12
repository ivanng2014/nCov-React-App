import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("Airport").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/immigration"
      )
      .then(data => {
        const latest = data.data.data[0];
        var myChart = new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["總入境人次", "總出境人次"],
            datasets: [
              {
                data: [
                  latest.data.機場.mainlandArrival,
                  latest.data.機場.mainlandDepartue
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(99, 255, 132, 0.2)"
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(99, 255, 132, 1)"],
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
            scales: {}
          }
        });
        return myChart;
      });
  }, []);

  return (
    <div>
      <Paper elevation={3} style={{ marginTop: 10, padding: 30 }}>
        <Typography color="primary" align="center" variant="h6" component="h6">
          機場出入境數字(內地旅客)
        </Typography>
        <canvas id="Airport" height="250"></canvas>
      </Paper>
    </div>
  );
};
