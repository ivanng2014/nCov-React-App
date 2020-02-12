import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("pieChart").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;

        let local = 0;
        let mainland = 0;

        latest.map(item => {
          if (item.hkResidents === "香港居民") {
            local += 1;
          } else {
            mainland += 1;
          }
          return true;
        });

        var caseChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: ["香港居民", "非香港居民"],
            datasets: [
              {
                data: [local, mainland],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(99, 255, 132, 0.2)"
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
            }
          }
        });
        return caseChart;
      });
    return true;
  }, []);

  return (
    <div>
      <Paper elevation={3} style={{ marginTop: 10, padding: 30 }}>
        <Typography color="primary" align="center" variant="h6" component="h6">
          患者居住地區統計
        </Typography>
        <canvas id="pieChart" height="250"></canvas>
      </Paper>
    </div>
  );
};
