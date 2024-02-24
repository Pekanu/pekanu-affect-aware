import React, { useState, useEffect } from "react";
import { TextField, Grid, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimeInput = ({ setTime }) => {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    setTime(formattedTime);
    console.log(formattedTime);
  }, [hours, minutes, seconds, setTime]);

  const handleHoursChange = (event) => {
    const newHours = event.target.value;
    setHours(newHours);
  };

  const handleMinutesChange = (event) => {
    const newMinutes = event.target.value;
    setMinutes(newMinutes);
  };

  const handleSecondsChange = (event) => {
    const newSeconds = event.target.value;
    setSeconds(newSeconds);
  };

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <AccessTimeIcon />
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "100px" }}
          label="Hours"
          type="number"
          variant="outlined"
          value={hours}
          onChange={handleHoursChange}
        />
      </Grid>
      <Grid item>
        <Typography>:</Typography>
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "100px" }}
          label="Minutes"
          type="number"
          variant="outlined"
          value={minutes}
          onChange={handleMinutesChange}
        />
      </Grid>
      <Grid item>
        <Typography>:</Typography>
      </Grid>
      <Grid item>
        <TextField
          sx={{ width: "100px" }}
          label="Seconds"
          type="number"
          variant="outlined"
          value={seconds}
          onChange={handleSecondsChange}
        />
      </Grid>
    </Grid>
  );
};

export default TimeInput;
