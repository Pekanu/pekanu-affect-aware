import React, { useState } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Box,
  TextField,
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useHttpRequest } from "../../../hooks/httpClient";

const UserLogModal = ({ open, handleClose }) => {
  const [date, setDate] = useState("");
  const [username, setUsername] = useState("");
  const [format, setFormat] = useState("");

  return (
    <Modal
      open={open}
      handleClose={handleClose}
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
          <Typography variant="h6" gutterBottom>
            User Log
          </Typography>
          <IconButton
            onClick={() => {
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
          <TextField
            id="date"
            type="date"
            fullWidth
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            id="username"
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2 }}
          />
          <div className="flex justify-center items-center">
            <RadioGroup
              row
              aria-label="format"
              name="format"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              sx={{ mb: 2 }}
            >
              <FormControlLabel value="csv" control={<Radio />} label="CSV" />
              <FormControlLabel value="json" control={<Radio />} label="JSON" />
            </RadioGroup>
          </div>
          <a
            href={
              import.meta.env.VITE_SERVER_ENDPOINT +
              `/api/log/download?username=${username}&minTimestamp=${date}&format=${format}`
            }
          >
            <Button variant="contained" color="primary" disabled={!format}>
              Download
            </Button>
          </a>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UserLogModal;
