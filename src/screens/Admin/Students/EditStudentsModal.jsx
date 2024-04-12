
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

import { useEffect, useRef, useState } from "react";
import UploadImage from "../../../assets/file-upload.png";

import { loadBrachList, loadCourseList, loadDepartmentList, loadInstitutionList, uploadUser, user_create, loadTeachersList, loadStudentList } from "../../../redux/action";
import { useDispatch, useSelector } from "react-redux";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import { Autocomplete, Tab, TextField } from "@mui/material";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GLOBAL_CONSTANTS from "../../../../GlobalConstants";
import { toast } from "react-toastify";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  borderRadius: 4,
  bgcolor: 'background.paper',
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};



const EditStudentsModal = (props) => {
    const [openEdit, setOpenEdit] = React.useState(false);
    // const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);
    const handleOpenEdit = (student) => {
        setSelectedStudent(student);
        setOpenEdit(true);
      };

    const [selectedStudent, setSelectedStudent] = useState(null);

    console.log(selectedStudent,'selectedStudent..')

    
    const dispatch = useDispatch()
    const { courseList, departmentList, branchList, studentsList } = useSelector(state => state.data)

    const formData = new FormData();
    formData.append("mode", "student")
    // ref
    const input = useRef(null);

    const [mainData, setMainData] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);
    
    const userFeilds =
    [
      {
        label: "First Name",
        key: "first_name",
        value: mainData?.first_name ?? "",
        type: "text",
        required:true
      },
      {
        label: "Last Name",
        key: "last_name",
        value: mainData?.last_name ?? "",
        type: "text",
        required:true
      },
      {
        label: "Email",
        key: "email",
        value: mainData?.email ?? "",
        type: "text",
        required:true
      },
      {
        key: "mobile_number",
        label: "Mobile Number",
        value: mainData?.mobile_number ?? "",
        type: "text",
        required:true
      },
      {
        label: "Address",
        key: "address",
        value: mainData?.address ?? "",
        type: "text",
        required:true
      },
    //   {
    //     label: "Password",
    //     key: "password",
    //     value: mainData?.password ?? "",
    //     type: "text",
    //     required:true
    //   },
      {
        label: "Branch",
        key: "branch",
        value: mainData?.branch ?? null,
        options: branchList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
        type: "select",
        required:true
      },
      {
        label: "Course",
        key: "course",
        value: mainData?.course ?? null,
        type: "select",
        options: courseList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
        required:true
      },
      {
        label: "Department",
        key: "department",
        value: mainData?.department ?? null,
        options: departmentList?.map((o) => ({ label: o?.name, value: o?.id })) ?? [],
        required:true,
        type: "select"
      },
    ]
 
  useEffect(() => {
    if (selectedStudent !== null && studentsList && studentsList.data.length > selectedStudent) {
      const selectedStudentData = studentsList.data[selectedStudent]; // Get the selected teacher object from teachersList.data
  
      if (selectedStudentData) {
        // Update mainData with the selected teacher's data
        setMainData({
          first_name: selectedStudentData.name ?? "",
          last_name: selectedStudentData.last_name ?? "",
          email: selectedStudentData.email ?? "",
          mobile_number: selectedStudentData.phone_number ?? "",
          address: selectedStudentData.address ?? "",
          password: "", // Assuming password is not available in the teacher data
          branch: selectedStudentData.branch_name ?? "",
          course: selectedStudentData.course_name ?? "",
          department: selectedStudentData.department_name ?? "",
        //   branch: branchList.find(branch => branch.id === selectedTeacherData.branch_id) ?? null,
        //   course: courseList.find(course => course.id === selectedTeacherData.course_id) ?? null,
        //   department: departmentList.find(department => department.id === selectedTeacherData.department_id) ?? null,
        });
      }
    }
  }, [selectedStudent, studentsList]);
  
  const handleInputChange = (key, value) => {
    let temp = { ...mainData }
    temp[key] = value;
    if(key=="branch"){
      dispatch(loadCourseList(`branch_id=${value?.value}`));
    } else if(key=="course"){
      dispatch(loadDepartmentList(`course_id=${value?.value}`));
    }
    setMainData(() => ({ ...temp }))
  }
  const handleSelectionError = (key, value) => {
    if(key == "course" && !mainData.branch){
      toast.error(
        "Branch not selected",
        {
          autoClose: 2000,
        }
      );
    } else if(key == "department" && !mainData.course){
      toast.error(
        "Course not selected",
        {
          autoClose: 2000,
        }
      );
    }
  }

  useEffect(() => {
    const requiredFields = userFeilds.filter((field) => field.required);
    const isValid =
      requiredFields.every((field) => mainData[field.key] !== "") && requiredFields.every((field) => mainData[field.key]!==undefined) 
    setIsFormValid(isValid);
  }, [mainData]);

  useEffect(() => {
    dispatch(loadBrachList(`institution_id=${GLOBAL_CONSTANTS.user_cred?.id}`));
    dispatch(loadStudentList());
    // dispatch(loadBrachList());
    // dispatch(loadCourseList());
    // dispatch(loadDepartmentList())

  }, [])
  console.log(studentsList,"studentList")

  useEffect(() => {
    console?.info(mainData, "--mainData")
  }, [mainData])

  const onHandleCreate = () => {
    const payload = {
      "first_name": mainData?.first_name,
      "last_name": mainData?.last_name,
      "email": mainData?.email,
      "phone_number": mainData?.mobile_number,
      "branch_id": mainData?.branch?.value,
      "department_id": mainData?.department?.value,
      "address": mainData?.address,
      "course_id": mainData?.course?.value,
      "password": mainData?.password
    }
    dispatch(user_create(payload, { mode: "student" }, () => { setMainData({}) }))
  }

