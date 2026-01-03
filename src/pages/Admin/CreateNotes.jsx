import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';
import axios from 'axios';
import AddUniversity from './AddUniversity';

const CreateNotes = () => {
  const [universities, setUniversities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddUniversity, setShowAddUniversity] = useState(false);

  const [formData, setFormData] = useState({
    university: null,
    department: '',
    branch: '',
    subjectName: '',
    subjectCode: '',
    year: '',
    semester: '',
    topicName: '',
    topicDetails: '',
    language: '', // <-- New field for language
  });

  // ===== FETCH UNIVERSITIES =====
  const fetchUniversities = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes/universities');
      setUniversities(res.data);
    } catch (err) {
      console.error('Error fetching universities:', err);
    }
  };

  // ===== FETCH NOTES =====
  const fetchNotes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/notes');
      setNotes(res.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchUniversities();
    fetchNotes();
  }, []);

  // ===== HANDLE INPUT CHANGE =====
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ===== HANDLE SUBMIT =====
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.university) {
      alert('Please select a university');
      return;
    }

    try {
      const payload = { ...formData, university: formData.university._id };

      if (editingId) {
        await axios.put(`http://localhost:5000/api/notes/${editingId}`, payload);
        alert('Note updated successfully');
      } else {
        await axios.post('http://localhost:5000/api/notes', payload);
        alert('Note added successfully');
      }

      // Reset form
      setFormData({
        university: null,
        department: '',
        branch: '',
        subjectName: '',
        subjectCode: '',
        year: '',
        semester: '',
        topicName: '',
        topicDetails: '',
        language: '', // reset language
      });
      setEditingId(null);

      fetchNotes();
      fetchUniversities();
    } catch (err) {
      console.error('Error submitting note:', err);
    }
  };

  // ===== EDIT NOTE =====
  const handleEdit = (note) => {
    setEditingId(note._id);
    setFormData({
      university: note.university,
      department: note.department,
      branch: note.branch,
      subjectName: note.subjectName,
      subjectCode: note.subjectCode,
      year: note.year,
      semester: note.semester,
      topicName: note.topicName,
      topicDetails: note.topicDetails,
      language: note.language || '', // <-- populate language if exists
    });
  };

  // ===== DELETE NOTE =====
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await axios.delete(`http://localhost:5000/api/notes/${id}`);
        fetchNotes();
      } catch (err) {
        console.error('Error deleting note:', err);
      }
    }
  };

  // ===== RENDER ADD UNIVERSITY PAGE =====
  if (showAddUniversity) {
    return (
      <Box sx={{ p: 2 }}>
        <Button
          startIcon={<Add />}
          onClick={() => setShowAddUniversity(false)}
          sx={{ mb: 2 }}
        >
          Back to Notes
        </Button>
        <AddUniversity onAdded={() => setShowAddUniversity(false)} />
      </Box>
    );
  }

  // ===== LANGUAGES OPTIONS =====
  const languageOptions = ['English', 'Hindi', 'Spanish', 'French', 'German', 'Other'];

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3, p: 2 }}>
      <Typography variant="h5" mb={3}>
        {editingId ? 'Edit Note' : 'Add Note'}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* ===== UNIVERSITY AUTOCOMPLETE ===== */}
        <Autocomplete
          options={[...universities, { name: 'Add New University', _id: null }]}
          getOptionLabel={(option) => option.name}
          value={formData.university}
          onChange={(e, newValue) => {
            if (newValue?.name === 'Add New University') {
              setShowAddUniversity(true);
            } else {
              setFormData({ ...formData, university: newValue });
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Select University" margin="normal" fullWidth />
          )}
          isOptionEqualToValue={(option, value) => option._id === value?._id}
          freeSolo
        />

        {/* ===== DEPARTMENT ===== */}
        <Autocomplete
          options={[...new Set(universities.map((u) => u.department))]}
          value={formData.department}
          onChange={(e, val) => setFormData({ ...formData, department: val || '' })}
          renderInput={(params) => <TextField {...params} label="Department" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== BRANCH ===== */}
        <Autocomplete
          options={[...new Set(universities.flatMap((u) => u.subjects.map((s) => s.branch)))]}
          value={formData.branch}
          onChange={(e, val) => setFormData({ ...formData, branch: val || '' })}
          renderInput={(params) => <TextField {...params} label="Branch" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== SUBJECT NAME ===== */}
        <Autocomplete
          options={[...new Set(universities.flatMap((u) => u.subjects.map((s) => s.subjectName)))]}
          value={formData.subjectName}
          onChange={(e, val) => setFormData({ ...formData, subjectName: val || '' })}
          renderInput={(params) => <TextField {...params} label="Subject Name" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== SUBJECT CODE ===== */}
        <Autocomplete
          options={[...new Set(universities.flatMap((u) => u.subjects.map((s) => s.subjectCode)))]}
          value={formData.subjectCode}
          onChange={(e, val) => setFormData({ ...formData, subjectCode: val || '' })}
          renderInput={(params) => <TextField {...params} label="Subject Code" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== YEAR ===== */}
        <Autocomplete
          options={[...new Set(universities.flatMap((u) => u.subjects.map((s) => s.year)))]}
          value={formData.year}
          onChange={(e, val) => setFormData({ ...formData, year: val || '' })}
          renderInput={(params) => <TextField {...params} label="Year" type="number" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== SEMESTER ===== */}
        <Autocomplete
          options={[...new Set(universities.flatMap((u) => u.subjects.map((s) => s.semester)))]}
          value={formData.semester}
          onChange={(e, val) => setFormData({ ...formData, semester: val || '' })}
          renderInput={(params) => <TextField {...params} label="Semester" type="number" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== LANGUAGE ===== */}
        <Autocomplete
          options={languageOptions}
          value={formData.language}
          onChange={(e, val) => setFormData({ ...formData, language: val || '' })}
          renderInput={(params) => <TextField {...params} label="Language" margin="dense" fullWidth />}
          freeSolo
        />

        {/* ===== TOPIC NAME & DETAILS ===== */}
        <TextField
          label="Topic Name"
          name="topicName"
          value={formData.topicName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Topic Details"
          name="topicDetails"
          value={formData.topicDetails}
          onChange={handleChange}
          fullWidth
          multiline
          rows={4}
          margin="dense"
        />

        <Button type="submit" variant="contained" color="success" sx={{ mt: 2 }}>
          {editingId ? 'Update Note' : 'Add Note'}
        </Button>
      </form>

      {/* ===== NOTES HISTORY ===== */}
      <Box mt={5}>
        <Typography variant="h6" mb={2}>
          Notes History
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>University</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes.map((note) => (
                <TableRow key={note._id}>
                  <TableCell>{note.university?.name}</TableCell>
                  <TableCell>{note.department}</TableCell>
                  <TableCell>
                    {note.subjectName} ({note.subjectCode})
                  </TableCell>
                  <TableCell>{note.topicName}</TableCell>
                  <TableCell>{note.language || '-'}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(note)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(note._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {notes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No notes added yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default CreateNotes;
