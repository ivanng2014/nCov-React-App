import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import _ from "lodash";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("HomeConRadar").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/home"
      )
      .then(data => {
        const latest = data.data.data;

        let count = _.countBy(latest, "district");
        let labels = Object.keys(count);
        let values = Object.values(count);

        var caseChart = new Chart(ctx, {
          type: "radar",
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                label: "家居檢疫人士居住地區",
                backgroundColor: "rgba(255, 99, 132, 0.2)"
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: ["資料來源：資料一線通"]
            },
            legend: {
              display: true
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
          家居檢疫人士居住地區（即時更新）
        </Typography>
        <canvas id="HomeConRadar" height="250"></canvas>
      </Paper>
    </div>
  );
};
