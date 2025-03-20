import { Box, Button, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";
import "./ImageUpload.css";
import UseNetworkCalls from "../hooks/networkCalls/UseNetworkCalls";

interface ImageUploadProps {
  onUploadSuccess: (imageUrl: string) => void;
  initialImageUrl?: string; // Optional initial image URL for updates
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onUploadSuccess,
  initialImageUrl,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(
    initialImageUrl || null
  );
  const { uploadImage } = UseNetworkCalls();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };
  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const imageUrl = await uploadImage(selectedFile);
      setUploadedUrl(imageUrl as string);
      onUploadSuccess(imageUrl as string);
      setSelectedFile(null); // Clear selected file after successful upload
    } catch (error) {
      setUploadedUrl(null);
      onUploadSuccess(""); // Clear image URL on error
      setSelectedFile(null);
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Box
      className="image-upload-container"
      display={"flex"}
      flexDirection={"column"}
      alignContent={"left"}
    >
      {selectedFile && (
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography className="upload-text">Ready to upload?</Typography>
          <Button
            variant="contained"
            size="small"
            className="upload-text"
            onClick={handleUpload}
            sx={{
              ml: 2,
              borderColor: "#13121D", // Outline color changed to red
              color: "red", // Text color changed to red for consistency
              "&:hover": {
                backgroundColor: "#13121D", // Slightly darker for hover effect
                borderColor: "darkred", // Darker red on hover
              },
            }}
          >
            Click to upload
          </Button>
        </Box>
      )}

      {!selectedFile && !uploadedUrl && (
        <Box>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden-input"
            onChange={handleFileChange}
            title="Select an image file to upload"
          />
          <label htmlFor="file-upload">
            <IconButton component="span" className="upload-button">
              <AddIcon fontSize="large" />
            </IconButton>
          </label>
        </Box>
      )}

      {uploadedUrl && (
        <Box>
          <img
            src={uploadedUrl}
            alt="Uploaded Image"
            className="image-preview"
          />
          <Box>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden-input"
              onChange={handleFileChange}
              title="Select an image file to update"
            />
            <label htmlFor="file-upload">
              <Button
                component="span"
                variant="outlined"
                size="small"
                sx={{
                  borderColor: "#13121D", // Outline color changed to red
                  color: "#191725", // Text color changed to red for consistency
                  "&:hover": {
                    // backgroundColor: "#13121D", // Slightly darker for hover effect
                    borderColor: "darkred", // Darker red on hover
                  },
                }}
              >
                Update Image
              </Button>
            </label>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ImageUpload;
