import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";

import PekanuTheme from "../store/Theme";
import { useHttpRequest } from "../hooks/httpClient";
import Loader from "../components/utils/Loader";
import dispatchMessage from "../hooks/messageHandler";

import { useParams } from "react-router-dom";

import useEventLogger, {ACTIONS} from "../hooks/eventLogger";

export default function CourseLandingPage() {
  const sendRequest = useHttpRequest();
  const navigate = useNavigate();
  const course_id = useParams().id
  const [loading, setLoading] = useState(true);
  const [courseData, setCourseData] = useState([]);

  const [rerender, setRerender] = useState(false);
  const logEvent = useEventLogger();
  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const data = await sendRequest(`/api/course/${course_id}`, {
          method: "GET",
        });

        setCourseData(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCourseById();
  }, [course_id, rerender]);

  const handleRegister = async () => {
    try {
      const data = await sendRequest(`/api/user/course/${course_id}`, {
        method: "POST",
      });
      // console.log(data);
      if (data) {
        logEvent({
          action: ACTIONS.COURSE_REGISTRATION,
          context: {
            courseId: course_id,
          },
        });
        dispatchMessage("success", "course registration successful");
        triggerRerender();
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader height="600px" />
      </div>
    );
  }

  return (
    <PekanuTheme>
      {!loading && (
        <Box sx={{ flexGrow: 1 }}>
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              borderRadius: "3px",
            }}
          >
            <Divider orientation="vertical" flexItem />
            <Box
              sx={{
                display: "flex",
                borderRadius: "6px",
                height: "450px",
                width: "400px",
                overflow: "hidden",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div className="flex justify-between h-60 mx-auto">
                <img
                  src={
                    import.meta.env.VITE_SERVER_ENDPOINT +
                    `/${courseData?.course?.thumbnail}`
                  }
                  className="pt-12 p-15 w-full h-full object-contain"
                  alt="react"
                />
              </div>
              <div style={{ marginBottom: "8px" }}>
                <Typography
                  style={{
                    fontWeight: "bold",
                  }}
                  className="text-center"
                  variant="h4"
                  gutterBottom
                >
                  {courseData?.course?.title}
                </Typography>
              </div>

              <div style={{ marginBottom: "8px" }}>
                {" "}
                <Typography className="text-center" variant="subtitle-1">
                  {courseData?.course?.description}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={() => {
                    if (!courseData?.isEnrolled) {
                      handleRegister();
                    } else {
                      navigate(`/course/${course_id}/play`);
                      logEvent({
                        action: ACTIONS.COURSE_STARTED,
                        context: {
                          courseId: course_id,
                        },
                      });
                    }
                  }}
                  variant="outlined"
                  style={{
                    padding: "10px 30px",
                    backgroundColor: "#1A56DB",
                    color: "#fff",
                  }}
                >
                  {courseData?.isEnrolled ? "Start" : "Register"}
                </Button>
              </div>
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{
                borderRadius: "6px",
                height: "650px",
                width: "800px",
                overflowY: "scroll",
                padding: "15px",
              }}
            >
              <Typography
                style={{
                  paddingTop: "25px",
                  padding: "10px",
                  fontWeight: "bold",
                }}
                variant="h4"
              >
                What you will learn
              </Typography>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                {" "}
                <Typography className="text-left" variant="subtitle-1">
                  {courseData?.course?.learnings}
                </Typography>
                <Typography
                  style={{
                    paddingBottom: "10px",
                    paddingTop: "20px",
                    fontWeight: "bold",
                  }}
                  variant="h4"
                >
                  Course Content
                </Typography>
                {courseData?.course?.modules.map((module, index) => (
                  <div key={index}>
                    <Typography
                      style={{
                        paddingTop: "20px",
                      }}
                      variant="h6"
                    >
                      Module {index}: {module.title}
                    </Typography>
                    <Typography
                      style={{
                        paddingTop: "10px",
                      }}
                      variant="subtitle-1"
                    >
                      {module?.description}
                    </Typography>
                  </div>
                ))}
              </div>
            </Box>
          </Container>
        </Box>
      )}
    </PekanuTheme>
  );
}
