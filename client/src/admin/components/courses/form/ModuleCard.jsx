import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import { useHttpRequest } from "../../../../hooks/httpClient";
import ModuleDeleteModal from "./components/ModuleDeleteModal";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";

export default function ModuleCard({
  moduleType,
  moduleTitle,
  setselectModule,
  module_id,
  getModuleById,
  triggerRerender,
}) {
  const edit_id = useParams().id 
  const sendRequest = useHttpRequest();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletetitle, setDeleteTitle] = useState("");
  const navigate = useNavigate();

  const handleDeleteModalOpen = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
  };

  const getCourseById = async () => {
    try {
      const data = await sendRequest(`/api/course/${edit_id}`, {
        method: "GET",
      });

      const modulesArray = data.data.course.modules;

      const foundModule = modulesArray.find(
        (module) => module._id === module_id
      );
      setDeleteTitle(foundModule.title);
    } catch (err) {
      console.log(err);
    }
  };

  const moduleStyles = {
    quiz: {
      backgroundColor: "#ffddd2",
    },
    video: {
      backgroundColor: "#c7f9cc",
    },
    notes: {
      backgroundColor: "#edf6f9",
    },
  };

  const moduleTypeStyle = moduleStyles[moduleType];

  return (
    <>
      <Card
        sx={{
          ...moduleTypeStyle,
          transition: "box-shadow 0.3s, opacity 0.3s",
          "&:hover": {
            boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.2)",
            opacity: 0.8,
          },
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontWeight: "semi-bold" }}
            variant="h5"
            component="div"
          >
            Title: {moduleTitle}
          </Typography>
          <Typography
            sx={{ fontWeight: "semi-bold" }}
            variant="subtitle1"
            color="textSecondary"
          >
            {moduleType.charAt(0).toUpperCase() + moduleType.slice(1)}
          </Typography>

          <Stack
            direction="row"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div>
              <Tooltip title="Edit">
                <IconButton
                  sx={{ color: "black" }}
                  onClick={() => {
                    setselectModule(
                      moduleType.charAt(0).toUpperCase() + moduleType.slice(1)
                    );                    navigate(
                      `/admin/course/edit/${edit_id}/module/${module_id}`
                    );
                  }}
                >
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </div>
            <div>
              <Tooltip title="Delete">
                <IconButton sx={{ color: "black" }}>
                  <DeleteIcon
                    onClick={() => {
                      getCourseById();
                      setDeleteModalOpen(true);
                    }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </Stack>
        </CardContent>
      </Card>

      <ModuleDeleteModal
        open={deleteModalOpen}
        handleClose={handleDeleteModalClose}
        module_id={module_id}
        deletetitle={deletetitle}
        triggerRerender={triggerRerender}
      />
    </>
  );
}
