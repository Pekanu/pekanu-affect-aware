import React, { useState, useEffect } from "react";
import QuizComponent from "../form/QuizComponent";
import { Divider, Typography } from "@mui/material";
import { useHttpRequest } from "../../../../hooks/httpClient";
import Loader from "../../../../components/utils/Loader";

import { useParams } from "react-router-dom";

const QuizForm = (props) => {
  const [targetmodule, setTargetModule] = useState("");
  const [loading, setLoading] = useState(true);
  const {
    id:edit_id,
    moduleId: module_id,
  } = useParams()

  const sendRequest = useHttpRequest();

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
  }, [edit_id, module_id]);

  if (loading) {
    return (
      <div>
        <Loader height="600px" />
      </div>
    );
  }

  return (
    <div>
      <Typography
        variant="h5"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
        component="div"
      >
        <span className="font-bold">Quiz</span>
      </Typography>
      <QuizComponent
        isModuleEdit={props.isModuleEdit}
        targetmodule={targetmodule}
        setModule={props.setModule}
      />

      <div className="pt-8">
        <Divider variant="horizontal" sx={{ width: "630px" }} />
      </div>
    </div>
  );
};

export default QuizForm;
