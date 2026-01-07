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
  Drawer,
  useMediaQuery,
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
  Menu as MenuIcon,
} from "@mui/icons-material";

const API_BASE = "https://sm-backend-8me3.onrender.com/api";
const token = localStorage.getItem("accessToken");
const HIGHLIGHT_COLORS = ["yellow", "lightgreen", "cyan", "pink", "orange"];

const UserNotes = () => {
  const isMobile = useMediaQuery("(max-width:900px)");

  /* ================= STATE ================= */
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  /* ================= FETCH NOTES ================= */
  const fetchNotes = async () => {
    try {
      setLoading(true);

      const queryString = Object.entries(filters)
        .filter(([_, v]) => v)
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

  /* ================= FETCH USER ================= */
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
      console.error("Fetch user error:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchUserData();
  }, [filters]);

  /* ================= FILTER OPTIONS ================= */
  const universities = [...new Set(notes.map((n) => n.university?.name))];
  const departments = [...new Set(notes.map((n) => n.department))];
  const branches = [...new Set(notes.map((n) => n.branch))];
  const subjects = [...new Set(notes.map((n) => n.subjectName))];
  const subjectCodes = [...new Set(notes.map((n) => n.subjectCode))];
  const languages = [...new Set(notes.map((n) => n.language))];

  const filteredNotes = notes.filter((note) =>
    note.topicName?.toLowerCase().includes(search.toLowerCase())
  );

  /* ================= BOOKMARK ================= */
  const toggleBookmark = async (id) => {
    const updated = userData.bookmarks.includes(id)
      ? userData.bookmarks.filter((b) => b !== id)
      : [...userData.bookmarks, id];

    setUserData({ ...userData, bookmarks: updated });

    await axios.put(
      `${API_BASE}/users/me/bookmarks`,
      { bookmarks: updated },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  /* ================= HIGHLIGHT ================= */
  const handleTextSelect = () => {
    const sel = window.getSelection();
    if (sel && sel.toString().trim()) {
      setSelectionRect(sel.getRangeAt(0).getBoundingClientRect());
    } else setSelectionRect(null);
  };

  const applyHighlight = async (color) => {
    if (!selectedNote) return;
    const text = window.getSelection().toString();
    if (!text) return;

    const list = userData.highlights[selectedNote._id] || [];
    const updated = {
      ...userData.highlights,
      [selectedNote._id]: [...list, { text, color }],
    };

    setUserData({ ...userData, highlights: updated });

    await axios.put(
      `${API_BASE}/users/me/highlights`,
      { highlights: updated },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setSelectionRect(null);
    window.getSelection().removeAllRanges();
  };

  const removeHighlight = async (text) => {
    const list = (userData.highlights[selectedNote._id] || []).filter(
      (h) => h.text !== text
    );
    const updated = { ...userData.highlights, [selectedNote._id]: list };
    setUserData({ ...userData, highlights: updated });

    await axios.put(
      `${API_BASE}/users/me/highlights`,
      { highlights: updated },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const renderHighlightedContent = (note) => {
    let html = note.topicDetails;
    (userData.highlights[note._id] || []).forEach(({ text, color }) => {
      const esc = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      html = html.replace(
        new RegExp(esc, "g"),
        `<mark style="background:${color};cursor:pointer" data-text="${text}">${text}</mark>`
      );
    });

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={(e) => {
          if (e.target.tagName === "MARK")
            removeHighlight(e.target.dataset.text);
        }}
      />
    );
  };

  /* ================= SIDEBAR ================= */
  const TopicList = (
    <Paper sx={{ height: "100%", overflowY: "auto" }}>
      <Box sx={{ p: 2 }}>
        <Stack direction="row" spacing={1}>
          <SearchIcon />
          <TextField
            variant="standard"
            placeholder="Search topics..."
            fullWidth
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Stack>
      </Box>

      <List>
        {filteredNotes.map((note) => (
          <ListItemButton
            key={note._id}
            selected={selectedNote?._id === note._id}
            onClick={() => {
              setSelectedNote(note);
              setDrawerOpen(false);
            }}
          >
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>

            <Typography dangerouslySetInnerHTML={{ __html: note.topicName }} />

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
  );

  /* ================= RENDER ================= */
  return (
    <Box sx={{ p: 2 }} onMouseUp={handleTextSelect}>
      {/* FILTERS */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <Select fullWidth value={filters.university} displayEmpty
            onChange={(e)=>setFilters({...filters, university:e.target.value, department:"", branch:"", subject:"", subjectCode:""})}>
            <MenuItem value="">All Universities</MenuItem>
            {universities.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
          </Select>

          <Select fullWidth value={filters.department} displayEmpty
            onChange={(e)=>setFilters({...filters, department:e.target.value, branch:"", subject:"", subjectCode:""})}>
            <MenuItem value="">All Departments</MenuItem>
            {departments.map(d => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </Select>

          <Select fullWidth value={filters.branch} displayEmpty
            onChange={(e)=>setFilters({...filters, branch:e.target.value, subject:"", subjectCode:""})}>
            <MenuItem value="">All Branches</MenuItem>
            {branches.map(b => <MenuItem key={b} value={b}>{b}</MenuItem>)}
          </Select>

          <Select fullWidth value={filters.subject} displayEmpty
            onChange={(e)=>setFilters({...filters, subject:e.target.value, subjectCode:""})}>
            <MenuItem value="">All Subjects</MenuItem>
            {subjects.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>

          <Select fullWidth value={filters.subjectCode} displayEmpty
            onChange={(e)=>setFilters({...filters, subjectCode:e.target.value})}>
            <MenuItem value="">All Codes</MenuItem>
            {subjectCodes.map(c => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </Select>

          <Select fullWidth value={filters.language} displayEmpty
            onChange={(e)=>setFilters({...filters, language:e.target.value})}>
            <MenuItem value="">All Languages</MenuItem>
            {languages.map(l => <MenuItem key={l} value={l}>{l}</MenuItem>)}
          </Select>
        </Stack>
      </Paper>

      {isMobile && (
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon />
        </IconButton>
      )}

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 280 }}>{TopicList}</Box>
      </Drawer>

      <Box sx={{ display: "flex", gap: 2 }}>
        {!isMobile && <Box sx={{ width: "25%" }}>{TopicList}</Box>}

        <Paper sx={{ flex: 1, p: 3, maxHeight: "75vh", overflowY: "auto" }}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : selectedNote ? (
            <>
              <Typography variant="h5"
                dangerouslySetInnerHTML={{ __html: selectedNote.topicName }} />
              <Divider sx={{ my: 2 }} />
              {renderHighlightedContent(selectedNote)}
            </>
          ) : (
            <Typography>Select a topic</Typography>
          )}
        </Paper>
      </Box>

      {selectionRect && (
        <Popper open anchorEl={{ getBoundingClientRect: () => selectionRect }}>
          <Paper sx={{ p: 1, display: "flex", gap: 1 }}>
            {HIGHLIGHT_COLORS.map(c => (
              <IconButton key={c} onClick={() => applyHighlight(c)}
                sx={{ bgcolor: c, width: 30, height: 30 }} />
            ))}
            <IconButton onClick={() => setSelectionRect(null)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        </Popper>
      )}
    </Box>
  );
};

export default UserNotes;