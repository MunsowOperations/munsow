import React, { useEffect, useState } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import _mockChartData from "./EmotionSensing/_mockChartData.json";
import FilterCommon from "../../../Components/FilterCommon";
import { useDispatch, useSelector } from "react-redux";
import { branchesList } from "./mockbranchesdata";
import PopUpFilter from "../../../Components/PopUpFilter";
import GLOBAL_CONSTANTS from "../../../../GlobalConstants.js";

import {
  loadKSAnalysis,
  loadBrachList,
  getCourseList,
  getDepartmentList
} from "../../../redux/action";

const KSAnalysis = () => {
  window.onbeforeunload = () => {
    localStorage.setItem("branch", "All Branches");
    localStorage.setItem("course", "All Courses");
    localStorage.setItem("department", "All Departments");
    localStorage.setItem("user", "All Users");

  }
  const hardSkills = [
    {
      id: "Programming Language (Python)",
      data: [
        { x: "Finance", y: 50 },
        { x: "Marketing", y: 48 },
        { x: "Operations", y: 31 },
        { x: "HR", y: 20 },
      ],
    },
    {
      id: "Data Analysis",
      data: [
        { x: "Finance", y: 64 },
        { x: "Marketing", y: 10 },
        { x: "Operations", y: 2 },
        { x: "HR", y: 11 },
      ],
    },
    {
      id: "Data Science ",
      data: [
        { x: "Finance", y: 56 },
        { x: "Marketing", y: 97 },
        { x: "Operations", y: 36 },
        { x: "HR", y: 30 },
      ],
    },
    {
      id: "DevOps (Docker)",
      data: [
        { x: "Finance", y: 71 },
        { x: "Marketing", y: 90 },
        { x: "Operations", y: 14 },
        { x: "HR", y: 13 },
      ],
    },
  ];

  const softSkills = [
    {
      id: "Communication",
      data: [
        { x: "Finance", y: 50 },
        { x: "Marketing", y: 48 },
        { x: "Operations", y: 31 },
        { x: "HR", y: 20 },
      ],
    },
    {
      id: "Adaptability",
      data: [
        { x: "Finance", y: 49 },
        { x: "Marketing", y: 84 },
        { x: "Operations", y: 73 },
        { x: "HR", y: 93 },
      ],
    },
    {
      id: "Creativity",
      data: [
        { x: "Finance", y: 56 },
        { x: "Marketing", y: 37 },
        { x: "Operations", y: 36 },
        { x: "HR", y: 30 },
      ],
    },
    {
      id: "Empathy",
      data: [
        { x: "Finance", y: 73 },
        { x: "Marketing", y: 90 },
        { x: "Operations", y: 12 },
        { x: "HR", y: 13 },
      ],
    },
  ];
  const [hardSkillData, setHardSkillsData] = useState([]);
  const [softSkillData, setSoftSkillsData] = useState([]);
  const [branchesData, setBranchesData] = useState(branchesList);
  const [active, setActive] = React.useState("All Branches");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const { departmentList, ksAnalysis, courseList, branchList,userListByDepartment } = useSelector((state) => state?.data);
  const open = Boolean(anchorEl);
  useEffect(() => {
    dispatch(getDepartmentList());
    dispatch(getCourseList());
    //dispatch get branches Api
    dispatch(loadKSAnalysis());
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
  }, [dispatch]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    setHardSkillsData(ksAnalysis?.graph_1?.data)
    setSoftSkillsData(ksAnalysis?.graph_2?.data)
    console.log("ksAnalysis", hardSkillData, softSkillData)
  }, [ksAnalysis])

  const handleMenuItemClick = (value) => {
    if (value == "All Branches") {
      dispatch(loadKSAnalysis());
      setHardSkillsData(hardSkills);
      setSoftSkillsData(softSkills);
    } else {
      // use api to filter the data using id
      const filteredHardSkillData = hardSkills.map((data) => {
        return {
          ...data,
          data: data.data.map((item) => {
            return {
              ...item,
              y: Math.floor(Math.random() * 100),
            };
          }),
        };
      });
      const filteredSoftSkillData = softSkills.map((data) => {
        return {
          ...data,
          data: data.data.map((item) => {
            return {
              ...item,
              y: Math.floor(Math.random() * 100),
            };
          }),
        };
      });

      setHardSkillsData(filteredHardSkillData);
      setSoftSkillsData(filteredSoftSkillData);
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
                <span className="text-2xl font-normal text-gray-900">
                  Knowledge and Skill Analysis
                </span>
                <div>
                  <div className="flex justify-end mr-10 mb-3">
                    <div className="">
                      <PopUpFilter route="KSAnalysis" list="Branches" dependencyList={branchList} />
                    </div>
                    <div className="">
                      <PopUpFilter route="KSAnalysis" list="Courses" dependencyList={courseList} />
                    </div>
                    <div className="">
                      <PopUpFilter route="KSAnalysis" list="Departments" dependencyList={departmentList} />
                    </div>
                    <div className="">
                      <PopUpFilter route="KSAnalysis" list="user" dependencyList={userListByDepartment} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5 pt-3" style={{ height: 500 }}>
                <span className="text-2xl font-normal text-gray-900">
                  Hard skills
                </span>
                {hardSkillData?.length > 0 && (
                  <ResponsiveHeatMap
                    data={hardSkillData}
                    margin={{ top: 70, right: 90, bottom: 60, left: 90 }}
                    valueFormat=">-.2s"
                    axisTop={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: -90,
                      legend: "",
                      legendOffset: 46,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Hard Skills",
                      legendPosition: "middle",
                      legendOffset: -80,
                    }}
                    colors={{
                      type: "sequential",
                      scheme: "purples",
                      minValue: 0,
                      maxValue: 100,
                    }}
                    emptyColor="#555555"
                    legends={[
                      {
                        anchor: "bottom",
                        translateX: 0,
                        translateY: 30,
                        length: 400,
                        thickness: 8,
                        direction: "row",
                        tickPosition: "after",
                        tickSize: 3,
                        tickSpacing: 4,
                        tickOverlap: false,
                        tickFormat: ">-.2s",
                        title: "Value →",
                        titleAlign: "start",
                        titleOffset: 4,
                      },
                    ]}
                  />
                )}
              </div>
              <div className="mt-5 pt-3" style={{ height: 500 }}>
                <span className="text-2xl font-normal text-gray-900">
                  Soft skills
                </span>
                {softSkillData?.length > 0 && (
                  <ResponsiveHeatMap
                    data={softSkillData}
                    margin={{ top: 90, right: 90, bottom: 60, left: 90 }}
                    valueFormat=">-.2s"
                    axisTop={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: -90,
                      legend: "",
                      legendOffset: 50,
                    }}
                    axisLeft={{
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      legend: "Soft Skills",
                      legendPosition: "middle",
                      legendOffset: -85,
                    }}
                    colors={{
                      type: "sequential",
                      scheme: "greens",
                      minValue: 0,
                      maxValue: 100,
                    }}
                    emptyColor="#555555"
                    legends={[
                      {
                        anchor: "bottom",
                        translateX: 0,
                        translateY: 30,
                        length: 400,
                        thickness: 8,
                        direction: "row",
                        tickPosition: "after",
                        tickSize: 3,
                        tickSpacing: 4,
                        tickOverlap: false,
                        tickFormat: ">-.2s",
                        title: "Value →",
                        titleAlign: "start",
                        titleOffset: 4,
                      },
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KSAnalysis;
