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

import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useHttpRequest } from "../../../../../hooks/httpClient";
import { useParams } from "react-router-dom";
import dispatchMessage from "../../../../../hooks/messageHandler";

export default function ModuleDeleteModal({
  module_id,
  open,
  handleClose,
  deletetitle,
  triggerRerender,
}) {
  const edit_id = useParams().id 
  const [confirmationText, setConfirmationText] = useState("");
  const sendRequest = useHttpRequest();
  const handleDelete = async () => {
    if (confirmationText === deletetitle) {
      try {
        const data = await sendRequest(
          `/api/course/${edit_id}/module/${module_id}`,
          {
            method: "DELETE",
          }
        );

        handleClose();
        if (data) {
          dispatchMessage("success", "module deleted successfully");
        }

        triggerRerender();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("not equal to confirmation");
    }
  };

  return (
    <div>
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
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" gutterBottom>
              Delete module
            </Typography>

            <Typography variant="body2" paragraph sx={{ fontWeight: "bold" }}>
              To confirm, type "{deletetitle}" in the box below
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
              sx={{ mr: 1 }}
              disabled={deletetitle !== confirmationText}
            >
              Delete the module
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
