import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import _ from "lodash";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("HomeRadar").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;

        let count = _.countBy(latest, "hospital");
        let labels = Object.keys(count);
        let values = Object.values(count);

        var caseChart = new Chart(ctx, {
          type: "radar",
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                label: "患者入住醫院",
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(99, 255, 132, 0.2)",
                  "rgba(132, 99, 255, 0.2)"
                ]
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: [
                "資料來源：資料一線通",
                `更新時間: ${data.data.updateDate.split("T")[0]}`
              ]
            },
            legend: {
              display: true
            },
            scale: {
              ticks: {
                max: 25,
                min: 0,
                stepSize: 10
              }
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
          患者入住醫院(即時更新)
        </Typography>
        <canvas id="HomeRadar" height="250"></canvas>
      </Paper>
    </div>
  );
};
