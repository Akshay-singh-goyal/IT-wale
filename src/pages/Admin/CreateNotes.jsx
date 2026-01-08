import React, { useState, useEffect, useRef } from 'react';
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
  Stack,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Edit,
  Delete,
  Add,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from '@mui/icons-material';
import axios from 'axios';
import AddUniversity from './AddUniversity';

const CreateNotes = () => {
  const [universities, setUniversities] = useState([]);
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showAddUniversity, setShowAddUniversity] = useState(false);

  const topicNameRef = useRef(null);
  const topicDetailsRef = useRef(null);

  const [fontSize, setFontSize] = useState(14); // ✅ Default font size
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
    language: '',
  });

  // ===== FETCH UNIVERSITIES =====
  const fetchUniversities = async () => {
    try {
      const res = await axios.get(
        'https://sm-backend-8me3.onrender.com/api/notes/universities'
      );
      setUniversities(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // ===== FETCH NOTES =====
  const fetchNotes = async () => {
    try {
      const res = await axios.get(
        'https://sm-backend-8me3.onrender.com/api/notes'
      );
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUniversities();
    fetchNotes();
  }, []);

  // ===== FORMAT TEXT =====
  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  // ===== HANDLE NORMAL INPUT =====
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

    const payload = {
      ...formData,
      university: formData.university._id,
      topicName: topicNameRef.current.innerHTML,
      topicDetails: topicDetailsRef.current.innerHTML,
    };

    try {
      if (editingId) {
        await axios.put(
          `https://sm-backend-8me3.onrender.com/api/notes/${editingId}`,
          payload
        );
        alert('Note updated successfully');
      } else {
        await axios.post(
          'https://sm-backend-8me3.onrender.com/api/notes',
          payload
        );
        alert('Note added successfully');
      }

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
        language: '',
      });

      topicNameRef.current.innerHTML = '';
      topicDetailsRef.current.innerHTML = '';
      setEditingId(null);
      setFontSize(14); // Reset font size
      fetchNotes();
      fetchUniversities();
    } catch (err) {
      console.error(err);
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
      language: note.language || '',
    });

    topicNameRef.current.innerHTML = note.topicName;
    topicDetailsRef.current.innerHTML = note.topicDetails;

    // Optional: Extract font size from saved content (if saved in style)
    const size = parseInt(
      window
        .getComputedStyle(topicDetailsRef.current)
        .fontSize.replace('px', '')
    );
    setFontSize(size || 14);
  };

  // ===== DELETE NOTE =====
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await axios.delete(
        `https://sm-backend-8me3.onrender.com/api/notes/${id}`
      );
      fetchNotes();
    }
  };

  // ===== ADD UNIVERSITY PAGE =====
  if (showAddUniversity) {
    return (
      <Box p={2}>
        <Button startIcon={<Add />} onClick={() => setShowAddUniversity(false)}>
          Back to Notes
        </Button>
        <AddUniversity onAdded={() => setShowAddUniversity(false)} />
      </Box>
    );
  }

  const languageOptions = [
    'English',
    'Hindi',
    'Spanish',
    'French',
    'German',
    'Other',
  ];

  const fontSizes = Array.from({ length: 25 }, (_, i) => i + 12); // 12px to 36px

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 3, p: 2 }}>
      <Typography variant="h5" mb={3}>
        {editingId ? 'Edit Note' : 'Add Note'}
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* ===== UNIVERSITY ===== */}
        <Autocomplete
          options={[...universities, { name: 'Add New University', _id: null }]}
          getOptionLabel={(o) => o.name}
          value={formData.university}
          onChange={(e, v) =>
            v?.name === 'Add New University'
              ? setShowAddUniversity(true)
              : setFormData({ ...formData, university: v })
          }
          renderInput={(p) => (
            <TextField {...p} label="Select University" fullWidth />
          )}
        />

        {/* ===== DEPARTMENT ===== */}
        <Autocomplete
          options={[...new Set(universities.map((u) => u.department))]}
          value={formData.department}
          onChange={(e, v) =>
            setFormData({ ...formData, department: v || '' })
          }
          renderInput={(p) => (
            <TextField {...p} label="Department" margin="dense" />
          )}
          freeSolo
        />

        {/* ===== BRANCH ===== */}
        <Autocomplete
          options={[
            ...new Set(
              universities.flatMap((u) => u.subjects.map((s) => s.branch))
            ),
          ]}
          value={formData.branch}
          onChange={(e, v) =>
            setFormData({ ...formData, branch: v || '' })
          }
          renderInput={(p) => (
            <TextField {...p} label="Branch" margin="dense" />
          )}
          freeSolo
        />

        {/* ===== SUBJECT NAME ===== */}
        <Autocomplete
          options={[
            ...new Set(
              universities.flatMap((u) =>
                u.subjects.map((s) => s.subjectName)
              )
            ),
          ]}
          value={formData.subjectName}
          onChange={(e, v) =>
            setFormData({ ...formData, subjectName: v || '' })
          }
          renderInput={(p) => (
            <TextField {...p} label="Subject Name" margin="dense" />
          )}
          freeSolo
        />

        {/* ===== SUBJECT CODE ===== */}
        <Autocomplete
          options={[
            ...new Set(
              universities.flatMap((u) =>
                u.subjects.map((s) => s.subjectCode)
              )
            ),
          ]}
          value={formData.subjectCode}
          onChange={(e, v) =>
            setFormData({ ...formData, subjectCode: v || '' })
          }
          renderInput={(p) => (
            <TextField {...p} label="Subject Code" margin="dense" />
          )}
          freeSolo
        />

        {/* ===== YEAR ===== */}
        <TextField
          label="Year"
          name="year"
          type="number"
          value={formData.year}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        {/* ===== SEMESTER ===== */}
        <TextField
          label="Semester"
          name="semester"
          type="number"
          value={formData.semester}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        {/* ===== LANGUAGE ===== */}
        <Autocomplete
          options={languageOptions}
          value={formData.language}
          onChange={(e, v) =>
            setFormData({ ...formData, language: v || '' })
          }
          renderInput={(p) => (
            <TextField {...p} label="Language" margin="dense" />
          )}
        />

        {/* ===== FORMAT TOOLBAR ===== */}
        <Stack direction="row" spacing={1} mt={2} alignItems="center">
          <IconButton onClick={() => formatText('bold')}>
            <FormatBold />
          </IconButton>
          <IconButton onClick={() => formatText('italic')}>
            <FormatItalic />
          </IconButton>
          <IconButton onClick={() => formatText('underline')}>
            <FormatUnderlined />
          </IconButton>

          {/* ===== FONT SIZE SELECT ===== */}
          <FormControl size="small" sx={{ minWidth: 100 }}>
            <InputLabel>Font Size</InputLabel>
            <Select
              value={fontSize}
              label="Font Size"
              onChange={(e) => setFontSize(e.target.value)}
            >
              {fontSizes.map((size) => (
                <MenuItem key={size} value={size}>
                  {size}px
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        {/* ===== TOPIC NAME ===== */}
        <Box
          ref={topicNameRef}
          contentEditable
          suppressContentEditableWarning
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
            mt: 1,
            minHeight: 40,
            fontSize: `${fontSize}px`, // ✅ Apply font size
          }}
        />

        {/* ===== TOPIC DETAILS ===== */}
        <Box
          ref={topicDetailsRef}
          contentEditable
          suppressContentEditableWarning
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
            mt: 2,
            minHeight: 120,
            fontSize: `${fontSize}px`, // ✅ Apply font size
          }}
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
                  <TableCell>
                    {note.subjectName} ({note.subjectCode})
                  </TableCell>
                  <TableCell>
                    <div dangerouslySetInnerHTML={{ __html: note.topicName }} />
                  </TableCell>
                  <TableCell>{note.language || '-'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(note)}>
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(note._id)}
                    >
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {notes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
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
