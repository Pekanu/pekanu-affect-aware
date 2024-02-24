import React, { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";

import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Content from "../components/player/Content";
import Bot from "../components/bot/Frame";
import Camera from "../utils/Camera";

import { BotProvider } from "../store/Bot";
import { useHttpRequest } from "../hooks/httpClient";

import { useParams } from "react-router-dom";

import Loader from "../components/utils/Loader";

export default function CoursePlayer() {
  const course_id = useParams().id
  const [showBot, setShowBot] = useState(true);
  const [open] = useOutletContext();
  const [cameraAccess, setCameraAccess] = useState(false);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const sendRequest = useHttpRequest();

  const getCourseById = useCallback(async () => {
    try {
      const data = await sendRequest(`/api/user/course/${course_id}`, {
        method: "GET",
      });

      setCourseData(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getCourseById();
  }, [course_id]);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(() => setCameraAccess(true))
      .catch(() => setCameraAccess(false));
  }, []);

  if (loading) {
    return (
      <div>
        <Loader height="600px" />
      </div>
    );
  }

  return (
    <BotProvider>
      {!loading && (
        <>
          {" "}
          <Stack direction="row" style={{ justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                borderRadius: "6px",
                height: "550px",
                width: open ? "100%" : "75%",
                paddingLeft: "10px",
              }}
            >
              <Content courseData={courseData} setShowBot={setShowBot} />
            </Box>
            <Divider
              style={{ width: "10px" }}
              orientation="vertical"
              flexItem
            />
            {!open && (
              <Box
                sx={{
                  display: "flex",
                  height: "650px",
                  width: "25%",
                  border: "0px 1px 0px 0px solid",
                  justifyContent: "center",
                }}
              >
                {cameraAccess
                  ? showBot && <Bot />
                  : "Camera access not granted"}
              </Box>
            )}
          </Stack>
          {showBot && !open && cameraAccess && <Camera />}
        </>
      )}
    </BotProvider>
  );
}
