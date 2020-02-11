import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("pieChart").getContext("2d");

    axios
      .get(
        "https://r3psfad7i6.execute-api.ap-southeast-1.amazonaws.com/Prod/case"
      )
      .then(data => {
        const latest = data.data.data;
        console.log(latest);

        let local = 0;
        let mainland = 0;

        latest.map(item => {
          if (item.hkResidents === "香港居民") {
            local += 1;
          } else {
            mainland += 1;
          }
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
      <canvas id="pieChart" height="250"></canvas>
    </div>
  );
};
