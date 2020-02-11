import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";

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

        latest.map(item => {
          label.push(item.dateString.replace(" ", ""));
          mainlandArrival.push(item.data.總計.mainlandArrival);
        });

        var caseChart = new Chart(ctx, {
          type: "line",
          data: {
            labels: label,
            datasets: [
              {
                label: "大陸居民入境數字",
                data: mainlandArrival,
                backgroundColor: "rgba(99, 255, 132, 0.2)"
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
              ]
            }
          }
        });
      });
  }, []);

  return (
    <div>
      <canvas id="mainlandArrival" height="250"></canvas>
    </div>
  );
};
