import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  IconButton,
  Stack,
  Modal,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useHttpRequest } from "../../../../../hooks/httpClient";
import dispatchMessage from "../../../../../hooks/messageHandler";

import { useParams } from "react-router-dom";

export default function InVideoQuizQuestions({
  InQuizVideoData,
  module_id,
  triggerRerender,
  isOGQuiz
}) {
  const course_id = useParams().id
  const sendRequest = useHttpRequest();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);

  const handleDeleteConfirmation = async () => {
    if (quizToDelete) {
      try {
        const data = await sendRequest(
          `/api/course/${course_id}/module/${module_id}/quiz/${quizToDelete}`,
          {
            method: "DELETE",
            headers: {},
          }
        );
        if (data) {
          triggerRerender();
          dispatchMessage("success", "in video quiz deleted");
        }
      } catch (err) {
        console.log(err);
      }
    }
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleDeleteClick = (quiz_id) => {
    setQuizToDelete(quiz_id);
    setDeleteModalOpen(true);
  };

  return (
    <div>
      {InQuizVideoData?.length === null || InQuizVideoData?.length === 0 ? (
        <div>Quizzes not found</div>
      ) : (
        InQuizVideoData?.map((quiz, index) => (
          <Card
            key={index}
            style={{ marginBottom: "10px", padding: "30px", width: "635px" }}
          >
            {!isOGQuiz && (<Stack direction="row" spacing={52}>
              <Typography variant="h4" className="font-extrabold">
                Quiz : {index + 1}
              </Typography>{" "}
              <IconButton
                aria-label="delete"
                onClick={() => {
                  handleDeleteClick(quiz._id);
                }}
              >
                <DeleteIcon sx={{ color: "black" }} />
              </IconButton>
            </Stack>
)}
            
            {!isOGQuiz && (<Typography variant="h6" gutterBottom>
              Timestamp: {quiz.time}
            </Typography>)}
            {quiz.questions?.map((question, qIndex) => (
              <div key={question._id}>
                <Typography variant="body1" gutterBottom>
                  <span className="font-bold">Question {qIndex + 1}</span>:{" "}
                  {question?.question}
                </Typography>
                <List>
                  {question.options?.map((option, oIndex) => (
                    <ListItem key={oIndex}>
                      <ListItemText
                        primary={
                          <span className="font-bold">
                            {oIndex + 1} . {option}
                          </span>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
                <Typography variant="body2" gutterBottom>
                  <span className="font-bold">Answer</span>: {question?.answer}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <span className="font-bold">Explanation</span>:{" "}
                  {question?.explanation}
                </Typography>
                {qIndex !== quiz.questions?.length - 1 && <Divider />}
              </div>
            ))}
          </Card>
        ))
      )}

      <Modal
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-confirmation-modal"
        aria-describedby="delete-confirmation-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 380,
            borderRadius: 8,
            textAlign: "center",
            pointerEvents: "auto",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction="column"
            spacing={2}
          >
            <Typography variant="h6">
              Are you sure you want to delete this quiz?
            </Typography>
            <Stack direction="row" spacing={3}>
              {" "}
              <Button variant="contained" onClick={handleDeleteConfirmation}>
                Yes
              </Button>
              <Button variant="contained" onClick={handleDeleteCancel}>
                No
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Modal>
    </div>
  );
}
