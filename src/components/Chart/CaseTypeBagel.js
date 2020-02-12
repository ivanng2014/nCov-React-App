import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("CaseTypepieChart").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;

        let count = _.countBy(latest, "caseType");
        let labels = Object.keys(count);
        let values = Object.values(count);

        var caseChart = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: labels,
            datasets: [
              {
                data: values,
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(99, 255, 132, 0.2)",
                  "rgba(132, 99, 255, 0.2)",
                  "rgba(255, 255, 99, 0.5)",
                  "rgba(255, 132, 255, 0.2)",
                  "rgba(99, 255, 255, 0.2)"
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
          感染類型統計
        </Typography>
        <canvas id="CaseTypepieChart" height="250"></canvas>
      </Paper>
    </div>
  );
};
