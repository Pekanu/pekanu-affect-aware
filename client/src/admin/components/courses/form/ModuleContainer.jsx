import React, { useEffect } from "react";
import ModuleCard from "./ModuleCard";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import QuizForm from "../modules/QuizForm";
import NotesForm from "../modules/NotesForm";
import VideoForm from "../modules/VideoForm";
import { useHttpRequest } from "../../../../hooks/httpClient";
import Loader from "../../../../components/utils/Loader";

import { useParams } from "react-router-dom";

export default function ModuleContainer({ selectmodule, setselectModule }) {
  const [targetmodule, setTargetModule] = useState("");
  const [moduleData, setModuleData] = useState([]);

  const isModuleEdit = true;
  const sendRequest = useHttpRequest();
  const edit_id = useParams().id 


  const [rerender, setRerender] = useState(false);
  const [loading, setLoading] = useState(true);

  const triggerRerender = () => {
    setRerender((prev) => !prev);
  };

  useEffect(() => {
    const getCourseById = async () => {
      try {
        const data = await sendRequest(`/api/course/${edit_id}`, {
          method: "GET",
        });

        setModuleData(data.data.course.modules);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getCourseById();
  }, [edit_id, rerender]);

  if (loading) {
    return (
      <div>
        <Loader height="600px" />
      </div>
    );
  }

  return (
    <>
      <Stack direction="column" spacing={3}>
        {" "}
        <div>
          {selectmodule === "" && (
            <Stack
              spacing={3}
              direction="column"
              sx={{
                display: "flex",
                width: "680px",
                justifyContent: "center",
                paddingTop: "20px",
              }}
            >
              {moduleData &&
                moduleData.map((module) => (
                  <ModuleCard
                    key={module._id}
                    module_id={module._id}
                    moduleType={module.type}
                    moduleTitle={module.title}
                    setselectModule={setselectModule}
                    triggerRerender={triggerRerender}
                  />
                ))}
            </Stack>
          )}
          {selectmodule === "Quiz" && (
            <div>
              <QuizForm
                setModule={setselectModule}
                isModuleEdit={isModuleEdit}
              />
            </div>
          )}
          {selectmodule === "Notes" && (
            <div>
              <NotesForm
                setModule={setselectModule}
                isModuleEdit={isModuleEdit}
              />
            </div>
          )}
          {selectmodule === "Video" && (
            <div>
              <VideoForm
                setModule={setselectModule}
                isModuleEdit={isModuleEdit}
              />
            </div>
          )}
        </div>
      </Stack>
    </>
  );
}