return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Tooltip title="Edit">
            <IconButton onClick={() => handleOpenEdit(props.studentId)}>
                <EditIcon sx={{ color: '#006db5' }} />            
            </IconButton>
        </Tooltip>
        <Modal
            open={openEdit}
            onClose={handleCloseEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'#006db5',fontWeight:'bold'}}>
                    Edit&nbsp;{props.studentName}
                  </Typography>
                  <hr></hr><br></br>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4" >
            {
              userFeilds?.map((o) => (
                <>
                  {
                    o?.type === "select" ?
                      <div class="flex flex-col">
                        <p className="mb-1 text-gray-400 text-sm">{o?.label}</p>
                        <Autocomplete
                          size="small"
                          fullWidth
                          disablePortal
                          value={o?.value}
                          defaultValue={o?.value}
                          placeholder={o?.label}
                          id="combo-box-demo"
                          options={o?.options ?? []}
                          renderInput={(params) => <TextField {...params} 
                        //   label={(
                        //     <div>
                        //       {o?.label}
                        //       {o?.required && (
                        //         <span style={{ color: 'red' }}>*</span>
                        //       )}
                        //     </div>
                        //   )}
                           />}
                          onChange={(e, value) => { handleInputChange(o?.key, value) }}
                          onClickCapture={(e, value) => {
                            handleSelectionError(o?.key, value);
                          }}
                        />

                      </div>
                      :
                      <div class="flex flex-col">
                        <p className="mb-1 text-gray-400 text-sm">{o?.label}</p>
                            <TextField
                                key={o?.key}
                                type={o?.type}
                                placeholder={o?.label}
                                // label={(
                                //     <div>
                                //         {o?.label}
                                //         {o?.required && (
                                //             <span style={{ color: 'red' }}>*</span>
                                //         )}
                                //       </div>
                                // )}
                                value={o?.value}
                                size="small"
                                onChange={(e) => { handleInputChange(o?.key, e.target.value); } } />
                      </div>
                  }
                </>
              )
              )
            }
          </div>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }} style={{justifyContent:'end'}}>
                <Button onClick={handleCloseEdit} variant="outlined" style={{color:'#6c757d', border:'1px solid #6c757d'}}>
                    CANCEL
                </Button>
                <Button  variant="contained" color="primary" endIcon={<EditIcon />}>
                    UPDATE
                </Button>
                </Stack>
            </Box>
        </Modal>
    </div>
  );

};

export default EditStudentsModal;