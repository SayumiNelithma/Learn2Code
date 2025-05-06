import { useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { useAuth } from "../auth/AuthContext";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
  
    const handleSubmit = async () => {
      if (!email || !password) {
        toast.error("Please fill in both email and password");
        return;
      }
  
      try {
        const res = await axios.post("/auth/signin", { email, password });
        login(res.data.token);
        toast.success("Login successful!");
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      }
    };