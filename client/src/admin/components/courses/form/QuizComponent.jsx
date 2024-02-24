import React, { useState } from "react";

import { TextField, Button, Stack, Divider } from "@mui/material";
import TimeInput from "./TimeInput";
import PekanuTheme from "../../../../store/Theme";
import { useHttpRequest } from "../../../../hooks/httpClient";
import QuizQuestion from "./components/QuizQuestion";
import dispatchMessage from "../../../../hooks/messageHandler";
import InVideoQuizQuestions from "../form/components/InVideoQuizQuestions";
import { useParams } from "react-router-dom";

export default function QuizComponent({
  InVideoQuiz,
  AddInVideoQuiz,
  setInVideoQuestions,
  setTime,
  isModuleEdit,
  targetmodule,
  setInVideoQuiz,
  triggerRerender,
}) {
  const sendRequest = useHttpRequest();

  const {id: edit_id, moduleId: module_id} = useParams()
  const [title, setTitle] = useState("");
  const [type, setType] = useState("quiz");
  const [isSave, setIsSave] = useState(false);
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: Array(4).fill(""),
      answer: "",
      explanation: "",
    },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: Array(4).fill(""),
        answer: "",
        explanation: "",
      },
    ]);

    if (InVideoQuiz) {
      setInVideoQuestions([
        ...questions,
        {
          question: "",
          options: Array(4).fill(""),
          answer: "",
          explanation: "",
        },
      ]);
    }
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;

    if (InVideoQuiz) {
      setInVideoQuestions(updatedQuestions);
    } else {
      setQuestions(updatedQuestions);
    }
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;

    if (InVideoQuiz) {
      setInVideoQuestions(updatedQuestions);
    } else {
      setQuestions(updatedQuestions);
    }
  };

  const handleOptionSelect = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer =
      updatedQuestions[index].options[optionIndex];

    if (InVideoQuiz) {
      setInVideoQuestions(updatedQuestions);
    } else {
      setQuestions(updatedQuestions);
    }
  };

  const handleExplanationChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].explanation = value;
    if (InVideoQuiz) {
      setInVideoQuestions(updatedQuestions);
    } else {
      setQuestions(updatedQuestions);
    }
  };

  const handleSave = async () => {
    try {
      const formData = {
        title,
        type: "quiz",
        quiz: { questions },
      };
      const headers =
        type === "quiz"
          ? {
              "Content-Type": "application/json",
            }
          : {};

      const data = await sendRequest(`/api/course/${edit_id}/module`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers,
      });
      if (data) {
        dispatchMessage("success", "Quiz module Saved");
        setIsSave(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateQuiz = async () => {
    try {
      const formData = {
        title,
        type: "quiz",
        quiz: { questions },
      };
      const headers =
        type === "quiz"
          ? {
              "Content-Type": "application/json",
            }
          : {};

      const data = await sendRequest(`/api/course/${edit_id}/module/${module_id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers,
      });
      if (data) {
        dispatchMessage("success", "Quiz module Updated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PekanuTheme>
      <div>
        {!InVideoQuiz && (
          <>
            <Stack
              direction="column"
              spacing={3}
              sx={{
                display: "flex",
                width: "500px",
                paddingBottom: "40px",
                paddingTop: "10px",
              }}
            >
              {isModuleEdit ? (
                <TextField
                  variant="standard"
                  label="Quiz title"
                  defaultValue={targetmodule.title}
                  disabled
                />
              ) : (
                <TextField
                  label="Quiz title"
                  variant="standard"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              )}
            </Stack>
            <div className="pb-5">
              <Divider variant="horizontal" sx={{ width: "650px" }} />
            </div>
          </>
        )}
        {isModuleEdit ? (
          <>
            {/* edit */}
            {/* {targetmodule.quiz?.questions.map((question, index) => (
              <QuizQuestion
                key={index}
                index={index}
                question={question}
                isModuleEdit={isModuleEdit}
                handleQuestionChange={handleQuestionChange}
                handleOptionSelect={handleOptionSelect}
                handleOptionChange={handleOptionChange}
                handleExplanationChange={handleExplanationChange}
              />
            ))} */}
            <InVideoQuizQuestions
                isOGQuiz={true}
                InQuizVideoData={[
                  targetmodule.quiz
                ]}
              />
          </>
        ) : (
          <>
            {" "}
            {InVideoQuiz && (
              <div>
                <div className="pb-4">
                  <span className="font-bold">Timestamp : </span>
                </div>
                <TimeInput setTime={setTime} />
              </div>
            )}
            {questions.map((question, index) => (
              <QuizQuestion
                key={index}
                index={index}
                question={question}
                handleQuestionChange={handleQuestionChange}
                handleOptionSelect={handleOptionSelect}
                handleOptionChange={handleOptionChange}
                handleExplanationChange={handleExplanationChange}
              />
            ))}
          </>
        )}
        {!isSave && (
          <Stack spacing={50} direction="row">
            {!isModuleEdit && (
              <Button variant="contained" onClick={handleAddQuestion}>
                Add Question
              </Button>
            )}
            {!isModuleEdit && (
              <Button
                variant="contained"
                onClick={() => {
                  if (InVideoQuiz) {
                    AddInVideoQuiz();
                  } else {
                    handleSave();
                  }
                  setInVideoQuiz(false);
                }}
              >
                <span> Save Quiz</span>
              </Button>
            )}
          </Stack>
        )}
      </div>
    </PekanuTheme>
  );
}
