import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import dispatchMessage from "../../../hooks/messageHandler";

import QuestionAnswers from "./QuestionAnswers";
import { useHttpRequest } from "../../../hooks/httpClient";
import Loader from "../../utils/Loader";
import useEventLogger, {ACTIONS} from "../../../hooks/eventLogger";

import { useParams } from "react-router-dom";

function Quiz({
  quiz_id,
  handleNext,
  isVideo = false,
  score,
  setScore,
  AddCourseProgress,
}) {
  const [quiz, SetQuiz] = useState({});
  const [localeQuiz, setLocaleQuiz] = useState({});

  const [showRC, setShowRC] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const course_id = useParams().id;
  const sendRequest = useHttpRequest();
  const logEvent = useEventLogger();
  useEffect(() => {
    const getQuizById = async () => {
      try {
        const data = await sendRequest(`/api/quiz/${quiz_id}`, {
          method: "GET",
        });
        SetQuiz(data.data);
        setLocaleQuiz(data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    getQuizById();
  }, [course_id, quiz_id]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz?.questions?.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerSelect = (id, answer) => {
    setLocaleQuiz((localeQuiz) => {
      localeQuiz?.questions?.forEach((question) => {
        if (question?._id == id) {
          question.attempted = answer;
          if (answer == question?.answer) {
            question.correct = true;
          } else {
            question.correct = false;
          }
        }
      });
      return localeQuiz;
    });
  };

  const calculateScore = () => {
    let count = 0;

    localeQuiz?.questions?.forEach((question) => {
      if (question?.attempted == question?.answer) {
        count++;
      }
    });

    setScore((count / quiz?.questions?.length) * 100);
  };

  const handleSubmit = () => {
    calculateScore();

    setCurrentQuestionIndex(0);
    setShowRC(true);
    if (isVideo) {
      logEvent({
        action: ACTIONS.SUBMIT_QUIZ,
        context: {
          moduleId: quiz._id,
          moduleTitle: quiz.title,
          score: score,
          type: "video",
        },
      });
    } else {
      logEvent({
        action: ACTIONS.SUBMIT_QUIZ,
        context: {
          moduleId: quiz._id,
          moduleTitle: quiz.title,
          score: score,
          type: "quiz",
        },
      });
    }

    dispatchMessage("success", "Quiz Submitted");
  };
  if (loading) {
    return (
      <div>
        <Loader height="400px" />
      </div>
    );
  }

  let isLastQuestion;
  let isFirstQuestion;

  if (!loading) {
    isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
    isFirstQuestion = currentQuestionIndex === 0;
  }

  return (
    <>
      {!loading && (
        <div
          style={{
            paddingTop: "10px",
            height: "400px",
            width: "650px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <QuestionAnswers
            quiz={quiz}
            localeQuiz={localeQuiz}
            currentQuestionIndex={currentQuestionIndex}
            handleSubmit={handleSubmit}
            handleAnswerSelect={handleAnswerSelect}
            handlePreviousQuestion={handlePreviousQuestion}
            handleNextQuestion={handleNextQuestion}
            showRC={showRC}
          />

          <Stack style={{ paddingTop: "20px" }} spacing={15} direction="row">
            <IconButton
              style={{ color: "#1976D2", opacity: isFirstQuestion ? 0.3 : 1 }}
              disabled={isFirstQuestion}
              onClick={handlePreviousQuestion}
            >
              <NavigateBeforeIcon
                style={{ height: "25px", width: "25px", borderRadius: "50%" }}
              />
            </IconButton>
            {isLastQuestion ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  if (showRC) {
                    handleNext();
                    setLocaleQuiz({});
                    setShowRC(false);
                  } else {
                    handleSubmit();
                  }
                }}
              >
                {!showRC ? "Submit" : isVideo ? "Continue" : "Next"}
              </Button>
            ) : (
              <IconButton
                style={{ color: "#1976D2", opacity: isLastQuestion ? 0.3 : 1 }}
                disabled={isLastQuestion}
                onClick={handleNextQuestion}
              >
                <NavigateNextIcon
                  style={{ height: "25px", width: "25px", borderRadius: "50%" }}
                />
              </IconButton>
            )}
          </Stack>
        </div>
      )}
    </>
  );
}

export default Quiz;
