import React, { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { Divider, Button } from "@mui/material";

import TextField from "@mui/material/TextField";
import ImageUpload from "./ImageUpload";
import { useHttpRequest } from "../../../../hooks/httpClient";
import dispatchMessage from "../../../../hooks/messageHandler";
import Loader from "../../../../components/utils/Loader";

import {useParams} from "react-router-dom";

export default function LeftForm({
  createCourse,
  HandleImageChange,
  setCourseTitle,
  Description,
  Learnings,
  isEdit,
}) {

  const { id } = useParams();
  const sendRequest = useHttpRequest();
  const [showButton, setShowButton] = useState(false);
  const [courseinfo, setCourseInfo] = useState({});

  const [updatetitle, setupdateTitle] = React.useState(
    isEdit ? courseinfo.title : ""
  );
  const [updatedescription, setupdateDescription] = React.useState(
    isEdit ? courseinfo.description : ""
  );
  const [updatethumbnail, setupdateThumbnail] = useState("");
  const [updatelearnings, setupdateLearnings] = useState(
    isEdit ? courseinfo.learnings : ""
  );

  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(isEdit ? true : false);

  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const data = await sendRequest(`/api/course/${id}`, {
          method: "GET",
        });

        setCourseInfo(data.data.course);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCourseById();
  }, [id, rerender]);

  const UpdateCourseTitle = (e) => {
    setupdateTitle(e.target.value);
    setShowButton(true);
  };
  const UpdateDescription = (e) => {
    setupdateDescription(e.target.value);
    setShowButton(true);
  };
  const UpdateHandleImageChange = (file) => {
    setupdateThumbnail(file);
    setShowButton(true);
  };
  const UpdateLearnings = (e) => {
    setupdateLearnings(e.target.value);
    setShowButton(true);
  };

  const updateCourse = async () => {
    var formData = new FormData();
    if (updatetitle) {
      formData.append("title", updatetitle);
    }
    if (updatedescription) {
      formData.append("description", updatedescription);
    }
    if (updatelearnings) {
      formData.append("learnings", updatelearnings);
    }
    if (updatethumbnail) {
      formData.append("thumbnail", updatethumbnail);
    }

    try {
      const data = await sendRequest(`/api/course/${id}`, {
        method: "PUT",
        body: formData,
        headers: {},
      });

      if (data) {
        dispatchMessage("success", "course updated successfull");
        setShowButton(false);
        triggerRerender();
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div>
        <Box
          sx={{
            display: "flex",
            borderRadius: "6px",
            height: "620px",
            width: "500px",
            overflow: "hidden",
            justifyContent: "center",
            overflowY: "scroll",
          }}
        >
          {" "}
          <Loader height="600px" />
        </Box>
      </div>
    );
  }
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          borderRadius: "6px",
          height: "620px",
          width: "500px",
          overflow: "hidden",
          justifyContent: "center",
          overflowY: "scroll",
        }}
      >
        <Stack
          direction="column"
          spacing={3}
          className="pt-4"
          sx={{ display: "flex", width: "400px" }}
        >
          {" "}
          <div className="pt-3">
            <Typography variant="h4" component="div">
              <span className="font-bold">Course Info</span>
            </Typography>
          </div>
          <Divider sx={{ padding: "0px" }} />
          {isEdit ? (
            <>
              {" "}
              <TextField
                label="Course title"
                variant="standard"
                multiline
                maxRows={4}
                defaultValue={courseinfo.title}
                onChange={(e) => UpdateCourseTitle(e)}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                defaultValue={courseinfo.description}
                onChange={(e) => UpdateDescription(e)}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Learnings"
                multiline
                maxRows={4}
                variant="standard"
                defaultValue={courseinfo.learnings}
                onChange={(e) => UpdateLearnings(e)}
              />
              <ImageUpload
                key={rerender}
                isEdit={isEdit}
                setShowButton={setShowButton}
                thumbnail={courseinfo.thumbnail}
                HandleImageChange={UpdateHandleImageChange}
              />
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: "40px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ height: "30px" }}
                  onClick={updateCourse}
                  disabled={showButton ? false : true}
                >
                  Update
                </Button>
              </Stack>
            </>
          ) : (
            <>
              {" "}
              <TextField
                label="Course title"
                variant="standard"
                multiline
                maxRows={4}
                onChange={(e) => setCourseTitle(e)}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                variant="standard"
                onChange={(e) => Description(e)}
              />
              <TextField
                id="standard-multiline-flexible"
                label="Learnings"
                multiline
                maxRows={4}
                variant="standard"
                onChange={(e) => Learnings(e)}
              />
              <ImageUpload HandleImageChange={HandleImageChange} />
              <Stack
                direction="row"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: "40px",
                }}
              >
                <Button
                  variant="contained"
                  sx={{ height: "30px" }}
                  onClick={createCourse}
                >
                  Create
                </Button>
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </div>
  );
}
