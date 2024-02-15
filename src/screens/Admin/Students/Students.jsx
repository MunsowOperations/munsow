
// import { AgGridReact } from "ag-grid-react";

// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo, useCallback, useEffect, useState } from "react";
import ActionButtonCellRenderer from "./ActionButtonCellRenderer";
import { useDispatch, useSelector } from "react-redux";
import { loadBrachList, loadDepartmentList, loadStudentList, user_delete } from "../../../redux/action";
import Pagination from "../../../Components/Pagination";
import { Autocomplete, TextField } from "@mui/material";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';

import EditStudentsModal from "./EditStudentsModal";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: '70%',
  borderRadius: 4,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const columns = [
  { 
    id: 'name', 
    label: 'Name', 
    align: 'start',
    // minWidth: 170 
    numeric: false,
  },
  { 
    id: 'branch',
    label: 'Branch',
    align: 'start',
    // minWidth: 100 
    numeric: false,
  },
  {
    id: 'course',
    label: 'Course',
    // minWidth: 170,
    align: 'start',
    numeric: false,
  },
  {
    id: 'department',
    label: 'Department',
    // minWidth: 170,
    align: 'start',
    numeric: false,
  },
  {
    id: 'interviews',
    label: 'No of Interviews',
    // minWidth: 170,
    align: 'start',
    numeric: true,
  },
  {
    id: 'avgscore',
    label: 'Average Score',
    // minWidth: 170,
    align: 'start',
    numeric: true,
  },
  {
    id: 'action',
    label: 'Actions',
    // minWidth: 170,
    align: 'start',
    numeric: false,
  },
];

const Students = () => {

  //table
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  //delete modal
  const [openDeleteIndex, setOpenDeleteIndex] = React.useState(null);
  const handleOpenDelete = (index) => {
    setOpenDeleteIndex(index);
  };
  
  const handleCloseDelete = () => {
    setOpenDeleteIndex(null);
  };
  

  const dispatch = useDispatch();
  const { studentsList, departmentList, branchList } = useSelector(state => state?.data);
  const [params, setParams] = useState({
    //   order_by:"",
    //   ASC:"",
    //   page_number:"",
    //   created_date:"",
    limit:10,
    mode: "Student"
  })
  console.log(studentsList,'studentsList')

  const deleteHandler = (act) => {
    const { data = {} } = act;
    const { id } = data;
    console.log("id :", id, act);
    dispatch(user_delete({ user_id: id }, () => {
      dispatch(loadStudentList(params))
    }))
    // NEED TO DO API CALL BASED ON ID AND UPDATE ROWDATA
  };

  const getRowHeight = useCallback(() => {
    return 45;
  }, []);

  useEffect(() => {
    dispatch(loadDepartmentList())
    dispatch(loadBrachList())
  }, [dispatch])

  useEffect(() => {
    dispatch(loadStudentList(params))
  }, [dispatch, params])


  const onSortChanged = ({ api: { sortController } }) => {
    const sortModel = sortController.getSortModel()
    console.log(sortModel);
    if (sortModel?.length)
      setParams(prev => (
        {
          ...prev,
          column_name: sortModel[0]?.colId === "name" ? "first_name" : sortModel[0].colId,
          order_by: sortModel[0].sort?.toUpperCase()
        }
      )
      );
  };

  const studentCount = studentsList.data ? studentsList.data.length : 0;
  console.log(studentCount,'studentCount')

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const [gridApi, setGridApi] = useState();
  // const [gridColsApi, setGridColsApi] = useState();
  return (
    <Paper sx={{ width: '100%', mb: 2 }}>
      <TableContainer>
        <Table>
          <TableHead
          style={{backgroundColor:"#F8F8F8"}}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, fontWeight:"bold",backgroundColor:'#F0F0F0',color:'black' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList?.data && studentsList.data.length > 0 ? (
            studentsList.data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
            <TableRow
                hover
                // role="checkbox"
                // tabIndex={-1}
                // key={row.code}
                style={{ borderBottom: '1px solid rgb(224 224 224)' }}
            >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.branch_name}</TableCell>
                <TableCell>{row.course_name}</TableCell>
                <TableCell>{row.department_name}</TableCell>
                <TableCell>{row.no_of_interviews}</TableCell>
                <TableCell>{row.avg_score}</TableCell>
                <TableCell padding="none">
                {/* <Tooltip title="Edit">
                    <IconButton onClick={() => handleOpenEdit(row)}>
                        <EditIcon sx={{ color: '#006db5' }} />
                        
                    </IconButton>
                </Tooltip>
                 */}
                 <Stack direction="row" spacing={0}>
                 <EditStudentsModal
                 studentId={index}
                 studentName={row.name}
                 />

                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleOpenDelete(index)}>
                      <DeleteIcon sx={{ color: '#d11a2a' }} />
                    </IconButton>
                  </Tooltip>
                 </Stack>
                 
                <Modal
                  open={openDeleteIndex === index}
                  onClose={handleCloseDelete}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" style={{color:'#d11a2a',fontWeight:'bold'}}>
                    Delete
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 0 }}>
                    Are you sure you want to delete <span style={{fontWeight:'bold'}}> {row.name}</span>?
                  </Typography>
                  <Stack direction="row" spacing={2} sx={{ mt: 3 }} style={{justifyContent:'end'}}>
                    <Button onClick={handleCloseDelete} variant="outlined" style={{color:'#6c757d', border:'1px solid #6c757d'}}>
                      CANCEL
                    </Button>
                    <Button  variant="contained" color="error" endIcon={<DeleteIcon />}>
                      DELETE
                    </Button>
                  </Stack>
                </Box>
                </Modal>
                </TableCell>
            </TableRow>
            ))
        ) : (
            <TableRow>
                <TableCell colSpan={7} align="center">
                No data to show here yet.
                </TableCell>
            </TableRow>
        )}
        </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={studentCount}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Students;
