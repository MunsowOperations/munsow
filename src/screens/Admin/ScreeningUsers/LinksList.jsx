import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, IconButton, Switch, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import 'tailwindcss/tailwind.css';
import { useDispatch, useSelector } from 'react-redux';
import { getLinkUsers, loadLinks, updateLinkStatus } from '../../../redux/action';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import 'react-toastify/dist/ReactToastify.css';

const LinksList = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [screeningUsers, setScreeningUsers] = useState(null);

  const history = useNavigate();

  const handleClickOpen = (item) => {
    setSelectedItem(item);

    dispatch(getLinkUsers(selectedItem.unique_code, (resp) => {
      // console.log("res", resp)
      setScreeningUsers(resp?.data)
    }))

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const dispatch = useDispatch();
  const { linksList } = useSelector((state) => state?.data)


  useEffect(() => {
    dispatch(loadLinks());
  }, [dispatch])

  const handleToggleChange = (link) => {
    // console.log("link", link)

    dispatch(updateLinkStatus(link.unique_code, link.is_active ? "deactive" : "active", () => {
      dispatch(loadLinks());
    }))

  };

  const handleCreateLink = () => {
    history('/screeningUsers/createLink'); 
  };

  const [copied, setCopied] = useState(false);


  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset tooltip state after 2 seconds
  };


  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-2">
        <span className="text-2xl font-semibold">Generated Links List</span>
        <Button
          variant="contained"
          color="primary"
          style={{ background: '#2BE2D0', color: "#252525" }}
          onClick={handleCreateLink}
          className="top-0 right-0 m-4"
        >
          Create Link
        </Button>


      </div>

      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="customized table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Max Capacity</TableCell>
              <TableCell>Activation Date</TableCell>
              <TableCell>Expiry Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {linksList?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" >
                https://munsow-stg.vercel.app/studentRegistration/{row.name}
                <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                  <IconButton onClick={() => handleCopyToClipboard(`https://munsow-stg.vercel.app/studentRegistration/${row.name}`)}>
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                </TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.description}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{row.max_capacity}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{new Date(row.activation_date).toLocaleDateString()}</TableCell>
                <TableCell className="cursor-pointer text-blue-600 hover:text-blue-800" onClick={() => handleClickOpen(row)}>{new Date(row.expiry_date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Switch
                    checked={row.is_active}
                    onChange={() => handleToggleChange(row)}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Link : <span style={{ color: "#2BE2D0" }}>{selectedItem?.name}</span> Users</h2>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="p-4">
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
              <TableHead>
                <TableRow className="bg-gray-100">
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone Number</TableCell>
                  {/* <TableCell>Address</TableCell> */}
                  <TableCell>Branch Name</TableCell>
                  <TableCell>Course Name</TableCell>
                  <TableCell>Department Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {screeningUsers?.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell >
                      {row.name}
                    </TableCell>
                    <TableCell >{row.email}</TableCell>
                    <TableCell >{row.phone_number}</TableCell>
                    {/* <TableCell >{row.address}</TableCell> */}
                    <TableCell >{row.branch_name}</TableCell>
                    <TableCell >{row.course_name}</TableCell>
                    <TableCell >{row.department_name}</TableCell>


                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </div>
  );
};

export default LinksList;
