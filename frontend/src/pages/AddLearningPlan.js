import { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Box,
  Grid,
  Divider
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import LinkIcon from '@mui/icons-material/Link';
import AssignmentIcon from '@mui/icons-material/Assignment';
import axios from '../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function AddLearningPlan() {
    const [form, setForm] = useState({
      title: '',
      topics: '',
      resources: '',
      targetDate: '',
      progress: 'Not Started'
    });
  
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const today = new Date().toISOString().split('T')[0];
    
        if (!form.title || !form.topics || !form.resources || !form.targetDate) {
          toast.error('Please fill out all fields');
          return;
        }
    
        if (form.targetDate < today) {
          toast.error('Target date cannot be in the past.');
          return;
        }
    
    
  
  