import React, { useState, useEffect } from "react";

import { Stack, Button, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useNavigate } from "react-router-dom";
import { useHttpRequest } from "../../../../hooks/httpClient";
import PdfViewer from "./component/PdfViewer";
import dispatchMessage from "../../../../hooks/messageHandler";
import Loader from "../../../../components/utils/Loader";

import { useParams } from "react-router-dom";

export default function NotesForm({ setModule, isModuleEdit }) {
  const [numPages, setNumPages] = useState(null);
  const [targetmodule, setTargetModule] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notestitle, setNotestitle] = useState(() =>
    !isModuleEdit ? "" : targetmodule.title
  );
  const {
    id:edit_id,
    moduleId: module_id,
  } = useParams()

  const navigate = useNavigate();
  const sendRequest = useHttpRequest();
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const NotesTitle = (e) => {
    setNotestitle(e.target.value);
    setShowButton(true);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
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
  }, [edit_id, module_id]);

  const AddNotesModule = async () => {
    var formData = new FormData();
    formData.append("title", notestitle);
    formData.append("module", selectedFile);
    formData.append("type", "notes");

    try {
      const data = await sendRequest(`/api/course/${edit_id}/module`, {
        method: "POST",
        body: formData,
        headers: {},
      });

      setModule("");

      dispatchMessage("success", "Notes module added");
      navigate(`/admin/course/edit/${edit_id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const UpdateNotesModule = async () => {
    var formData = new FormData();
    if (notestitle) {
      formData.append("title", notestitle);
    }
    if (selectedFile) {
      formData.append("module", selectedFile);
    }

    formData.append("type", "notes");
    try {
      const data = await sendRequest(
        `/api/course/${edit_id}/module/${module_id}`,
        {
          method: "PUT",
          body: formData,
          headers: {},
        }
      );

      if (data) {
        dispatchMessage("success", "Notes module updated");
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
    <div>
      <Typography
        variant="h5"
        sx={{ paddingTop: "10px", paddingBottom: "10px" }}
        component="div"
      >
        <span className="font-bold">Notes</span>
      </Typography>
      <Stack sx={{ display: "flex", width: "600px" }} spacing={4}>
        {isModuleEdit ? (
          <TextField
            variant="standard"
            TextField
            label="Notes title"
            multiline
            maxRows={4}
            defaultValue={targetmodule.title}
            onChange={(e) => NotesTitle(e)}
          />
        ) : (
          <TextField
            label="Notes title"
            variant="standard"
            onChange={(e) => NotesTitle(e)}
          />
        )}

        <Stack direction="row">
          <input
            type="file"
            accept=".pdf"
            id="pdfUpload"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="pdfUpload">
            {!selectedFile && (
              <Button
                variant="contained"
                component="span"
                startIcon={<CloudUploadIcon />}
                onClick={() => {
                  if (isModuleEdit) {
                    setShowButton(true);
                  }
                }}
              >
                {isModuleEdit ? (
                  <span>Update Notes</span>
                ) : (
                  <span> Upload Notes</span>
                )}
              </Button>
            )}
          </label>
          {selectedFile && (
            <Button
              variant="contained"
              onClick={() => {
                setSelectedFile("");
              }}
            >
              Clear
            </Button>
          )}
        </Stack>

        {selectedFile && (
          <Typography variant="caption" color="textSecondary">
            Selected file: {selectedFile.name}
          </Typography>
        )}

        {isModuleEdit && !selectedFile && (
          <div>
            <div>Earlier uploaded Notes</div>
            <PdfViewer
              notesUrl={
                import.meta.env.VITE_SERVER_ENDPOINT +
                `/${targetmodule.notesUrl}`
              }
            />
          </div>
        )}

        {!isModuleEdit && (
          <Stack
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "640px",
              paddingTop: "20px",
            }}
          >
            <Button
              variant="contained"
              onClick={() => {
                AddNotesModule();
              }}
            >
              Submit
            </Button>
          </Stack>
        )}

        {isModuleEdit && (
          <Stack
            sx={{
              display: "flex",
              alignItems: "flex-end",
              width: "640px",
              paddingTop: "20px",
            }}
          >
            <Button
              variant="contained"
              disabled={showButton ? false : true}
              onClick={() => {
                UpdateNotesModule();
              }}
            >
              Update
            </Button>
          </Stack>
        )}
      </Stack>
    </div>
  );
}
