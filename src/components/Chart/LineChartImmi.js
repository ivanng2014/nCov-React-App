import React, { useEffect } from "react";
import axios from "axios";
import Chart from "chart.js";

export default props => {
  useEffect(() => {
    var ctx = document.getElementById("myChart").getContext("2d");

    axios.get("https://api.n-cov.info/immigration").then(data => {
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
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)",
                "rgba(255, 99, 132, 0.2)"
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 99, 132, 1)"
              ],
              borderWidth: 1
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: "資料來源：香港入境處"
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
      <canvas id="myChart" height="250"></canvas>
    </div>
  );
};
