import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";
import _mockChartData from "./EmotionSensing/_mockChartData.json";
import FilterCommon from "../../../Components/FilterCommon";
import { branchesList } from "./mockbranchesdata";
import {
  loadBrachList,
  getCourseList,
  getDepartmentList
} from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";
import CustomDateRangePicker from "../../../Components/DateRange.jsx";

const PracticalThinking = () => {
  window.onbeforeunload = ()=>{
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }
  const barPlotData = [
    {
      "Not Solved": 24,
      Solved: 40,
      name: "Finance",
    },
    {
      "Not Solved": 30,
      Solved: 30,
      name: "Marketing",
    },
    {
      "Not Solved": 10,
      Solved: 20,
      name: "Operations",
    },
    {
      "Not Solved": 20,
      Solved: 10,
      name: "Hr",
    },
  ];
  const dispatch = useDispatch();
  const [barPlot, setBarPlot] = useState(barPlotData);
  const [branchesData, setBranchesData] = useState(branchesList);
  const [active, setActive] = React.useState("All Branches");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const {institutionStats, branchList, departmentList, courseList} = useSelector((state)=>state?.data)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    // dispatch(loadPracticalThinking());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch]);

  const legendFormatter = (value, entry) => {
    return (
      <div className={"flex items-center"}>
        <div
          className={"h-4 w-4 mr-2"}
          style={{ backgroundColor: entry.color }}
        />
        <div>{value}</div>
      </div>
    );
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (value) => {
    if (value == "All Branches") {
      setBarPlot(barPlotData);
    } else {
      // use api to filter the data using id
      const problemSolvingRate = ["Solved", "Not Solved"];
      const filteredBarplot = barPlot.map((data) => {
        for (const problem of problemSolvingRate) {
          const randomValue = Math.floor(Math.random() * 100) + 1;
          data[problem] = randomValue;
        }
        return data;
      });
      setBarPlot(filteredBarplot);
    }
    setActive(value);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="flex-grow p-5">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-white mb-3 p-5 rounded-xl">
              <div
                className="bg-white mb-10"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {/* <span className="text-2xl font-normal text-gray-900">
                  Practical Thinking
                </span> */}
                <div>
                <div className="flex justify-end mr-10 mb-3">
                  <div className="">
                    <PopUpFilter route="PracticalThinking" list="Branches" dependencyList={branchList}/>
                  </div>
                  <div className="">
                    <PopUpFilter route="PracticalThinking" list="Courses" dependencyList={courseList}/>
                  </div>
                  <div className="">
                    <PopUpFilter route="PracticalThinking" list="Departments" dependencyList={departmentList} startDate={startDate} endDate={endDate}/>
                  </div>
                  <div className="">
                      <CustomDateRangePicker startDate={startDate} endDate={endDate} setEndDate={setEndDate} setStartDate={setStartDate}/>
                    </div>
                </div>
                </div>
              </div>
              <div className="mt-5 pt-3">
                <ResponsiveContainer width="100%" height={480}>
                  <BarChart data={barPlot} width={"1000px"}>
                    <CartesianGrid vertical={false} strokeDasharray="0 0" />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      interval={0}
                      dy={10}
                      dx={0}
                    >
                      <Label value="Department" position="bottom" dy={20} />
                    </XAxis>
                    <YAxis axisLine={false} tickLine={false} dx={-5}>
                      <Label
                        value="Problem Solving %"
                        position="middle"
                        angle={-90}
                        dx={-25}
                      />
                    </YAxis>
                    <Tooltip />
                    <Legend
                      formatter={(value, entry) =>
                        legendFormatter(value, entry)
                      }
                      layout="horizontal"
                      iconSize={0}
                      wrapperStyle={{
                        width: "95%",
                        left: "50px",
                        marginBottom: "20px",
                        top: "-50px",
                      }}
                    />
                    <Bar
                      dataKey="Solved"
                      stackId={"a"}
                      fill="#3D3B8E"
                      barSize={60}
                    />
                    <Bar
                      dataKey="Not Solved"
                      stackId={"a"}
                      fill="#6883BA"
                      barSize={60}
                      radius={[15, 15, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                {/* <ResponsiveContainer width="100%" height={480}>
                                    <BarChart
                                        data={_mockChartData}
                                        margin={{
                                            top: 20,
                                            right: 50,
                                            left: 5,
                                            bottom: 5,
                                        }}
                                    >
                                        <CartesianGrid vertical={false} strokeDasharray="0 0" />
                                        <XAxis
                                            dataKey="name"
                                            axisLine={false}
                                            tickLine={false}
                                            interval={0}
                                            dy={10}
                                            dx={20}
                                        >
                                            <Label
                                                value="TIME"
                                                position="bottom"
                                                dy={20}
                                            />
                                        </XAxis>
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            dx={-5}
                                        >
                                            <Label
                                                value="EMOTIONS"
                                                position="middle"
                                                angle={-90}
                                                dx={-25}
                                            />
                                        </YAxis>
                                        <Tooltip />
                                        <Legend
                                            formatter={(value, entry) =>
                                                legendFormatter(value, entry)
                                            }
                                            layout="horizontal"
                                            iconSize={0}
                                            wrapperStyle={{
                                                width: "95%",
                                                left: '50px',
                                                marginBottom: '20px',
                                                top: '-50px'
                                            }}
                                        />
                                        <Bar
                                            dataKey="surprise"
                                            fill="#AFDFEF"
                                        />
                                        <Bar
                                            dataKey="disgust"
                                            fill="#E1885E"
                                        />
                                        <Bar
                                            dataKey="contempt"
                                            fill="#6B2F6B"
                                        />
                                        <Bar
                                            dataKey="happiness"
                                            fill="#9F9A8F"
                                        />
                                        <Bar
                                            dataKey="sadnesss"
                                            fill="#669548"
                                        />
                                        <Bar
                                            dataKey="anger"
                                            fill="#596EF2"
                                        />
                                        <Bar
                                            dataKey="fear"
                                            fill="#000000"
                                        />
                                    </BarChart>
                                </ResponsiveContainer> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticalThinking;
