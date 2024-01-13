import React, { useEffect, useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

import "./UserReport.css";
import CircularProgress from "@mui/material/CircularProgress";
import { Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loadUserReport } from "../../redux/action";
import { useNavigate } from 'react-router-dom';
import SkillSuggestions from "./SkillSuggestions";
import SkillsDisplay from "./SkillsDisplay";
import ReportOverview from "./ReportOverview";
import DeepDive from "./DeepDive";
import Intro from "./Intro";
import Extro from "./Extro";
import CompanyAndRoleSummary from "./CompanyAndRoleSummary";
import Presentation from "./Presentation";
import SummarySnapshot from "./SummarySnapshot";


const NewUserReport = () => {
  const reportTemplateRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState({});
  const { userReport } = useSelector(state => state?.data)

  const navigate = useNavigate();

  useEffect(() => {
    setReportData(userReport);
  }, [userReport])

  console.log(userReport, 'userreport') // use this data to show in reports

  
  // const handleGeneratePdf = async () => {
  //   setLoading(true);
  //   const pdfContainer = reportTemplateRef.current;
  //   const pdfWidth = 210; // A4 width in points (about 8.27 inches)
  //   const pdfHeight =
  //     (pdfContainer.clientHeight * pdfWidth) / pdfContainer.clientWidth; // Maintain aspect ratio

  //   // Create a canvas from your HTML content
  //   const canvas = await html2canvas(pdfContainer);

  //   // Convert the canvas to a data URL
  //   const imgData = canvas.toDataURL("image/png");

  //   // Create a jsPDF instance
  //   const doc = new jsPDF({
  //     format: [pdfWidth, pdfHeight],
  //     orientation: "portrait", // You can also use 'landscape' for landscape mode
  //   });

  //   // Insert the image into the PDF
  //   doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight, "", "FAST");
  //   doc.save("UserReports.pdf");
  //   setLoading(false);
  // };

  const handleGeneratePdf = async () => {
    setLoading(true);
    const pdfContainer = reportTemplateRef.current;
    const components = pdfContainer.children;
  
    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true, // Enable compression
    });
  
    for (let i = 0; i < components.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }
  
      const canvas = await html2canvas(components[i],{
        scale: 2, // Adjust the scale as needed
        logging: false, // Disable logging for cleaner output
      });
      const imageData = canvas.toDataURL("image/png");
  
      pdf.addImage(imageData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    }
  
    pdf.save("UserReports.pdf");
    setLoading(false);
  };


  return (
    <div className="body flex-grow-1 overflow-y-scroll">
      <div className="container mx-auto">
        {/* Back button */}
        <button
          className="bg-gradient-to-r m-5 from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 py-2 px-4 rounded-full shadow-md mb-4 transition-all duration-300"
          onClick={() => navigate(-1)}
        >
          ← View All Reports
        </button>
        <div ref={reportTemplateRef} className="bg-white">
          {/* <div>
            <UserReportTitle userData={reportData} />
          </div>
          <div>
            <UserReportPartOne userData={reportData?.behavioral_presentation_and_grooming} />
          </div> */}

          
          <div>
            <Intro
              position="HR Transformation Consultant"
              company="Deloitte"
              user="Manda Arpitha"
            />
          </div>
          <div>
            {/* use this Interview Score By Category key to show   */}
            <SummarySnapshot/>
          </div>
          {/* for presentation and grooming use behavioral_presentation_and_grooming key to show data  */}
          <div>
            <Presentation
              head="Presentation and Grooming"
              score="8/10"
              bgcolor="bg-orange" 
              scoreclr="text-green"
            />
          </div>

          {/* report overview is Interview Score By Category key use this and loop accordingly and pass data as props 
 */}
          <div>
            <ReportOverview
              head="Behavioural Analysis"
              score="8/10"
              bgcolor="bg-purple" 
              scoreclr="text-green"
            />
          </div>
          <div>
            <ReportOverview
              head="Technical Knowledge"
              score="6/10"
              bgcolor="bg-green"
              scoreclr="text-orange"
            />
          </div>
          <div>
            <ReportOverview
              head="Practical Thinking"
              score="3/10"
              bgcolor="bg-orange" 
              scoreclr="text-red"
            />
          </div>
          {/* deep dive data will come form interview_score_by_category  loop ionterview_score_by_category.data it and pass data as props */}
          <div>
            <DeepDive
              head="Behavioural"
              bgcolor="bg-purple" 
            />
          </div>
          <div>
            <DeepDive
              head="Technical"
              bgcolor="bg-green" 
            />
          </div>
          <div>
            <DeepDive
              head="Practical Thinking"
              bgcolor="bg-orange" 
            />
          </div>
          <div>
            <CompanyAndRoleSummary/> 
          </div>
          <div>
            <Extro/>
          </div>
          {/* {reportData?.interview_score_by_category?.data?.map((o, index) => {
            return (
              <>
                <div>
                  <Divider className="pt-5" />
                  <UserReportPartTwo userData={o} user={reportData} />
                  <Divider className="pt-5" />
                </div>
              </>)
          })} */}

          {/* <div>
            <Divider className="pt-5" />
            <UserReportPartThree userData={reportData?.interview_score_by_category} user={reportData} />
            <Divider className="pt-5" />
          </div> */}
          {/* {
            reportData?.interview_score_by_category?.data.find(o => o.main_title === "Equipped Mastery")?.length > 0 && ( */}
          {/* <div>
            <Divider className="pt-5" />
            <UserReportPartFour userData={reportData?.interview_score_by_category} user={reportData} />
            <Divider className="pt-5" />
          </div> */}

          {/* <div>
            <Divider className="pt-5" />
            <UserReportPartFive userData={reportData?.where_you_stand} />
            <Divider className="pt-5" />
          </div> */}

          {/* {reportData?.report_type == "role based report" && (
            <div>
              <Divider className="pt-5" />
              <UserReportPartSix userData={reportData} />
              <Divider className="pt-5" />
            </div>
          )}
          {reportData?.report_type == "skill based report" && (
            <div>
              <Divider className="pt-5" />
              <SkillSuggestions data={reportData?.skill_based_suggestions ? reportData?.skill_based_suggestions : {}} />
              <Divider className="pt-5" />
            </div>
          )}
          {reportData?.report_type == "skill based report" && (
            <div>
              <Divider className="pt-5" />
              <SkillsDisplay skills={reportData?.hard_and_soft_skill_dic ? reportData?.hard_and_soft_skill_dic : {}} />
              <Divider className="pt-5" />
            </div>
          )}

          <div>
            <UserReportPartSeven userData={reportData} />
          </div> */}

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
