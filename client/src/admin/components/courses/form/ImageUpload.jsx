import React, { useState } from "react";
import { Button, Input, Stack } from "@mui/material";

export default function ImageUpload({
  HandleImageChange,
  isEdit,
  thumbnail,
  key,
  setShowButton,
}) {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <Stack direction="column">
      {!selectedImage && (
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setSelectedImage(e.target.files[0]);
              HandleImageChange(e.target.files[0]);
            }}
            style={{ display: "none" }}
            id="image-input"
          />
          <label htmlFor="image-input">
            <Button
              variant="contained"
              sx={{ width: "200px", height: "30px" }}
              component="span"
            >
              {isEdit ? (
                <span>Change Thumbnail</span>
              ) : (
                <span> Add Thumbnail</span>
              )}
            </Button>
          </label>
        </div>
      )}

      {selectedImage && (
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: "30px", height: "30px" }}
          onClick={() => {
            setSelectedImage(null);
            if (isEdit) {
              setShowButton(false);
            }
          }}
        >
          Clear
        </Button>
      )}
      {selectedImage && (
        <div>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              marginTop: "10px",
            }}
          />
        </div>
      )}

      {!selectedImage && isEdit && (
        <div>
          <img
            src={import.meta.env.VITE_SERVER_ENDPOINT + `/${thumbnail}`}
            alt="Selected preview"
            style={{
              maxWidth: "100%",
              maxHeight: "200px",
              marginTop: "10px",
            }}
          />
        </div>
      )}
    </Stack>
  );
}
