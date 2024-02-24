import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Divider, Button } from "@mui/material";
import DropDown from "./DropDown";
import QuizForm from "../modules/QuizForm";
import VideoForm from "../modules/VideoForm";
import NotesForm from "../modules/NotesForm";
import ModuleContainer from "./ModuleContainer";
import { useNavigate, useParams } from "react-router-dom";

export default function RightForm() {
  const navigate = useNavigate();
  const [module, setModule] = useState("");
  const [selectmodule, setselectModule] = useState("");
  const [forceRender, setForceRender] = useState(false);
  const edit_id = useParams().id 

  const handleBackButtonClick = () => {
    setselectModule("");
    setModule("");
    setForceRender((prevState) => !prevState);
    navigate(`/admin/course/edit/${edit_id}`);
  };

  return (
    <div>
      <Box
        sx={{
          borderRadius: "6px",
          height: "620px",
          width: "760px",
          overflowY: "scroll",
          padding: "15px",
        }}
      >
        <Stack
          direction="row"
          spacing={!selectmodule ? 35 : 57}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="pt-3">
            <Typography variant="h4" component="div">
              <span className="font-bold">Module</span>
            </Typography>
          </div>
          <div className="p-2 flex flex-row ">
            <Button
              variant="contained"
              sx={{ height: "40px", marginRight: "20px" }}
              onClick={handleBackButtonClick}
            >
              {selectmodule || module ? (
                <span>Back</span>
              ) : (
                <span>Refresh</span>
              )}
            </Button>
            <DropDown
              module={module}
              selectmodule={selectmodule}
              setModule={setModule}
            />
          </div>
        </Stack>
        <Divider sx={{ padding: "5px" }} />
        <Stack
          direction="column"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {module === "" && (
            <ModuleContainer
              key={forceRender}
              module={module}
              selectmodule={selectmodule}
              setselectModule={setselectModule}
            />
          )}
          {module === "Quiz" && (
            <div>
              <QuizForm setModule={setModule} />
            </div>
          )}
          {module === "Notes" && (
            <div>
              <NotesForm setModule={setModule} />
            </div>
          )}
          {module === "Video" && (
            <div>
              <VideoForm setModule={setModule} />
            </div>
          )}
        </Stack>
      </Box>
    </div>
  );
}
