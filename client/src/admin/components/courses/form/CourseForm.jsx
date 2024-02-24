import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Divider } from "@mui/material";
import { useHttpRequest } from "../../../../hooks/httpClient";
import { useNavigate } from "react-router-dom";

import PekanuTheme from "../../../../store/Theme";

import LeftForm from "./leftForm";
import dispatchMessage from "../../../../hooks/messageHandler";

export default function CourseForm({}) {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [learnings, setLearnings] = useState("");
  const [coursedata, setCourseData] = useState({});

  const navigate = useNavigate();
  const sendRequest = useHttpRequest();

  const setCourseTitle = (e) => {
    setTitle(e.target.value);
  };
  const Description = (e) => {
    setDescription(e.target.value);
  };
  const HandleImageChange = (file) => {
    setThumbnail(file);
  };
  const Learnings = (e) => {
    setLearnings(e.target.value);
  };

  const createCourse = async () => {
    var formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("learnings", learnings);
    formData.append("thumbnail", thumbnail);

    try {
      const data = await sendRequest("/api/course", {
        method: "POST",
        body: formData,
        headers: {},
      });

      setCourseData(data.data);
      const courseId = data.data?._id;
      if (courseId) {
        navigate(`/admin`);
        dispatchMessage("success", "course created successfully");
      } else if (!courseId) {
        console.error(
          "Course ID is undefined or missing fields or length of field is less than required"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PekanuTheme>
      <Box sx={{ flexGrow: 1 }}>
        <Container
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Divider orientation="vertical" flexItem />
          <LeftForm
            Description={Description}
            setCourseTitle={setCourseTitle}
            Learnings={Learnings}
            createCourse={createCourse}
            HandleImageChange={HandleImageChange}
            thumbnail={thumbnail}
          />
        </Container>
      </Box>
    </PekanuTheme>
  );
}
