import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  IconButton,
  Stack,
  LinearProgress,
} from "@mui/material";
import axios from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { toast } from "react-toastify";

export default function AddPost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!title || !description || files.length === 0) {
          toast.error("All fields and at least one image are required.");
          return;
        }
    
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        files.forEach((file) => formData.append("files", file));
    
        try {
          await axios.post("/posts", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          toast.success("Post created!");
          navigate("/profile");
        } catch (err) {
          toast.error(err.response?.data?.message || "Post upload failed");
        } finally {
          setIsSubmitting(false);
        }
      };
    
      const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles([...files, ...selectedFiles]);
      };
    
      const handleRemoveFile = (index) => {
        const updated = [...files];
        updated.splice(index, 1);
        setFiles(updated);
      };