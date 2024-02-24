import React, { useState, useEffect } from "react";
import {
  Modal,
  Backdrop,
  Fade,
  Button,
  Box,
  IconButton,
  Typography,
  Stack,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useHttpRequest } from "../../../hooks/httpClient";
import dispatchMessage from "../../../hooks/messageHandler";

const ChangePasswordModal = ({ open, handleClose, onChangePassword }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [showCPassword, setShowCPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };
  const sendRequest = useHttpRequest();

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword);
  }, [newPassword, confirmPassword]);

  const handlePasswordChange = async () => {
    if (!passwordsMatch) {
      return;
    } else {
      {
        onChangePassword(newPassword);
        try {
          const data = await sendRequest(`/api/user/admin/password`, {
            method: "POST",
            body: JSON.stringify({ password: newPassword }),
          });

          if (data) {
            dispatchMessage("success", "Password updated");
            setConfirmPassword("");
            setNewPassword("");
            handleClose();
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

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
            handleClose();
            setConfirmPassword("");
            setNewPassword("");
          }}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Stack spacing={3}>
          <Typography variant="h6" gutterBottom>
            Password Change
          </Typography>
          <TextField
            id="new-password"
            label="New Password"
            variant="outlined"
            fullWidth
            type={showPassword ? "password" : "text"}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={togglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            id="confirm-password"
            label="Confirm Password"
            variant="outlined"
            fullWidth
            value={confirmPassword}
            type={showCPassword ? "password" : "text"}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!passwordsMatch}
            helperText={!passwordsMatch && "Passwords do not match"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={toggleCPasswordVisibility} edge="end">
                  {showCPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePasswordChange}
            disabled={passwordsMatch ? false : true}
          >
            Change Password
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ChangePasswordModal;
