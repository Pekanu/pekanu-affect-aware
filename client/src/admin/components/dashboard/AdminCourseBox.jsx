import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
export default function CourseBox({
  image,
  courseName,
  description,
  openModal,
  courseID,
  setCourse,
}) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 250,
        minHeight: 250,
        padding: 0,
        backgroundColor: "#f0f8fa",
        overflow: "hidden",
        transition: "box-shadow 0.3s, opacity 0.3s",
        "&:hover": {
          boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
          opacity: 0.8,
        },
        fontFamily:
          "Inter var,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
      }}
    >
      <Stack>
        <div className="w-40 h-40 mx-auto">
          <img
            src={image}
            alt={courseName}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="px-2 py-4">
          <h3 className="text-center p-1 text-l font-bold">{courseName}</h3>
          <p className="text-center p-1 text-xs">{description}</p>
        </div>
        <Stack
          direction="row"
          sx={{ display: "flex", justifyContent: "flex-end", padding: "3px" }}
        >
          <div>
            <Tooltip title="Edit">
              <IconButton
                sx={{ color: "black" }}
                onClick={() => {
                  navigate(`/admin/course/edit/${courseID}`);
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title="Delete">
              <IconButton sx={{ color: "black" }}>
                <DeleteIcon
                  onClick={() => {
                    setCourse(courseID);
                    openModal();
                  }}
                />
              </IconButton>
            </Tooltip>
          </div>
        </Stack>
      </Stack>
    </Box>
  );
}
