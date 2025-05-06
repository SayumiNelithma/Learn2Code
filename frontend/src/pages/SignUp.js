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