import React, {
  useEffect,
  useState,
  useRef,
  useMemo
} from "react";
import { Helmet } from "react-helmet-async";
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
  Popper,
  Drawer,
  useMediaQuery,
} from "@mui/material";
import {
  MenuBook as BookIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Search as SearchIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";

/* ================= CONSTANTS ================= */
const API_BASE = "https://sm-backend-8me3.onrender.com/api";
const token = localStorage.getItem("accessToken");
const HIGHLIGHT_COLORS = [
  "yellow",
  "lightgreen",
  "cyan",
  "pink",
  "orange",
];

/* ================= COMPONENT ================= */
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
  const [userData, setUserData] = useState({
    bookmarks: [],
    highlights: {},
  });

  const [selectionRect, setSelectionRect] = useState(null);

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

  /* ================= SEO DYNAMIC ================= */
  useEffect(() => {
    if (!selectedNote) return;

    document.title = `${selectedNote.topicName} Notes | ${selectedNote.subjectName} | The IT Wallah`;
  }, [selectedNote]);

  /* ================= SORT + SEARCH ================= */
  const sortedNotes = useMemo(() => {
    return [...notes]
      .sort(
        (a, b) =>
          new Date(a.createdAt) - new Date(b.createdAt)
      )
      .filter((note) =>
        note.topicName
          ?.toLowerCase()
          .includes(search.toLowerCase())
      );
  }, [notes, search]);

  /* ================= FILTER OPTIONS ================= */
  const universities = [
    ...new Set(notes.map((n) => n.university?.name).filter(Boolean)),
  ];
  const departments = [
    ...new Set(notes.map((n) => n.department).filter(Boolean)),
  ];
  const branches = [
    ...new Set(notes.map((n) => n.branch).filter(Boolean)),
  ];
  const subjects = [
    ...new Set(notes.map((n) => n.subjectName).filter(Boolean)),
  ];
  const subjectCodes = [
    ...new Set(notes.map((n) => n.subjectCode).filter(Boolean)),
  ];
  const languages = [
    ...new Set(notes.map((n) => n.language).filter(Boolean)),
  ];

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
      setSelectionRect(
        sel.getRangeAt(0).getBoundingClientRect()
      );
    } else {
      setSelectionRect(null);
    }
  };

  const applyHighlight = async (color) => {
    if (!selectedNote) return;
    const text = window.getSelection().toString();
    if (!text) return;

    const list =
      userData.highlights[selectedNote._id] || [];

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
    const list =
      (userData.highlights[selectedNote._id] || []).filter(
        (h) => h.text !== text
      );

    const updated = {
      ...userData.highlights,
      [selectedNote._id]: list,
    };

    setUserData({ ...userData, highlights: updated });

    await axios.put(
      `${API_BASE}/users/me/highlights`,
      { highlights: updated },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const renderHighlightedContent = (note) => {
    let html = note.topicDetails;

    (userData.highlights[note._id] || []).forEach(
      ({ text, color }) => {
        const esc = text.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&"
        );
        html = html.replace(
          new RegExp(esc, "g"),
          `<mark style="background:${color};cursor:pointer" data-text="${text}">${text}</mark>`
        );
      }
    );

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={(e) => {
          if (e.target.tagName === "MARK") {
            removeHighlight(e.target.dataset.text);
          }
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
        {sortedNotes.map((note) => (
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

            <Typography
              dangerouslySetInnerHTML={{
                __html: note.topicName,
              }}
            />

            <IconButton
              onClick={() => toggleBookmark(note._id)}
            >
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
    <>
      {/* ========== SEO ========== */}
      <Helmet>
        <title>
          Free Study Notes | RGPV Engineering Notes – The IT Wallah
        </title>

        <meta
          name="description"
          content="Free engineering study notes for RGPV students. Topic-wise notes with search, bookmarks and highlights."
        />

        <link
          rel="canonical"
          href="https://theitwallah.vercel.app/user-notes"
        />
      </Helmet>

      <Box sx={{ p: 2 }} onMouseUp={handleTextSelect}>
        {/* Filters */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
          >
            <Select
              value={filters.university}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  university: e.target.value,
                })
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Universities</MenuItem>
              {universities.map((u) => (
                <MenuItem key={u} value={u}>
                  {u}
                </MenuItem>
              ))}
            </Select>

            <Select
              value={filters.subject}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  subject: e.target.value,
                })
              }
              displayEmpty
              fullWidth
            >
              <MenuItem value="">All Subjects</MenuItem>
              {subjects.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Paper>

        {isMobile && (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
        )}

        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box sx={{ width: 280 }}>{TopicList}</Box>
        </Drawer>

        <Box sx={{ display: "flex", gap: 2 }}>
          {!isMobile && (
            <Box sx={{ width: "25%" }}>{TopicList}</Box>
          )}

          <Paper
            sx={{
              flex: 1,
              p: 3,
              maxHeight: "75vh",
              overflowY: "auto",
            }}
          >
            {loading ? (
              <Typography>Loading...</Typography>
            ) : selectedNote ? (
              <>
                <Typography variant="h1" fontSize="24px">
                  {selectedNote.topicName}
                </Typography>
                <Divider sx={{ my: 2 }} />
                {renderHighlightedContent(selectedNote)}
              </>
            ) : (
              <Typography>Select a topic</Typography>
            )}
          </Paper>
        </Box>

        {selectionRect && (
          <Popper
            open
            anchorEl={{
              getBoundingClientRect: () => selectionRect,
            }}
          >
            <Paper
              sx={{ p: 1, display: "flex", gap: 1 }}
            >
              {HIGHLIGHT_COLORS.map((c) => (
                <IconButton
                  key={c}
                  onClick={() => applyHighlight(c)}
                  sx={{
                    bgcolor: c,
                    width: 30,
                    height: 30,
                  }}
                />
              ))}
              <IconButton
                onClick={() => setSelectionRect(null)}
              >
                <DeleteIcon />
              </IconButton>
            </Paper>
          </Popper>
        )}
      </Box>
    </>
  );
};

export default UserNotes;
