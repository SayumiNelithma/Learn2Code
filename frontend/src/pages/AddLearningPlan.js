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
    
        try {
            await axios.post('/learning-plans', {
              ...form,
              topics: form.topics.split(',').map(t => t.trim()),
              resources: form.resources.split(',').map(r => r.trim())
            });
            toast.success('Learning plan created!');
            navigate('/my-learning-plans');
          } catch (err) {
            toast.error('Failed to add plan!');
          }
        };
      
        return (
          <Container maxWidth="md" sx={{ py: 6 }}>
            {/* Back Button */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 3,
              cursor: 'pointer',
              width: 'fit-content',
              color: '#2196f3',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => navigate('/my-learning-plans')}
          >
            <ArrowBackIcon sx={{ mr: 1 }} />
            <Typography variant="body1" fontWeight={500}>Back to Plans</Typography>
          </Box>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: "white",
                border: "1px solid #e0e0e0",
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <BookmarkAddIcon sx={{ fontSize: 32, mr: 2, color: '#2196f3' }} />
                <Typography variant="h5" fontWeight="bold" color="#2196f3">
                  Create Learning Plan
                </Typography>
              </Box>
      
              <Divider sx={{ mb: 4 }} />
      
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Plan Title"
                    fullWidth
                    variant="outlined"
                    placeholder="What do you want to learn?"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                  />
                </Grid>
      
                <Grid item xs={12}>
                  <TextField
                    label="Topics"
                    fullWidth
                    variant="outlined"
                    placeholder="Separate topics with commas (e.g., React, JavaScript, CSS)"
                    value={form.topics}
                    onChange={(e) => setForm({ ...form, topics: e.target.value })}
                  />
                </Grid>
      
                <Grid item xs={12}>
                  <TextField
                    label="Resources"
                    fullWidth
                    variant="outlined"
                    placeholder="Separate resources with commas (e.g., Udemy, YouTube, Book)"
                    multiline
                    rows={3}
                    value={form.resources}
                    onChange={(e) => setForm({ ...form, resources: e.target.value })}
                  />
                </Grid>
      
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Target Date"
                    fullWidth
                    type="date"
                    variant="outlined"
                    value={form.targetDate}
                    inputProps={{ min: new Date().toISOString().split('T')[0] }}
                    onChange={(e) => setForm({ ...form, targetDate: e.target.value })}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
      
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Progress</InputLabel>
                    <Select
                      value={form.progress}
                      label="Progress"
                      onChange={(e) => setForm({ ...form, progress: e.target.value })}
                    >
                      <MenuItem value="Not Started">Not Started</MenuItem>
                      <MenuItem value="In Progress">In Progress</MenuItem>
                      <MenuItem value="Completed">Completed</MenuItem>
                      <MenuItem value="On Hold">On Hold</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
      
              <Box mt={5} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  sx={{
                    bgcolor: '#2196f3',
                    '&:hover': {
                      bgcolor: '#1976d2',
                    },
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                    fontWeight: 'bold',
                    textTransform: 'none'
                  }}
                >
                  Create Plan
                </Button>
              </Box>
            </Paper>
          </Container>
        );
      }
      
  
  