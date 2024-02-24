import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

import useEventLogger, {ACTIONS} from "../../hooks/eventLogger";

export default function CourseBox({
  image,
  courseName,
  description,
  courseID,
}) {
  const logEvent = useEventLogger();

  return (
    <Link to={`/course/${courseID}`}>
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
        onClick={() => {
          logEvent({
            action: ACTIONS.OPENED_COURSE,
            context: {courseID, courseName
            },
          });
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
        </Stack>
      </Box>
    </Link>
  );
}
