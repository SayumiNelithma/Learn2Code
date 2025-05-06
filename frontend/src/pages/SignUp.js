import { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { useAuth } from "../auth/AuthContext";

export default function SignUp() {
    const [formData, setFormData] = useState({
      fullName: "",
      email: "",
      password: "",
      type: "", // 👈 new
    });
    
    const [profileImage, setProfileImage] = useState(null);
    const [preview, setPreview] = useState(null);
  
    const { fullName, email, password } = formData;
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleChange = (e) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfileImage(file);
        setPreview(URL.createObjectURL(file));
      }
    };
  
    const handleSubmit = async () => {
      if (!fullName || !email || !password) {
        toast.error("Please fill in all fields");
        return;
      }
  
      try {
        const formDataToSend = new FormData();
        formDataToSend.append("username", fullName);
        formDataToSend.append("email", email);
        formDataToSend.append("password", password);
        formDataToSend.append("type", formData.type);
        if (profileImage) {
          formDataToSend.append("file", profileImage);
        }
  
        const res = await axios.post("/auth/signup-with-image", formDataToSend);
        login(res.data.token);
        toast.success("Account created!");
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Sign up failed");
      }
    };
  