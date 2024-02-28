import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import highchartsMore from "highcharts/highcharts-more";
import "./MeterChart.css";

highchartsMore(Highcharts);

const DomainChart = () => {
  useEffect(() => {
    const initializeChart = () => {
      Highcharts.chart("domainContainer", {
        // Use a unique id for the container
        chart: {
          type: "gauge",
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: "80%",
        },
        title: {
          text: "Domain",
        },
        pane: {
          startAngle: -90,
          endAngle: 90,
          background: null,
          center: ["50%", "75%"],
          size: "110%",
        },
        // the value axis
        yAxis: {
          min: 0,
          max: 10,
          tickPixelInterval: 72,
          tickPosition: "inside",
          tickColor:
            Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
          tickLength: 20,
          tickWidth: 2,
          minorTickInterval: null,
          labels: {
            distance: 20,
            style: {
              fontSize: "14px",
            },
          },
          lineWidth: 0,
          plotBands: [
            {
              from: 0,
              to: 6,
              color: "#2BE2D0",
              thickness: 50,
            },
            {
              from: 6,
              to: 10,
              color: "#CCCCCC",
              thickness: 50,
            },
          ],
        },
        series: [
          {
            name: "title",
            data: [5],
            tooltip: {
              valueSuffix: " /10",
            },
            dataLabels: {
              format: "{y} /10",
              borderWidth: 0,
              color:
                (Highcharts.defaultOptions.title &&
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color) ||
                "#333333",
              style: {
                fontSize: "16px",
              },
            },
            dial: {
              radius: "80%",
              backgroundColor: "gray",
              baseWidth: 12,
              baseLength: "0%",
              rearLength: "0%",
            },
            pivot: {
              backgroundColor: "gray",
              radius: 6,
            },
          },
        ],
      });
    };

    initializeChart();

    // Add some life
    setInterval(() => {
      const chart = Highcharts.charts.find(
        (chart) => chart.renderTo.id === "domainContainer"
      );
      if (chart && !chart.renderer.forExport) {
        const point = chart.series[0].points[0];
        const inc = Math.round((Math.random() - 0.5) * 2);

        let newVal = point.y + inc;
        if (newVal < 0 || newVal > 10) {
          newVal = point.y - inc;
        }

        point.update(newVal);
      }
    }, 3000);

    return () => clearInterval();
  }, []);

  return (
    <div className="meterchart">
      <figure className="highcharts-figure">
        <div id="domainContainer"></div>
      </figure>
    </div>
  );
};

export default DomainChart;
