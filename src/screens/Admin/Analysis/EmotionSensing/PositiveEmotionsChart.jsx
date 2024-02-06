import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import "./EmotionSensing.css";
import { SentimentDissatisfied } from '@mui/icons-material';

const PositiveEmotionsChart = (props) => {
  const {data, name} = props;

  const legendFormatter = (value, entry) => {
    return (
      <div className={"line-legend-item"}>
        <div
          className={"line-legend-color"}
          style={{ backgroundColor: entry.color }}
        />
        <div className="line-legend-text">{value}</div>
      </div>
    );
  };

  return (
    <div
      className="mt-5 pt-3 pb-3"
      style={{
        background: "#F5FBFF",
        borderRadius: "30px",
        paddingLeft: "10px",
      }}
    >
      <div
        className="fs-5 fw-bold text mb-4 pb-4"
        style={{ left: "30%", position: "relative", color: "#005B82" }}
      >
        {name}
      </div>
      {data.length > 0 ? (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 50,
            left: 5,
            bottom: 5,
          }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            strokeDasharray="0 0"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            className="text axis-data"
            interval={0}
            dy={10}
            dx={20}
          >
            <Label
              className="text"
              value="TIME"
              position="bottom"
              dy={20} // Adjust the distance from the X-axis
            />
          </XAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            className="text axis-data"
            dx={-5}
          >
            <Label
              className="text"
              value="EMOTIONS"
              position="middle"
              angle={-90} // Rotate the label for vertical orientation
              dx={-30} // Adjust the distance from the Y-axis
            />
          </YAxis>
          <Tooltip />
          <Legend
            formatter={(value, entry) => legendFormatter(value, entry)}
            layout="horizontal"
            iconSize={0}
            wrapperStyle={{
              width: "95%",
              marginBottom: "20px",
              top: "-50px",
            }}
          />
          <Line
            dataKey="Happiness"
            stroke="#9F9A8F"
            strokeWidth={3}
            type="monotone"
            dot={{
              stroke: "#9F9A8F",
              strokeWidth: 4,
              r: 2,
              strokeDasharray: "",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
      ) : (
        <div className='font-bold' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80%', borderRadius: '10px' }}>
            <SentimentDissatisfied style={{ fontSize: 50, color: '#888', animation: 'bounce 2s infinite' }} />
            <div style={{ marginTop: '20px', textAlign: 'center', lineHeight: '1.5em', color: '#555' }}>
              There's no data to show here yet.
            </div>
          </div>
      )}
    </div>
  );
};

export default PositiveEmotionsChart;
