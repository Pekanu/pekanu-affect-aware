import React, { useState, useEffect } from "react";
import { Stack, Button, Typography, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import QuizComponent from "../form/QuizComponent";
import PekanuTheme from "../../../../store/Theme";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useHttpRequest } from "../../../../hooks/httpClient";
import dispatchMessage from "../../../../hooks/messageHandler";
import InVideoQuizQuestions from "../form/components/InVideoQuizQuestions";
import AdminVideoPlayer from "./component/AdminVideoPlayer";
import Loader from "../../../../components/utils/Loader";

import { useParams } from "react-router-dom";

export default function VideoForm(props) {
  const [targetmodule, setTargetModule] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [videotitle, setVideoTitle] = useState("");
  const [videodescription, setVideoDescription] = useState("");
  const [isSave, setisSave] = useState(false);
  const [InVideoQuiz, setInVideoQuiz] = useState(false);
  const [time, setTime] = useState("");
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const sendRequest = useHttpRequest();
  const [rerender, setRerender] = useState(false);
  const [InVideoquestions, setInVideoQuestions] = useState([
    {
      question: "",
      options: Array(4).fill(""),
      answer: "",
      explanation: "",
    },
  ]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const {
    id:edit_id,
    moduleId: module_id,
  } = useParams()

  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };
  useEffect(() => {
    const getModuleById = async () => {
      try {
        const data = await sendRequest(`/api/course/${edit_id}`, {
          method: "GET",
        });

        const targetModule = data.data.course.modules.find(
          (module) => module._id === module_id
        );
        setTargetModule(targetModule);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getModuleById();
  }, [edit_id, module_id, rerender]);

  const VideoFormHandler = async () => {
    var formData = new FormData();
    formData.append("title", videotitle);
    formData.append("description", videodescription);
    formData.append("module", selectedFile);
    formData.append("type", "video");

    try {
      const data = await sendRequest(`/api/course/${edit_id}/module`, {
        method: "POST",
        body: formData,
        headers: {},
      });

      const foundModule = data.data.modules.find(
        (module) => module.title === videotitle && module.type === "video"
      );

      if (foundModule) {
        console.log("Found module:", foundModule._id);
      } else {
        console.log(
          "Module with title",
          videotitle,
          "and module type 'video' not found"
        );
      }

      setisSave(true);
      if (data) {
        dispatchMessage("success", "video saved");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateVideoForm = async () => {
    var formData = new FormData();
    if (videotitle) {
      formData.append("title", videotitle);
    }
    if (videodescription) {
      formData.append("description", videodescription);
    }
    if (selectedFile) {
      formData.append("module", selectedFile);
    }

    formData.append("type", "video");

    try {
      const data = await sendRequest(
        `/api/course/${edit_id}/module/${targetmodule._id}`,
        {
          method: "PUT",
          body: formData,
          headers: {},
        }
      );

      if (data) {
        dispatchMessage("success", "video form updated");
        triggerRerender();
        setSelectedFile("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AddInVideoQuiz = async () => {
    
    console.log(JSON.stringify({ time, questions: InVideoquestions }));
    try {
      const data = await sendRequest(
        `/api/course/${edit_id}/module/${module_id}/quiz`,
        {
          method: "POST",
          body: JSON.stringify({ time, questions: InVideoquestions }),
        }
      );

      if (data) {
        dispatchMessage("success", "quiz added");
        triggerRerender();
      }
    } catch (err) {
      console.log(err);
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
      <div>
        <Typography
          variant="h5"
          sx={{ paddingTop: "10px", paddingBottom: "10px" }}
          component="div"
        >
          <span className="font-bold">Video</span>
        </Typography>
        <Stack sx={{ display: "flex", width: "600px" }} spacing={4}>
          {props.isModuleEdit ? (
            <>
              {" "}
              <TextField
                disabled={isSave ? true : false}
                multiline
                label="Video title"
                maxRows={4}
                variant="standard"
                defaultValue={targetmodule.title}
                onChange={(e) => {
                  setVideoTitle(e.target.value);
                  setShowButton(true);
                }}
              />
              <TextField
                disabled={isSave ? true : false}
                id="standard-multiline-flexible"
                multiline
                label="Description"
                maxRows={4}
                variant="standard"
                defaultValue={targetmodule.description}
                onChange={(e) => {
                  setVideoDescription(e.target.value);
                  setShowButton(true);
                }}
              />
            </>
          ) : (
            <>
              {" "}
              <TextField
                disabled={isSave ? true : false}
                label="Video title"
                variant="standard"
                onChange={(e) => {
                  setVideoTitle(e.target.value);
                }}
              />
              <TextField
                disabled={isSave ? true : false}
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                onChange={(e) => {
                  setVideoDescription(e.target.value);
                }}
              />
            </>
          )}

          <div>
            <input
              type="file"
              accept="video/*"
              id="videoUpload"
              style={{ display: "none" }}
              disabled={isSave ? true : false}
              onChange={handleFileChange}
            />

            {selectedFile ? (
              <>
                {" "}
                {!isSave && (
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => {
                      setSelectedFile("");
                      if (props.isModuleEdit) {
                        setShowButton(false);
                      }
                    }}
                  >
                    Clear
                  </Button>
                )}
              </>
            ) : (
              <>
                {" "}
                <label htmlFor="videoUpload">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    onClick={() => {
                      if (props.isModuleEdit) {
                        setShowButton(true);
                      }
                    }}
                  >
                    {props.isModuleEdit ? (
                      <span>Change Video</span>
                    ) : (
                      <span>Upload Video</span>
                    )}
                  </Button>
                </label>
              </>
            )}
          </div>

          {selectedFile && (
            <Typography variant="h5" color="textSecondary">
              Selected file: {selectedFile.name}
            </Typography>
          )}
          {props.isModuleEdit && (
            <>
              {" "}
              <div>Earlier uploaded video</div>
              <AdminVideoPlayer
                link={
                  import.meta.env.VITE_SERVER_ENDPOINT +
                  `/${targetmodule.videoUrl}`
                }
              />
            </>
          )}

          {isSave ? (
            <div></div>
          ) : (
            <Stack
              sx={{
                display: "flex",
                alignItems: "flex-end",
                width: "640px",
                paddingTop: "20px",
              }}
            >
              {props.isModuleEdit ? (
                <Button
                  disabled={showButton ? false : true}
                  variant="contained"
                  onClick={() => {
                    UpdateVideoForm();
                  }}
                >
                  update
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    VideoFormHandler();
                  }}
                >
                  Save
                </Button>
              )}
            </Stack>
          )}

          <Divider variant="horizontal" sx={{ width: "630px" }} />
        </Stack>

        <div className="pt-7">
          {!props.isModuleEdit ? (
            isSave && (
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setInVideoQuiz(true);
                  }}
                >
                  Add Quiz
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    setInVideoQuiz(false);
                  }}
                >
                  Clear
                </Button>
              </Stack>
            )
          ) : (
            <>
              <InVideoQuizQuestions
                InQuizVideoData={targetmodule.quizzes}
                module_id={targetmodule._id}
                triggerRerender={triggerRerender}
              />
            </>
          )}

          {props.isModuleEdit && (
            <>
              <div className="pt-10"></div>{" "}
              <Stack direction="row" spacing={3}>
                <Button
                  variant="contained"
                  onClick={() => {
                    setInVideoQuiz(true);
                  }}
                >
                  Add Quiz
                </Button>

                <Button
                  variant="contained"
                  onClick={() => {
                    setInVideoQuiz(false);
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </>
          )}

          {InVideoQuiz && (
            <div className="pt-6">
              <QuizComponent
                InVideoQuiz={InVideoQuiz}
                AddInVideoQuiz={AddInVideoQuiz}
                setInVideoQuestions={setInVideoQuestions}
                setTime={setTime}
                setInVideoQuiz={setInVideoQuiz}
                triggerRerender={triggerRerender}
              />{" "}
            </div>
          )}
        </div>

        <div className="pt-8">
          {!props.isModuleEdit && (
            <Divider variant="horizontal" sx={{ width: "630px" }} />
          )}
        </div>
      </div>
    </PekanuTheme>
  );
}
