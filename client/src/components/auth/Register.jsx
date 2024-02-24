import { useState } from "react";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useHttpRequest } from "../../hooks/httpClient";
import dispatchMessage from "../../hooks/messageHandler";

function Register({ changeTab }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");


  const sendRequest = useHttpRequest();

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!username || !password || !confirmpassword) {
      dispatchMessage("warn", "Please fill in all the fields");
      return;
    }

    if (password != confirmpassword) {
      dispatchMessage("warn", "Passwords didn't matched");
      return;
    }

    try {
      const data = await sendRequest("/api/user/register", {
        method: "POST",
        body: JSON.stringify({
          name: "User",
          username: username,
          password: password,
        }),
      });

      if (data) {
        dispatchMessage(
          "success",
          "Account created successfully. Please login."
        );
        changeTab(null, "login");
      }
    } catch (err) {
      dispatchMessage(err);
     
    }
  };

  return (
    <form onSubmit={registerHandler} className="mx-auto w-2/3">
      <Stack className="w-full items-center " spacing={3}>
        <TextField
          label={<span className="font">Username</span>}
          id="username"
          variant="outlined"
          type="text"
          className="w-full p-2 border rounded "
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label={<span className="font">Password</span>}
          variant="outlined"
          type="password"
          className="w-full p-2 border rounded "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          name="password"
        />
        <TextField
          label={<span className="font">Confirm Password</span>}
          variant="outlined"
          type="password"
          className="w-full p-2 border rounded "
          value={confirmpassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
          id="confirmpassword"
          name="confirmpassword"
        />

        <Button
          className="w-full p-2 border rounded font"
          style={{
            Color: "#1A56DB",
          }}
          variant="contained"
          type="submit"
        >
          Register
        </Button>
      </Stack>
    </form>
  );
}

export default Register;
