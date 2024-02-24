import React, { useState } from "react";

import Box from "@mui/material/Box";

import { Stack, Button } from "@mui/material";
import PekanuTheme from "../../../store/Theme";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import UserLogModal from "./UserLogModal";
const AddCourseCard = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openLogModal, setOpenLogModal] = useState(false);

  const handlePasswordChange = (newPassword) => {
    console.log("Password changed to:", newPassword);
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenLogModal = () => setOpenLogModal(true);
  const handleCloseLogModal = () => setOpenLogModal(false);

  return (
    <PekanuTheme>
      <Box sx={{ flexGrow: 1, padding: "50px" }}>
        <Stack
          spacing={4}
          direction="row"
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            startIcon={<ImportExportOutlinedIcon />}
            onClick={handleOpenLogModal}
          >
            Export User logs
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<LockOutlinedIcon />}
            onClick={handleOpenModal}
          >
            Password
          </Button>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => {
              navigate("/admin/course");
            }}
          >
            Add Courses
          </Button>
        </Stack>
      </Box>
      <ChangePasswordModal
        open={openModal}
        onChangePassword={handlePasswordChange}
        handleClose={handleCloseModal}
      />
      <UserLogModal open={openLogModal} handleClose={handleCloseLogModal} />
    </PekanuTheme>
  );
};

export default AddCourseCard;
