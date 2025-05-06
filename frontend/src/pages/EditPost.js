import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Stack,
  IconButton,
} from "@mui/material";
import { toast } from "react-toastify";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Leftsidebar from "../components/homepage/Leftsidebar";

export default function EditPost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({
      title: "",
      description: "",
      mediaPaths: [],
    });
    const [files, setFiles] = useState([]);
    const BASE_URL = "http://localhost:9090";
  
    useEffect(() => {
      axios
        .get(`/posts/${id}`)
        .then((res) => setPost(res.data))
        .catch(() => {
          toast.error("Failed to load post");
          navigate("/profile");
        });
    }, [id, navigate]);
  
    const handleUpdate = async () => {
      if (!post.title || !post.description) {
        toast.error("Title and description are required.");
        return;
      }
  
      const formData = new FormData();
      formData.append("title", post.title);
      formData.append("description", post.description);
      for (let file of files) {
        formData.append("files", file);
      }
  
      try {
        await axios.put(`/posts/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Post updated!");
        navigate("/profile");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to update post");
      }
    };
  
    const handleFileChange = (e) => {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    };
  
    const handleRemoveFile = (index) => {
      const updated = [...files];
      updated.splice(index, 1);
      setFiles(updated);
    };
  
    const handleDrop = useCallback((e) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files);
      setFiles((prev) => [...prev, ...droppedFiles]);
    }, []);
  
    const handleDragOver = (e) => e.preventDefault();