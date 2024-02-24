import React, { useState, useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useHttpRequest } from "../../../hooks/httpClient";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import dispatchMessage from "../../../hooks/messageHandler";

export default function DeleteModal({
  open,
  handleClose,
  course,
  triggerRerender,
}) {
  const [deleteCourseData, SetDeleteCourseData] = useState({});
  const [confirmationText, setConfirmationText] = useState("");
  const sendRequest = useHttpRequest();
  const handleDelete = async () => {
    if (confirmationText === deleteCourseData.title) {
      try {
        const data = await sendRequest(`/api/course/${course}`, {
          method: "DELETE",
        });

        if (data) {
          dispatchMessage("success", "Course deleted successfully");
          handleClose();
          triggerRerender();
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("not equal to confirmation");
    }
  };

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const data = await sendRequest(`/api/course/${course}`, {
          method: "GET",
        });
        SetDeleteCourseData(data.data.course);
      } catch (err) {
        // console.log(err);
      }
    };

    getCourseById();
  }, [course]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        sx: { pointerEvents: "none" },
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 360,
            borderRadius: 8,
            textAlign: "center",
            pointerEvents: "auto",
          }}
        >
          <IconButton
            onClick={() => {
              setConfirmationText("");
              handleClose();
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" gutterBottom>
            Delete course
          </Typography>

          <Typography variant="body2" paragraph sx={{ fontWeight: "bold" }}>
            To confirm, type "{deleteCourseData.title}" in the box below
          </Typography>
          <TextField
            label="Confirmation Text"
            variant="outlined"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            onClick={handleDelete}
            variant="contained"
            color="primary"
            disabled={deleteCourseData.title !== confirmationText}
            sx={{ mr: 1 }}
          >
            Delete the course
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
