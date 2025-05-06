import { useState } from "react";
import { Grid, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "../api/axiosConfig";
import { useAuth } from "../auth/AuthContext";