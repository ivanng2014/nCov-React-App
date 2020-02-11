import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("caseChart").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/figure"
      )
      .then(data => {
        const latest = data.data.data;
        console.log(latest);

        let labels = [];
        let comfirmCase = [];
        let fulfillReportingCriteria = [];
        let investigation = [];
        let ruleOut = [];

        latest.map(item => {
          labels.push(item.updateDate);
          comfirmCase.push(item.comfirmCase);
          fulfillReportingCriteria.push(item.fulfillReportingCriteria);
          investigation.push(item.investigation);
          ruleOut.push(item.ruleOut);
        });
        console.log(comfirmCase);

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
                backgroundColor: "rgba(99, 255, 132, 0.2)"
              },
              {
                label: "排除個案",
                data: ruleOut,
                backgroundColor: "rgba(99, 132,255, 0.2)"
              }
            ]
          },
          options: {
            title: {
              display: true,
              text: "資料來源：資料一線通"
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
      });
  }, []);

  return (
    <div>
      <canvas id="caseChart" height="250"></canvas>
    </div>
  );
};
