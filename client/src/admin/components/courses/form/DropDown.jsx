import React from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

export default function DropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (value) => {
    props.setModule(value);
    handleMenuClose();
  };

  return (
    <div>
      {!props.selectmodule && (
        <>
          {" "}
          <Button
            onClick={handleButtonClick}
            sx={{ width: "150px", height: "40px" }}
            variant="contained"
          >
            Add Module
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              style: {
                width: "150px",
              },
            }}
          >
            <MenuItem onClick={() => handleMenuItemClick("Quiz")}>
              Quiz
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Notes")}>
              Notes
            </MenuItem>
            <MenuItem onClick={() => handleMenuItemClick("Video")}>
              Video
            </MenuItem>
          </Menu>
          <Box sx={{ minWidth: 120 }}>
            <Select
              onChange={(event) => props.setModule(event.target.value)}
              sx={{ width: "150px", display: "none" }}
            >
              <MenuItem value="Quiz">Quiz</MenuItem>
              <MenuItem value="Notes">Notes</MenuItem>
              <MenuItem value="Video">Video</MenuItem>
            </Select>
          </Box>
        </>
      )}
    </div>
  );
}
