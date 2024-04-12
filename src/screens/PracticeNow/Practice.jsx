import { Autocomplete, Divider, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
// import Stepper from "react-stepper-horizontal";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import { Step, StepLabel, Stepper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CheckboxesTags from "../../Components/MatSelect";
import {
  loadCompaniesList,
  loadHardSkillsList,
  loadInterviewRolesList,
  loadQuestions,
  loadSoftSkillsList,
  prepare_interview,
} from "../../redux/action";
import "./Practice.css"; // Make sure to import your stylesheet

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Audio_Video from "../../Components/Audio_Video";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import MutiSelect from "../../Components/Multiselect";
import { useDarkMode } from "./../../Dark";

const QontoConnector = styled(StepConnector)(({ theme , linearGradientBackground}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 17,
    left: "calc(-50% + 1.5rem)",
    right: "calc(50% + 1.5rem)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: linearGradientBackground,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: linearGradientBackground,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const StepperComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [steps] = useState([
    { title: "Skill Specific" },
    // { title: "Role Specific" },
    { title: "Level" },
    { title: "Summary" },
  ]);
  const [currentStep, setCurrentStep] = useState(0);
  const [hardSkills, setHardSkills] = useState(false);
  const [softSkills, setSoftSkills] = useState(false);
  const [chosenRole, setChosenRole] = useState(false);
  const [chosenCompany, setChosenCompany] = useState(false);
  const [level, setLevel] = useState(0);
  const [experienceLevel, setExperienceLevel] = useState("low");
  const [selectedCategory, setSelectedCategory] = useState("skills");

  const [selectedSoftskill, setSelectedSoftskill] = useState(null);
  let [selectedHardskill, setSelectedHardskill] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const payload = {
    level: "",
    specifications: {
      role: "",
      company: "",
      hard_skill: "",
      soft_skill: ""
    }
  }

  useEffect(() => {
    setSelectedRole(null);
    console.log("selectedCompany", selectedCompany);
  }, [selectedCompany]);

  const [audioValidated, setAudioValidated] = useState(false);
  const [videoValidated, setVideoValidated] = useState(false);

  const handleSelection = () => {
    if (selectedCategory == "skills") {
      if (selectedSoftskill != null || selectedHardskill != null) {
        return false;
      } else {
        return true;
      }
    }
    if (selectedCategory == "role") {
      if (selectedRole != null && selectedCompany != null) {
        return false;
      } else {
        return true;
      }
    }
  };

  const {
    hardSkillsList,
    softSkillsList,
    interviewRolesList,
    companiesList,
    questionsList,
    colorTheme,
  } = useSelector((state) => state?.data);

  const handleNext = () => {
    payload.level = experienceLevel ? experienceLevel : "";
    payload.specifications.role = selectedRole ? selectedRole?.label : "";
    payload.specifications.company = selectedCompany
      ? selectedCompany?.label
      : "";
    payload.specifications.hard_skill = selectedHardskill
      ? selectedHardskill.map((skill) => skill.label)
      : [];
    payload.specifications.soft_skill = selectedSoftskill
      ? selectedSoftskill.map((skill) => skill.label)
      : [];
    console.log("currentStep", payload);
    if (currentStep == 1) {
      dispatch(loadQuestions(payload));
    }
    if (currentStep == 2) {
      let toastId = toast("Wait .. redirecting to Interview Section", {
        autoClose: false,
      });
      toast.update(toastId, {
        render: "Wait .. redirecting to Interview Section",
        type: "success",
        autoClose: true,
      });
      if (questionsList?.questions?.length > 0) {
        setTimeout(() => {
          navigate("/interview");
        }, 3000);
      }
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const { isDarkMode } = useDarkMode();

  const linearGradientBackground = isDarkMode
    ? colorTheme.dark.selectBackground
    : colorTheme.light.selectBackground;
  //button
  const textColors = isDarkMode
    ? colorTheme.dark.textColor2
    : colorTheme.light.textColor2;   

    const blackColors = isDarkMode
    ? colorTheme.dark. blackColor4
    : colorTheme.light.blackColor;  

    const grayColors=isDarkMode 
    ? colorTheme.dark.   grayColor3
    : colorTheme.light.  grayColor;  

    const previousButton=isDarkMode
    ?colorTheme.dark.backgrounds 
    :colorTheme.light.backgrounds;

  useEffect(() => {
    console.log("selectedSoftskill", selectedSoftskill);
  }, [selectedSoftskill]);

  useEffect(() => {
    dispatch(loadHardSkillsList());
    dispatch(loadSoftSkillsList());
    dispatch(loadInterviewRolesList());
    dispatch(loadCompaniesList());
  }, [dispatch]);

  return (
    <div className="p-5 lg:p-10 ">
      <div className="w-full mx-auto rounded-xl">
        <p className="p-5 text-xl font-semibold">Practice</p>
        <Divider />
        {/* <Stepper 
                    steps={steps} 
                    activeStep={currentStep} 
                    activeColor={"#886CC0"} 
                    completeColor={"#886CC0"} 
                    completeBorderColor={"#886CC0"} 
                    completeTitleColor={"#886CC0"} 
                    size={40}
                /> */}
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          connector={<QontoConnector  linearGradientBackground={linearGradientBackground}/>}
          style={{ marginTop: "1rem" }}
        >
          {steps.map((label, index) => (
            <Step key={label?.title}>
              <StepLabel
                completed={index < currentStep}
                style={{
                  backgroundColor: index <= currentStep ? "white" : "",
                  color: index <= currentStep ? textColors : "inherit",
                }}
                StepIconProps={{
                  style: {
                    color: index <= currentStep ? linearGradientBackground : "",
                    fontSize: "2.5rem",
                  },
                }}
              >
                {label?.title}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Divider style={{ marginTop: "1rem" }} />
        <div className="flex mt-4 p-4 items-center justify-center relative overflow-auto flex-col md:flex-row max-w-full h-auto">
          {currentStep === 0 && (
            <>
              {/* <div > */}
              <div
                className={`bg-${
                  selectedCategory === "skills" ? "gray-100" : ""
                } p-7 rounded-xl relative overflow-auto max-w-full h-auto`}
                onClick={() => {
                  setSelectedCategory("skills");
                  setSelectedRole(null);
                  setSelectedCompany(null);
                }}
              >
                <div className="flex relative overflow-auto ">
                  {/* <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div> */}

                  <input
                    type="radio"
                    name="selectionCategory"
                    value="skills"
                    checked={selectedCategory === "skills"}
                    onChange={() => setSelectedCategory("skills")}
                    className="p-1 m-2 relative overflow-auto"
                    style={{
                      color: linearGradientBackground,
                      outlineColor: linearGradientBackground
                    }}
                  />
                  <h2
                    className="relative overflow-auto"
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color: `${
                        selectedCategory === "skills" ? "black" : textColors
                      }`
                    }}
                  >
                    Skill Specific
                  </h2>
                </div>
                <div
                  className={
                    selectedCategory !== "skills"
                      ? "opacity-50 pointer-events-none relative overflow-auto max-w-full h-auto" : ' relative overflow-auto max-w-full h-auto'
            
                  }
                >
                  <label className="flex items-center space-x-2 my-3 relative overflow-auto">
                    {/* <input
                                            type="checkbox"
                                            name="hardSkills"
                                            checked={hardSkills}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setHardSkills(!hardSkills)}
                                        /> */}
                    <span className="font-bold pr-2 relative overflow-auto">Hard Skills</span>
                  </label>
                  <MutiSelect
                    options={hardSkillsList?.map((o) => {
                      return {
                        label: o.name,
                        id: o.id,
                      };
                    })}
                    label="Hard Skills"
                    selectedItems={selectedHardskill}
                    onSelectionChange={setSelectedHardskill}
                  />
                  <div>
                    <label className="flex items-center space-x-2 my-3">
                      {/* <input
                                            type="checkbox"
                                            name="softSkills"
                                            checked={softSkills}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setSoftSkills(!softSkills)}
                                        /> */}
                      <span className="font-bold pr-2">Soft Skills</span>
                    </label>
                    <MutiSelect
                      options={(softSkillsList || []).map((o) => ({
                        label: o.name,
                        id: o.id,
                      }))}
                      // onSelectionChange={(e) => testselection(e)}
                      selectedItems={selectedSoftskill}
                      onSelectionChange={setSelectedSoftskill}
                      label="Soft Skills"
                    />
                  </div>
                </div>
              </div>
              <div className="p-7"></div>

              <div
                className={`bg-${
                  selectedCategory === "role" ? "gray-100" : ""
                } p-7 rounded-xl relative overflow-auto max-w-full h-auto`}
                onClick={() => {
                  setSelectedCategory("role");
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);
                }}
                // style={{ color: textColors }}
              >
                <div className="flex ">
                  {/* <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div> */}
                  <input
                    type="radio"
                    name="selectionCategory"
                    value="role"
                    checked={selectedCategory === "role"}
                    onChange={() => setSelectedCategory("role")}
                    className="p-1 m-2 "
                    style={{
                      color: linearGradientBackground,
                      outlineColor: linearGradientBackground
                    }}
                  />

                  <h2
                    style={{
                      fontSize: "1.5rem",

                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color: `${
                        selectedCategory === "role" ? "black" : textColors
                      }`
                    }}
                  >
                    Role Specific
                  </h2>
                </div>

                <div
                  className={
                    selectedCategory !== "role"
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                >
                  <label className="flex items-center space-x-2 my-3">
                    {/* <input
                                            type="checkbox"
                                            name="chosenCompany"
                                            checked={chosenCompany}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setChosenCompany(!chosenCompany)}
                                        /> */}

                    <span className="font-bold pr-2"
                    >
                      Choose Company{" "}
                      <span className="font-bold text-red-500 text-2xl">
                        {" "}
                        {selectedCategory == "role" ? "*" : ""}
                      </span>
                    </span>
                  </label>
                  <CheckboxesTags
                    options={companiesList?.map((o) => {
                      return {
                        label: o.name,
                        id: o.id,
                        role_ids: o.role_ids,
                      };
                    })}
                    selectedItems={selectedCompany}
                    onSelectionChange={setSelectedCompany}
                    label="Companies"
                  />
                </div>

                {selectedCompany != null && (
                  <div
                    className={
                      selectedCategory !== "role"
                        ? "opacity-50 pointer-events-none"
                        : ""
                    }
                  >
                    <label className="flex items-center space-x-2 my-3">
                      {/* <input
                                            type="checkbox"
                                            name="chosenRole"
                                            checked={chosenRole}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setChosenRole(!chosenRole)}
                                        /> */}

                      <span className="font-bold pr-2 ">
                        Choose Role{" "}
                        <span className="font-bold text-red-500 text-2xl">
                          {selectedCategory == "role" ? "*" : ""}
                        </span>
                      </span>
                    </label>
                    <CheckboxesTags
                      options={selectedCompany?.role_ids?.map((o) => {
                        return {
                          label: o.name,
                          id: o.id,
                        };
                      })}
                      selectedItems={selectedRole}
                      onSelectionChange={setSelectedRole}
                      label="Interview Roles"
                    />
                  </div>
                )}
              </div>
              <div className="p-7"></div>

              <div
                className={`bg-${
                  selectedCategory === "cultural" ? "gray-100" : ""
                } p-7 pt-[40px] pb-[40px] rounded-xl relative overflow-auto max-w-full h-auto`}
                onClick={() => {
                  setSelectedCategory("cultural");
                  setSelectedSoftskill(null);
                  setSelectedHardskill(null);
                  setSelectedCompany(null);
                }}
                style={{ color: textColors }}
              >
                <div className="flex ">
                  {/* <div className="text-sm font-semibold text-gray-500 mb-4">Choose your mock interview</div> */}
                  <input
                    type="radio"
                    name="selectionCategory"
                    value="role"
                    checked={selectedCategory === "cultural"}
                    onChange={() => setSelectedCategory("cultural")}
                    className="p-1 m-2 "
                    style={{
                      color: linearGradientBackground,
                      outlineColor: linearGradientBackground
                    }}
                  />

                  <h2
                    style={{
                      fontSize: "1.5rem",

                      fontWeight: "600",
                      marginBottom: "0.5rem",
                      color: `${
                        selectedCategory === "cultural" ? "black" : textColors
                      }`, // Set the desired text color
                    }}
                  >
                    Cultural Fit Test
                  </h2>
                </div>

                <div
                  className={
                    selectedCategory !== "role"
                      ? "opacity-50 pointer-events-none"
                      : ""
                  }
                >
                  {/* <label className="flex items-center space-x-2 my-3">
                    <input
                                            type="checkbox"
                                            name="chosenCompany"
                                            checked={chosenCompany}
                                            className="h-5 w-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                                            onChange={() => setChosenCompany(!chosenCompany)}
                                        /> 

                    <span className="font-bold pr-2"  style={{color:grayColors}}
                    >
                      Choose Company{" "}
                      <span className="font-bold text-red-500 text-2xl">
                        {" "}
                        {selectedCategory == "role" ? "*" : ""}
                      </span>
                    </span>
                  </label>
                  <CheckboxesTags
                    options={companiesList?.map((o) => {
                      return {
                        label: o.name,
                        id: o.id,
                        role_ids: o.role_ids,
                      };
                    })}
                    selectedItems={selectedCompany}
                    onSelectionChange={setSelectedCompany}
                    label="Companies"
                  /> */}
                </div>
              </div>
              {/* </div> */}
            </>
          )}

          {currentStep === 1 && (
            <>
              <div  className="relative overflow-auto max-w-full h-auto "
              >
                <h2
                className="relative overflow-auto max-w-full h-auto"
                  style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "2px",
                    color: grayColors,
                  }}
                >
                  Level
                </h2>
                <div
                className="w-[14rem] lg:w-[35rem] md:w-[27rem] relative overflow-auto sm:w-[20rem] h-auto"
                  style={{
                    border: `3.5px solid ${textColors}`,
                    borderRadius: "20px",
                    padding: "2rem 2.5rem"
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full mb-4 appearance-none h-2 rounded-lg"
                    style={{ background: `linear-gradient(to right, #0fe1d2 ${level}%, #dedcdc ${level}%)` }}
                  />

                  <div className="flex flex-col sm:flex-row justify-evenly text-md relative overflow-auto max-w-full h-auto">
                    <button
                      onClick={() => {
                        setLevel(0);
                        setExperienceLevel("low");
                      }}
                      className="bg-green-500 hover:bg-green-700 text-white text-white mb-2 sm:mb-0 sm:w-[30%] lg:w-[7rem] rounded-md relative overflow-auto max-w-full h-auto"
                    >
                      Beginner
                    </button>
                    <button
                      onClick={() => {
                        setLevel(50);
                        setExperienceLevel("mid");
                      }}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-3 mb-2 sm:mb-0 sm:w-[30%] lg:w-[7rem] rounded-md relative overflow-auto max-w-full h-auto"
                    >
                      Intermediate
                    </button>
                    <button
                      onClick={() => {
                        setLevel(100);
                        setExperienceLevel("high");
                      }}
                      className="bg-red-500 hover:bg-red-700 text-white text-white py-1 px-3 rounded-md relative overflow-auto max-w-full h-auto"
                    >
                      Advanced
                    </button>
                  </div>
                </div>
                {/* <div className="text-center font-semibold">Or</div>
                              <h2 className="text-center text-sm font-semibold mb-2 text-purple-600">Choose your Experience level</h2>
                              <div className="flex justify-between items-center"> */}
                {/* <div>
                                      <select
                                          className="border rounded p-1"
                                          value={experienceLevel}
                                          onChange={(e) => setExperienceLevel(e.target.value)}
                                      >
                                          <option value="Beginner">Beginner</option>
                                          <option value="Intermediate">Intermediate</option>
                                          <option value="Advanced">Advanced</option>
                                      </select>
                                  </div> */}

                {/* <Autocomplete
                                      size="small"
                                      fullWidth
                                      disablePortal
                                      value={experienceLevel}
                                      defaultValue={experienceLevel}
                                      id="combo-box-demo"
                                      options={[
                                          { label: "Beginner", value: "Beginner" },
                                          { label: "Intermediate", value: "Intermediate" },
                                          { label: "Advanced", value: "Advanced" },
                                      ]}
                                      renderInput={(params) => (
                                          <TextField
                                              {...params}
                                              // label={o?.label} 
                                              InputProps={{
                                                  ...params.InputProps,
                                                  style: {
                                                      borderRadius: "0.4rem",
                                                  },
                                              }}
                                          />
                                      )}
                                      onChange={(e, value) => { setExperienceLevel(value) }}
                                  />
                              </div> */}
              </div>
            </>
          )}
          {currentStep == 2 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center justify-center ">
              <div className="grid justify-center ">
                <div className="text-center font-semibold text-gray-500 mb-4">
                  <ComputerRoundedIcon sx={{ fontSize: "5rem" }} />
                </div>
                <h2
                  style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    marginBottom: "2px",
                    color: textColors,
                  }}
                >
                  Level
                </h2>
                <div className="text-sm max-w-xs text-center font-semibold text-gray-500 mb-4">
                  Please complete this quick walk through to confirm your
                  device/system is ready for a Validity test.
                </div>
                <label className="max-w-xs flex space-x-3 my-3">
                  <input
                    type="checkbox"
                    name="chosenCompany"
                    checked={chosenCompany}
                    className="mt-0.5 h-5 w-5 "
                    onChange={() => setChosenCompany(!chosenCompany)}
                    style={{
                      border: chosenCompany
                        ? `2px solid ${linearGradientBackground}`
                        : "2px solid grey",
                    outlineColor: chosenCompany ? linearGradientBackground : "none",
                      backgroundColor: chosenCompany
                        ? "#0fe1d2"
                        : "transparent",
                    }}
                  />

                  <span className="ml-3 text-sm">
                    I&apos;m completing this check on this device and Wi-Fi
                    network where I will participate
                  </span>
                </label>
              </div>

              <div className="bg-gray-200 rounded w-full">
                <Audio_Video
                  audioValidated={audioValidated}
                  setAudioValidated={setAudioValidated}
                  videoValidated={videoValidated}
                  setVideoValidated={setVideoValidated}
                  linearGradientBackground={linearGradientBackground}
                />
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 p-6 flex justify-end">
          {currentStep > 0 && (
            <button
              onClick={handlePrev}
              style={{
                margin: "0 0.5rem",
                backgroundColor: previousButton,

                color: grayColors,
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
            >
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button
              onClick={handleNext}
              disabled={handleSelection()} // Use the isRoleSelected state variable here
              className="bg-[#886cc0] mx-2 hover:bg-[#886cc0] text-white py-2 px-4 rounded-md"
              style={{
                backgroundColor: linearGradientBackground,
                color: grayColors,
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
              }}
            >
              Next
            </button>
          )}

          {/* {currentStep < steps.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="bg-blue-500 mx-2 hover:bg-[#886cc0] text-white py-2 px-4 rounded-md"
                        >
                            Next
                        </button>
                    )} */}
          {currentStep === steps.length - 1 && (
            <span>
              {chosenCompany && audioValidated && videoValidated ? (
                <button
                  onClick={handleNext}
                  className=" mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                  style={{ backgroundColor: linearGradientBackground,color:grayColors }}
                >
                  Submit
                </button>
              ) : (
                <Tooltip title="Please finish system checks before submitting">
                  <button
                    onClick={handleNext}
                    disabled={!chosenCompany}
                    className="bg-green-500 mx-2 hover:bg-green-700 text-white py-2 px-4 rounded-md opacity-50 cursor-not-allowed"
                    style={{ backgroundColor: linearGradientBackground,color:grayColors }}
                  >
                    Submit
                  </button>
                </Tooltip>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepperComponent;