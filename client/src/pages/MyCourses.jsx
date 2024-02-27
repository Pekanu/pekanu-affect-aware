import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import Divider from "@mui/material/Divider";

import SimpleContainer from "../components/dashboard/CourseContainer";
import { useHttpRequest } from "../hooks/httpClient";
import { useEffect, useState, useCallback } from "react";
import Loader from "../components/utils/Loader";

function MyCourses() {
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sendRequest = useHttpRequest();

  const getCourse = useCallback(async () => {
    try {
      const courseData = await sendRequest(`/api/user/course`, {
        method: "GET",
      });

      setCourseData(courseData.data);
      setLoading(false);
    } catch (error) {}
  }, []);

  useEffect(() => {
    getCourse();
  }, []);

  if (loading) {
    return (
      <div>
        <Loader height="600px" />
      </div>
    );
  }

  return (
    <>
      {!loading && (
        <>
          {" "}
          <Typography
            style={{
              fontFamily:
                "Inter var, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
            }}
            className="p-10 text-center"
            variant="h2"
          >
            My Courses
          </Typography>
          <Divider variant="middle" />
          <Stack spacing={10}>
            <SimpleContainer regData={courseData} />
          </Stack>
        </>
      )}
    </>
  );
}

export default MyCourses;
