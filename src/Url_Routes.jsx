import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/Login/Login";
import HeaderFooterLayout from "./HeaderFooterLayout";
import Profile from "./screens/Profile";
import Users from "./screens/Users";
import GLOBAL_CONSTANTS from "../GlobalConstants";
import QuizListing from "./screens/QuizListing";
import Register from "./screens/Login/Register";
import StudentLogin from "./screens/Login/StudentLogin";
import StudentRegister from "./screens/Login/StudentRegister";
import Summary from "./screens/Admin/Summary";
import Students from "./screens/Admin/Students/Students";
import Teachers from "./screens/Admin/Teachers/Teachers";
import AdminDashboard from "./screens/Admin/Dashboard/Dashboard";
import AddStudents from "./screens/Admin/AddStudents/AddStudents";
import AddTeachers from "./screens/Admin/AddTeachers/AddTeachers";
import UserReport from "./screens/UserReport/UserReport";
import StudentDashboard from "./screens/Student Dashboard/StudentDashboard";
import EmotionSensing from "../src/screens/Admin/Analysis/EmotionSensing/EmotionSensing";
import StepperComponent from "./screens/PracticeNow/Practice";
import NotificationsPage from "./screens/Notifications/Notifications";
import SettingsPage from "./screens/StudentSettings/Settings";
import HelpAndSupportPage from "./screens/Help/Help";
import KSAnalysis from "./screens/Admin/Analysis/KSAnalysis";
import Skills from "./screens/Admin/Analysis/Skills";
import BehaviourAnalysis from "./screens/Admin/Analysis/BehaviourAnalysis";
import PracticalThinking from "./screens/Admin/Analysis/PracticalThinking";
import HelpSupportAdmin from "./screens/Help/AdminHelp";
import SettingsPageAdmin from "./screens/AdminSettings/Settings";
import ReportIndex from "./screens/UserReport/ReportsList";
import LoadQuestionsData from "./screens/PracticeNow/LoadQuestionsData";


function Url_Routes() {
  return (
    <BrowserRouter>
      <Routes>
        {
          (GLOBAL_CONSTANTS?.loggedIn || true) &&
          <>
            {
              GLOBAL_CONSTANTS?.user_cred?.role_id == 1 ? <>
                <Route excat path="/quiz" element={<HeaderFooterLayout Component={<QuizListing />} />} />
                <Route excat path="/users" element={<HeaderFooterLayout Component={<Users />} />} />
                <Route excat path="/profile" element={<HeaderFooterLayout Component={<Profile />} />} />
                <Route excat path="/studentList" element={<HeaderFooterLayout Component={<Students />} />} />
                <Route excat path="/teachersList" element={<HeaderFooterLayout Component={<Teachers />} />} />
                <Route excat path="/adminDashboard" element={<HeaderFooterLayout Component={<AdminDashboard />} />} />
                <Route excat path="/addStudent" element={<HeaderFooterLayout Component={<AddStudents />} />} />
                <Route excat path="/addTeacher" element={<HeaderFooterLayout Component={<AddTeachers />} />} />
                <Route excat path="/summary" element={<HeaderFooterLayout Component={<Summary />} />} />
                <Route excat path="/emotionSensing" element={<HeaderFooterLayout Component={<EmotionSensing />} />} />
                <Route excat path="/ksanalysis" element={<HeaderFooterLayout Component={<KSAnalysis />} />} />
                <Route excat path="/skills" element={<HeaderFooterLayout Component={<Skills />} />} />
                <Route excat path="/behaviourAnalysis" element={<HeaderFooterLayout Component={<BehaviourAnalysis />} />} />
                <Route excat path="/practicalThinking" element={<HeaderFooterLayout Component={<PracticalThinking />} />} />
                <Route excat path="/adminHelp" element={<HeaderFooterLayout Component={<HelpSupportAdmin />} />} />
                <Route excat path="/adminSettings" element={<HeaderFooterLayout Component={<SettingsPageAdmin />} />} />
              </> : <>
                <Route excat path="/report" element={<HeaderFooterLayout Component={<ReportIndex />} />} />
                <Route excat path="/reportView" element={<HeaderFooterLayout Component={<UserReport />} />} />
                <Route excat path="/profile" element={<HeaderFooterLayout Component={<Profile />} />} />
                <Route excat path="/interview" element={<HeaderFooterLayout Component={<LoadQuestionsData />} />} />
                <Route excat path="/practice" element={<HeaderFooterLayout Component={<StepperComponent />} />} />
                <Route excat path="/notifications" element={<HeaderFooterLayout Component={<NotificationsPage />} />} />
                <Route excat path="/help" element={<HeaderFooterLayout Component={<HelpAndSupportPage />} />} />
                <Route excat path="/settings" element={<HeaderFooterLayout Component={<SettingsPage />} />} />
                <Route excat path="/studentDashboard" element={<HeaderFooterLayout Component={<StudentDashboard />} />} />
              </>
            }
          </>
        }
        <Route excat path="/" element={<Login />} />
        <Route excat path="/studentLogin" element={<StudentLogin />} />
        <Route excat path="/studentRegister" element={<StudentRegister />} />
        <Route exact path="/registration" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Url_Routes;
