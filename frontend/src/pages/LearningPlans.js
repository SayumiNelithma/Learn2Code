import { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Avatar,
  Divider,
  Chip,
  LinearProgress,
  Paper,
  Tooltip
} from '@mui/material';
import Leftsidebar from "../components/homepage/Leftsidebar";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LinkIcon from '@mui/icons-material/Link';
import PersonIcon from '@mui/icons-material/Person';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
