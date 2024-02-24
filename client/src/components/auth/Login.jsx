import { useState,  useContext } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useHttpRequest } from "../../hooks/httpClient";
import dispatchMessage from "../../hooks/messageHandler";
import { useNavigateAuthorised } from "../../hooks/authCookie";
import { authContext } from "../../store/authContext";
import useEventLogger, {ACTIONS} from "../../hooks/eventLogger";

function Login() {
  useNavigateAuthorised();
  const logEvent = useEventLogger();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const sendRequest = useHttpRequest();

  const { fetchMe } = useContext(authContext);

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      dispatchMessage("warn", "Please fill in all the fields");
      return;
    }

    try {
      let data = await sendRequest("/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      data = data.data

      if (!data.message) {
        dispatchMessage("success", "Login successful");
      } else {
        dispatchMessage("error", data.message);
      }

      if (data.type === "student") {
        logEvent({
          action: ACTIONS.LOGIN,
        });
      }
      fetchMe();
    } catch (err) {
      dispatchMessage("error", "An error occurred during login");
    }
  };

  return (
    <form onSubmit={loginHandler} className=" mx-auto w-2/3">
      <Stack className="w-full items-center" spacing={3}>
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
          id="outlined-basic"
          label={<span className="font">Password</span>}
          variant="outlined"
          type={showPassword ? "password" : "text"}
          name="password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={togglePasswordVisibility} edge="end">
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            ),
          }}
        />
        <Button
          className="w-full p-2 border rounded font"
          style={{
            Color: "#1A56DB",
          }}
          variant="contained"
          type="submit"
        >
          Login
        </Button>
      </Stack>
    </form>
  );
}

export default Login;
