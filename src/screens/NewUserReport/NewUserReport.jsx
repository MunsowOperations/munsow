import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./UserReport.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUserReport } from "../../redux/action";
import { useParams, useNavigate, useNavigation, useLocation } from 'react-router-dom';
import SkillSuggestions from "./SkillSuggestions";
import SkillsDisplay from "./SkillsDisplay";
import ReportOverview from "./ReportOverview";
import DeepDive from "./DeepDive";
import Intro from "./Intro";
import Extro from "./Extro";
import CuratedSummary from "./CuratedSummary";
import Presentation from "./Presentation";
import SummarySnapshot from "./SummarySnapshot";


const NewUserReport = () => {
  let userReport = {};
  const reportTemplateRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // const [reportData, setReportData] = useState({});
  // const { userReport } = useSelector(state => state?.data)
  // const [userReport, setUserReport] = useState(null); 

  const navigate = useNavigate();
    const storedReportData = localStorage.getItem('reportData');
    
    if (storedReportData) {
      userReport = JSON.parse(storedReportData);
      // setUserReport(parsedData); // Set parsedReportData state with retrieved data
    } else {
      console.log('No report data found in local storage');
    }
  // Fetch report data from local storage on component mount
  useEffect(() => {
    
  }, []);

  
  // useEffect(() => {
  //   setReportData(userReport); 
  // }, [userReport])

  console.log(userReport, 'userReport..') // use this data to show in reports

  
  //THIRD
  const handleGeneratePdf = async () => {
    try{
    setLoading(true);
    const pdfContainer = reportTemplateRef.current;
  
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true, // Enable compression
    });
  
    // Iterate through each component
    const components = pdfContainer.children;
    for (let i = 0; i < components.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
  
      const component = components[i];
      const canvas = await html2canvas(component, {
        scale: 2, // Adjust the scale as needed
        logging: false, // Disable logging for cleaner output
      });
      const imageData = canvas.toDataURL("image/png");
  
      pdf.addImage(
        imageData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.getWidth(),
        pdf.internal.pageSize.getHeight()
      );
  
      // Handle dynamic data for ReportOverview component
      if (component.classList.contains("report-overview-component")) {
        const reportOverviewData = getDynamicDataForReportOverview(i);
        renderDynamicDataForReportOverview(pdf, reportOverviewData);
      }
  
      // Handle dynamic data for DeepDive component
      if (component.classList.contains("deep-dive-component")) {
        const deepDiveData = getDynamicDataForDeepDive(i);
        renderDynamicDataForDeepDive(pdf, deepDiveData);
      }
    }
  
    pdf.save("UserReports.pdf");
    setLoading(false);
  }catch (error) {
    console.error("Error during PDF generation:", error);
    setLoading(false);
  }
  };
  
  //Example functions for handling dynamic data for ReportOverview component
  const getDynamicDataForReportOverview = (index) => {
    const category = userReport?.interview_score_by_category.data[index];
    return {
      head: category.main_title,
      overallScore: category.secured_marks,
      notes: category.notes,
      scores: category.sub_segements.map((segment, sIndex) => ({
        title: segment.title,
        score: segment.secured_marks,
        desc: segment.notes,
      })),
    };
  };
  
  const renderDynamicDataForReportOverview = (pdf, data) => {
    // Replace with your logic to render dynamic data for the ReportOverview component in the PDF
    // This might involve adding text, tables, or images based on the provided data
    pdf.text(data.head, 10, 10);
    // Render other data as needed
  };
  
  // Example functions for handling dynamic data for DeepDive component
    const getDynamicDataForDeepDive = (index) => {
    const category = userReport?.interview_score_by_category.data[index];


    const question = category.interview_questions[index];
    return {
      head: category.main_title,
      ques: question.question,
      candidateAns: question.answer,
      sampleAns: question.suggested_answer,
      gotRight: question.Insights.what_you_got_right,
      gotWrong: question.Insights.what_you_got_wrong,
      feedback: question.Insights["feedback_for_the candidate"],
    };
  };
  
  const renderDynamicDataForDeepDive = (pdf, data) => {
    // Replace with your logic to render dynamic data for the DeepDive component in the PDF
    // This might involve adding text, tables, or images based on the provided data
    pdf.text(data.head, 10, 10); // Example: Render head text at coordinates (10, 10)
    // Render other data as needed
  };
  

  return (
    <div className="body flex-grow-1 overflow-y-scroll">
      <div className="container mx-auto">
        {/* Back button */}
        <div className="inline-flex flex-col justify-items-center sm:flex sm:flex-row sm:justify-between">
          <button         
            className="bg-gradient-to-r m-3 sm:m-5 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md mb-2 sm:mb-4 transition-all duration-300"
            onClick={() => navigate(-1)}>
            ← View All Reports
          </button>

        </div>
        


        <div ref={reportTemplateRef} className="bg-white">

          
          <div>
            <Intro
              user={userReport?.user_name}
              report_data={userReport}
            />
          </div>

          <div>
            <SummarySnapshot
              interview_score_by_category={userReport?.interview_score_by_category}
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
              presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
              readiness_score={userReport?.readiness_score}
            />
          </div> 
    
          <div>
            <Presentation              
              behavioral_presentation_and_grooming={userReport?.behavioral_presentation_and_grooming}
              presentation_and_grooming_score={userReport?.presentation_and_grooming_score}
            />
          </div>
        
          
            {userReport?.interview_score_by_category.data.map((category, index) => (
              <ReportOverview
              key={index} 
              head={category.main_title}
              overallScore={category.secured_marks}
              notes={category.notes}
             
              scores={category.sub_segements.map((segment, sIndex) => ({
                title: segment.title,
                score: segment.secured_marks,
                desc: segment.notes,
              }))}
              />
            ))}
          


        
          {userReport?.interview_score_by_category.data.map((category, index) => (
          <div key={index}>
          {category.interview_questions.map((question, qIndex) => (
            <DeepDive
              key={qIndex}
              head={category.main_title}
              
              ques={question.question}
              candidateAns={question.answer}
              sampleAns={question.suggested_answer}
              gotRight={question.Insights.what_you_got_right}
              gotWrong={question.Insights.what_you_got_wrong}
              feedback={question.Insights["feedback_for_the candidate"]}
            />
          ))}
          </div>
          ))}
        

          
            {/* {userReport?.interview_score_by_category.data.map((category, index) => (
              <ReportOverview
                key={index}
                className="report-overview-component"  // Add a class name to identify the component
                {...getDynamicDataForReportOverview(index)}
              />
            ))} */}
          

{/*           
            {userReport?.interview_score_by_category.data.map((category, index) => (
              <>
                {category.interview_questions.map((question, qIndex) => (
                  <div key={index}> 
                  <DeepDive
                    className="deep-dive-component"
                    {...getDynamicDataForDeepDive(index)}
                  />
                  </div>
                ))}
              </>
            ))} */}
         

        <div>
          <CuratedSummary
            report_type={userReport?.report_type}
            skillSuggestions={userReport?.skill_based_suggestions}
            report_data={userReport}
          /> 
        </div>

        <div>
          <Extro/>
        </div>

      </div>

        <div className="mt-5">
          <div className="flex justify-center items-center mt-4 mb-5">
            <button
              type="button"
              className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded-full flex justify-center items-center"
              onClick={() => handleGeneratePdf()}
            >
              DOWNLOAD AS PDF{" "}
              {loading && (
                <CircularProgress style={{ color: "#fff", marginLeft: "10px" }} />
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NewUserReport;
