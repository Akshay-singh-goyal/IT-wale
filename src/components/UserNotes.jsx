import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Stack,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  TextField,
  Divider,
  IconButton,
  Tooltip,
  Popper,
} from "@mui/material";
import {
  MenuBook as BookIcon,
  School as UniversityIcon,
  Category as BranchIcon,
  Code as CodeIcon,
  Subject as SubjectIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const API_BASE = "https://sm-backend-8me3.onrender.com/api";
const token = localStorage.getItem("accessToken");
const HIGHLIGHT_COLORS = ["yellow", "lightgreen", "cyan", "pink", "orange"];

const UserNotes = () => {
  const [filters, setFilters] = useState({
    university: "",
    department: "",
    branch: "",
    subject: "",
    subjectCode: "",
    language: "",
  });
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState({ bookmarks: [], highlights: {} });
  const [selectionRect, setSelectionRect] = useState(null);
  const popperRef = useRef(null);

  // ===== Fetch Notes =====
  const fetchNotes = async () => {
    try {
      setLoading(true);

      const queryString = Object.entries(filters)
        .filter(([_, v]) => v)         // remove empty values
        .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
        .join("&");

      const url = queryString
        ? `${API_BASE}/study-notes?${queryString}`
        : `${API_BASE}/study-notes`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotes(res.data || []);
      setSelectedNote(null);
    } catch (err) {
      console.error("Fetch notes error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ===== Fetch Current User =====
  const fetchUserData = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData({
        bookmarks: res.data.bookmarks || [],
        highlights: res.data.highlights || {},
      });
    } catch (err) {
      console.error("Fetch user data error:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchUserData();
  }, [filters]);

  const universities = [...new Set(notes.map((n) => n.university?.name))];
  const departments = [
    ...new Set(
      notes
        .filter((n) => !filters.university || n.university?.name === filters.university)
        .map((n) => n.department)
    ),
  ];
  const branches = [
    ...new Set(
      notes
        .filter(
          (n) =>
            (!filters.university || n.university?.name === filters.university) &&
            (!filters.department || n.department === filters.department)
        )
        .map((n) => n.branch)
    ),
  ];
  const subjects = [
    ...new Set(
      notes
        .filter(
          (n) =>
            (!filters.university || n.university?.name === filters.university) &&
            (!filters.department || n.department === filters.department) &&
            (!filters.branch || n.branch === filters.branch)
        )
        .map((n) => n.subjectName)
    ),
  ];
  const subjectCodes = [
    ...new Set(
      notes
        .filter(
          (n) =>
            (!filters.university || n.university?.name === filters.university) &&
            (!filters.department || n.department === filters.department) &&
            (!filters.branch || n.branch === filters.branch) &&
            (!filters.subject || n.subjectName === filters.subject)
        )
        .map((n) => n.subjectCode)
    ),
  ];
  const languages = [...new Set(notes.map((n) => n.language))];

  const filteredNotes = notes.filter((note) =>
    note.topicName.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBookmark = async (noteId) => {
    try {
      const newBookmarks = userData.bookmarks.includes(noteId)
        ? userData.bookmarks.filter((id) => id !== noteId)
        : [...userData.bookmarks, noteId];
      setUserData({ ...userData, bookmarks: newBookmarks });

      await axios.put(
        `${API_BASE}/users/me/bookmarks`,
        { bookmarks: newBookmarks },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Bookmark update error:", err);
    }
  };

  const handleTextSelect = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectionRect(rect);
    } else {
      setSelectionRect(null);
    }
  };

  const applyHighlight = async (color) => {
    if (!selectedNote) return;
    const text = window.getSelection().toString();
    if (!text) return;

    const noteHighlights = userData.highlights[selectedNote._id] || [];
    noteHighlights.push({ text, color });
    const updatedHighlights = { ...userData.highlights, [selectedNote._id]: noteHighlights };
    setUserData({ ...userData, highlights: updatedHighlights });

    try {
      await axios.put(
        `${API_BASE}/users/me/highlights`,
        { highlights: updatedHighlights },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Highlight save error:", err);
    }
    setSelectionRect(null);
    window.getSelection().removeAllRanges();
  };

  const removeHighlight = async (text) => {
    if (!selectedNote) return;
    const noteHighlights = (userData.highlights[selectedNote._id] || []).filter(
      (h) => h.text !== text
    );
    const updatedHighlights = { ...userData.highlights, [selectedNote._id]: noteHighlights };
    setUserData({ ...userData, highlights: updatedHighlights });

    try {
      await axios.put(
        `${API_BASE}/users/me/highlights`,
        { highlights: updatedHighlights },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Highlight remove error:", err);
    }
  };

  const renderHighlightedContent = (note) => {
    let content = note.topicDetails;
    const highlights = userData.highlights[note._id] || [];
    highlights.forEach(({ text, color }) => {
      const escaped = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(escaped, "g");
      content = content.replace(
        regex,
        `<mark style="background-color:${color}; cursor: pointer;" data-text="${text}">${text}</mark>`
      );
    });
    return <span dangerouslySetInnerHTML={{ __html: content }} />;
  };

  const handleHighlightClick = (e) => {
    if (e.target.tagName === "MARK") removeHighlight(e.target.dataset.text);
  };
  // ===== Render =====
  return (
    <Box component="main" sx={{ p: { xs: 2, sm: 4 } }} onMouseUp={handleTextSelect}>
      {/* ===== Filters ===== */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          {/* University */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <UniversityIcon color="primary" />
            <Select
              value={filters.university}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  university: e.target.value,
                  department: "",
                  branch: "",
                  subject: "",
                  subjectCode: "",
                  language: "",
                })
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Universities</MenuItem>
              {universities.map((uni) => (
                <MenuItem key={uni} value={uni}>{uni}</MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Department */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <SubjectIcon color="success" />
            <Select
              value={filters.department}
              onChange={(e) =>
                setFilters({ ...filters, department: e.target.value, branch: "", subject: "", subjectCode: "" })
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Departments</MenuItem>
              {departments.map((d) => (
                <MenuItem key={d} value={d}>{d}</MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Branch */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <BranchIcon color="secondary" />
            <Select
              value={filters.branch}
              onChange={(e) => setFilters({ ...filters, branch: e.target.value, subject: "", subjectCode: "" })}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Branches</MenuItem>
              {branches.map((b) => (
                <MenuItem key={b} value={b}>{b}</MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Subject */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <SubjectIcon color="action" />
            <Select
              value={filters.subject}
              onChange={(e) => setFilters({ ...filters, subject: e.target.value, subjectCode: "" })}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Subjects</MenuItem>
              {subjects.map((s) => (
                <MenuItem key={s} value={s}>{s}</MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Subject Code */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <CodeIcon color="disabled" />
            <Select
              value={filters.subjectCode}
              onChange={(e) => setFilters({ ...filters, subjectCode: e.target.value })}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Codes</MenuItem>
              {subjectCodes.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </Select>
          </Stack>

          {/* Language */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <CodeIcon color="secondary" />
            <Select
              value={filters.language}
              onChange={(e) => setFilters({ ...filters, language: e.target.value })}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Languages</MenuItem>
              {languages.map((l) => (
                <MenuItem key={l} value={l}>{l}</MenuItem>
              ))}
            </Select>
          </Stack>
        </Stack>
      </Paper>

      {/* ===== Main Content ===== */}
      <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 2 }}>
        {/* Left Sidebar */}
        <Paper sx={{ width: { xs: "100%", sm: "25%" }, maxHeight: "70vh", overflowY: "auto" }}>
          <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <SearchIcon />
              <TextField
                placeholder="Search topics..."
                variant="standard"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Stack>
          </Box>
          <List>
            {filteredNotes.length === 0 && (
              <Typography sx={{ p: 2, color: "text.secondary" }}>No topics found</Typography>
            )}
            {filteredNotes.map((note) => (
              <ListItemButton
                key={note._id}
                selected={selectedNote?._id === note._id}
                onClick={() => setSelectedNote(note)}
                sx={{ justifyContent: "space-between" }}
              >
                <Stack direction="row" alignItems="center">
                  <ListItemIcon sx={{ minWidth: 36 }}><BookIcon /></ListItemIcon>
                  <Typography>{note.topicName}</Typography>
                </Stack>
                <IconButton onClick={() => toggleBookmark(note._id)}>
                  {userData.bookmarks.includes(note._id) ? (
                    <StarIcon color="warning" />
                  ) : (
                    <StarBorderIcon />
                  )}
                </IconButton>
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {/* Right Content */}
        <Paper
          sx={{ flex: 1, p: 3, maxHeight: "70vh", overflowY: "auto" }}
          onClick={handleHighlightClick}
        >
          {loading ? (
            <Typography>Loading...</Typography>
          ) : selectedNote ? (
            <>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
                <Typography variant="h5">{selectedNote.topicName}</Typography>
                <Tooltip title={userData.bookmarks.includes(selectedNote._id) ? "Remove Bookmark" : "Bookmark"}>
                  <IconButton onClick={() => toggleBookmark(selectedNote._id)}>
                    {userData.bookmarks.includes(selectedNote._id) ? (
                      <StarIcon color="warning" />
                    ) : (
                      <StarBorderIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </Stack>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ whiteSpace: "pre-line", cursor: "text" }}>
                {renderHighlightedContent(selectedNote)}
              </Box>
              <Typography variant="caption" sx={{ mt: 1, display: "block", color: "text.secondary" }}>
                Select text to highlight (click highlight to remove)
              </Typography>
            </>
          ) : (
            <Typography>Select a topic to view notes</Typography>
          )}
        </Paper>
      </Box>

      {/* ===== Floating Highlight Toolbar ===== */}
      {selectionRect && (
        <Popper
          open
          anchorEl={{ getBoundingClientRect: () => selectionRect }}
          placement="top"
          style={{ zIndex: 9999 }}
        >
          <Paper sx={{ display: "flex", p: 1, gap: 1, boxShadow: 3 }}>
            {HIGHLIGHT_COLORS.map((color) => (
              <IconButton
                key={color}
                onClick={() => applyHighlight(color)}
                sx={{ bgcolor: color, width: 30, height: 30 }}
              />
            ))}
            <Tooltip title="Cancel">
              <IconButton onClick={() => setSelectionRect(null)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Popper>
      )}
    </Box>
  );
};

export default UserNotes;
