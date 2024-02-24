import { useState, useEffect, useCallback } from "react";

import { Divider, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import PekanuTheme from "../../store/Theme";

import { useParams } from "react-router-dom";

import VideoPlayer from "./VideoPlayer";
import Notes from "../player/Notes";
import Quiz from "./quiz/Quiz";
import ModuleList from "./ModuleList";
import { useHttpRequest } from "../../hooks/httpClient";
import useEventLogger, {ACTIONS} from "../../hooks/eventLogger";

export default function Content({ setShowBot, courseData }) {
  const modulesArray = courseData.course.modules;
  let recentModule;
  if (courseData.lastAccessed) {
    recentModule = courseData.lastAccessed.module || [];
  }
  const index = modulesArray.findIndex((module) => module._id === recentModule);

  const [currentIndex, setCurrentIndex] = useState(index < 0 ? 0 : index);

  const logEvent = useEventLogger();

  const handleLogEvent = (index) => {
    logEvent({
      action: ACTIONS.OPENED_MODULE,
      context: {
        moduleID: courseData.course.modules[index]._id,
        moduleTitle: courseData.course.modules[index].title,
        moduleType: courseData.course.modules[index].type,
      }
    });
  };

  const [type, setType] = useState("");
  const [score, setScore] = useState(0);
  const course_id = useParams().id;
  const sendRequest = useHttpRequest();

  const AddRecentModule = async () => {
    const module_id = courseData.course.modules[currentIndex]?._id;

    try {
      const data = await sendRequest(`/api/user/course/${course_id}/recent`, {
        method: "POST",
        body: JSON.stringify({
          moduleId: courseData.course.modules[currentIndex]?._id,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const AddCourseProgress = async () => {
    try {
      let quizzes = [];
      if (type === "quiz") {
        quizzes = [
          {
            quiz: courseData.course.modules[currentIndex]?._id,
            score,
          },
        ];
      } else if (type === "video") {
        quizzes = courseData.course.modules[currentIndex]?.quizzes.map((id) => {
          return {
            quiz: id,
            score,
          };
        });
      }

      setScore(0);

      const data = await sendRequest(`/api/user/course/${course_id}/progress`, {
        method: "POST",
        body: JSON.stringify({
          module: courseData.course.modules[currentIndex]?._id,
          quizzes,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleNext = () => {
    if (currentIndex < courseData.course.modules.length - 1) {
      setCurrentIndex((currentIndex) => currentIndex + 1);
      handleLogEvent(currentIndex + 1);
      AddRecentModule();
      if (type != "video") {
        AddCourseProgress();
      }
      setType("");
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((currentIndex) => currentIndex - 1);
      handleLogEvent(currentIndex - 1);
      AddRecentModule();
      if (type != "video") {
        AddCourseProgress();
      }
      setType("");
    }
  };

  useEffect(() => {
    setType(courseData.course.modules[currentIndex]?.type);
  }, [currentIndex, courseData]);

  if (type === "quiz") {
    setShowBot(false);
  } else {
    setShowBot(true);
  }

  return (
    <PekanuTheme>
      <Stack direction="row">
        <ModuleList
          courseData={courseData}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          AddRecentModule={AddRecentModule}
          setType={setType}
        />

        <Divider
          orientation="vertical"
          flexItem
          style={{
            paddingRight: "10px",
          }}
        />

        <Stack direction="column">
          <div
            style={{
              minWidth: "650px",
              minHeight: "550px",
              fontWeight: "bold",
            }}
          >
            <Typography
              style={{
                padding: "24px",
                fontWeight: "bold",
              }}
              variant="h4"
            >
              {courseData.course.modules[currentIndex]?.title}
            </Typography>
            <Divider orientation="horizontal" flexItem />
            {type === "quiz" ? (
              <Quiz
                quiz_id={courseData.course.modules[currentIndex]?.quiz}
                handleNext={handleNext}
                score={score}
                setScore={setScore}
                AddCourseProgress={AddCourseProgress}
              />
            ) : type === "notes" ? (
              <Notes link={courseData.course.modules[currentIndex]?.notesUrl} />
            ) : (
              type === "video" && (
                <VideoPlayer
                  link={courseData.course.modules[currentIndex]?.videoUrl}
                  quizzes={courseData.course.modules[currentIndex]?.quizzes}
                  videoData={courseData.course.modules[currentIndex]}
                  score={score}
                  setScore={setScore}
                />
              )
            )}
          </div>
          <Divider orientation="horizontal" flexItem />
          <Stack
            direction="row"
            spacing={20}
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "45px",
            }}
          >
            <Button
              id="prevButton"
              color="primary"
              variant="outlined"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </Button>
            <Button
              id="nextButton"
              color="primary"
              variant="outlined"
              onClick={handleNext}
              disabled={currentIndex === courseData.course.modules.length - 1}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </PekanuTheme>
  );
}
