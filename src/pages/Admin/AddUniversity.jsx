// src/pages/Admin/AddUniversity.jsx
import React, { useState, useEffect } from 'react';
import { 
  TextField, Button, Box, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, IconButton 
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const AddUniversity = () => {
  const [university, setUniversity] = useState({
    name: '',
    department: '',
    subjects: [{ branch: '', subjectName: '', subjectCode: '', year: '', semester: '' }]
  });

  const [universities, setUniversities] = useState([]);
  const [editingId, setEditingId] = useState(null);

  /* ===== FETCH UNIVERSITIES ===== */
  const fetchUniversities = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/university');
      setUniversities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, []);

  /* ===== HANDLE FORM CHANGES ===== */
  const handleChange = (e, index, field) => {
    if (field === 'subjects') {
      const values = [...university.subjects];
      values[index][e.target.name] = e.target.value;
      setUniversity({ ...university, subjects: values });
    } else {
      setUniversity({ ...university, [e.target.name]: e.target.value });
    }
  };

  const addSubject = () => {
    setUniversity({ ...university, subjects: [...university.subjects, { branch: '', subjectName: '', subjectCode: '', year: '', semester: '' }] });
  };

  /* ===== HANDLE SUBMIT ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Update
        await axios.put(`http://localhost:5000/api/university/${editingId}`, university);
        alert('University updated successfully');
      } else {
        // Create
        await axios.post('http://localhost:5000/api/university', university);
        alert('University added successfully');
      }
      setUniversity({
        name: '',
        department: '',
        subjects: [{ branch: '', subjectName: '', subjectCode: '', year: '', semester: '' }]
      });
      setEditingId(null);
      fetchUniversities();
    } catch (err) {
      console.error(err);
    }
  };

  /* ===== EDIT & DELETE ===== */
  const handleEdit = (uni) => {
    setUniversity(uni);
    setEditingId(uni._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await axios.delete(`http://localhost:5000/api/university/${id}`);
        fetchUniversities();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 5, p: 3 }}>
      <Typography variant="h5" mb={3}>{editingId ? 'Edit University' : 'Add University'}</Typography>

      {/* ===== FORM ===== */}
      <form onSubmit={handleSubmit}>
        <TextField
          label="University Name"
          name="name"
          fullWidth
          margin="normal"
          value={university.name}
          onChange={handleChange}
        />
        <TextField
          label="Department"
          name="department"
          fullWidth
          margin="normal"
          value={university.department}
          onChange={handleChange}
        />
        {university.subjects.map((subject, index) => (
          <Box key={index} mb={2} p={2} border={1} borderRadius={2}>
            <TextField
              label="Branch"
              name="branch"
              fullWidth
              margin="dense"
              value={subject.branch}
              onChange={(e) => handleChange(e, index, 'subjects')}
            />
            <TextField
              label="Subject Name"
              name="subjectName"
              fullWidth
              margin="dense"
              value={subject.subjectName}
              onChange={(e) => handleChange(e, index, 'subjects')}
            />
            <TextField
              label="Subject Code"
              name="subjectCode"
              fullWidth
              margin="dense"
              value={subject.subjectCode}
              onChange={(e) => handleChange(e, index, 'subjects')}
            />
            <TextField
              label="Year"
              name="year"
              type="number"
              fullWidth
              margin="dense"
              value={subject.year}
              onChange={(e) => handleChange(e, index, 'subjects')}
            />
            <TextField
              label="Semester"
              name="semester"
              type="number"
              fullWidth
              margin="dense"
              value={subject.semester}
              onChange={(e) => handleChange(e, index, 'subjects')}
            />
          </Box>
        ))}
        <Button variant="contained" color="primary" onClick={addSubject}>Add Another Subject</Button>
        <Button type="submit" variant="contained" color="success" sx={{ ml: 2 }}>
          {editingId ? 'Update' : 'Submit'}
        </Button>
      </form>

      {/* ===== HISTORY TABLE ===== */}
      <Box mt={5}>
        <Typography variant="h6" mb={2}>Saved Universities</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>University</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Subjects</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {universities.map((uni) => (
                <TableRow key={uni._id}>
                  <TableCell>{uni.name}</TableCell>
                  <TableCell>{uni.department}</TableCell>
                  <TableCell>
                    {uni.subjects.map((sub, i) => (
                      <Box key={i}>
                        {sub.branch} - {sub.subjectName} ({sub.subjectCode}) | Year {sub.year} Sem {sub.semester}
                      </Box>
                    ))}
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(uni)}>
                      <Edit />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(uni._id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {universities.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">No universities added yet.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default AddUniversity;
