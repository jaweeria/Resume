import {
  Grid,
  Typography,
  Box,
  Avatar,
  TextField,
  IconButton,
  Button,
  createTheme,
  ThemeProvider,
  Divider,
  Popover,
  MenuItem,
  FormControl,
  InputLabel,
  ListItemIcon,
  Menu,
  Select,
} from "@mui/material";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import RedeemOutlinedIcon from "@mui/icons-material/RedeemOutlined";
import MilitaryTechOutlinedIcon from "@mui/icons-material/MilitaryTechOutlined";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import CameraIcon from "@mui/icons-material/Camera";
import React, { useEffect, useRef, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import avimg from "../assets/Assets/avater1.png";
import SettingsInputSvideoRoundedIcon from "@mui/icons-material/SettingsInputSvideoRounded";
import { RxPencil1 } from "react-icons/rx";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import { LuSquareMenu } from "react-icons/lu";
import MenuIcon from "@mui/icons-material/Menu";
import { updateField, resetForm } from "../Store/formSlice";
import ReactQuill from "react-quill";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ViewColumnOutlinedIcon from "@mui/icons-material/ViewColumnOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  openEditModal,
  openModal,
  removeCertificateData,
  removeExperience,
  removeLanguage,
  removeSkills,
  setSelectedProfile,
} from "../Store/modalSlice";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import Resume from "./Resume";
import {
  ArrowBack,
  Circle,
  DeleteRounded,
  Language,
  ShareOutlined,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import Allmodal from "./Allmodal";
import { removeProfileData } from "../Store/modalSlice";
import EditModal from "./EditModal";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
function ResumeBasics() {
  const fontOptions = [
    "Poppins, sans-serif",
    "Roboto, sans-serif",
    "Open Sans, sans-serif",
    "Lato, sans-serif",
    "Montserrat, sans-serif",
    "Inter, sans-serif",
    "Noto Sans, sans-serif",
    "Ubuntu, sans-serif",
    "Raleway, sans-serif",
    "Helvetica, sans-serif",
    "Arial, sans-serif",
    "Georgia, serif",
    "Times New Roman, serif",
  ];

  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [subMenuAnchorElprofile, setSubMenuAnchorElprofile] = useState(null);
  const [anchorElprofile, setAnchorElprofile] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [showSummary, setShowSummary] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState(1); // Default to 1 Column
  const [renameValue, setRenameValue] = useState(""); // For rename input field
  const [subMenuType, setSubMenuType] = useState("");
  const [showProfile, setShowProfile] = useState(true);
  const [textColor, setTextColor] = useState("black");
  const [selectedTheme, setSelectedTheme] = useState("modern");
  const [fontFamily, setfontFamily] = useState("");
  const [mainboxstateColor, setMainBoxStateColor] = useState("black");
  const [search, setSearch] = useState("");

  const [anchorEll, setAnchorEll] = useState(null);
  const inputRef = useRef();

  const filteredFonts = fontOptions.filter((font) =>
    font.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpen = (event) => {
    setAnchorEll(event.currentTarget);
  };

  const handleCloseFont = () => {
    setAnchorEll(null);
    setSearch(""); // Clear search on close
  };

  const handleSelectFont = (font) => {
    setfontFamily(font);
    setAnchorEll(null);
  };

  const handleColorChange = (color) => {
    setTextColor(color);
  };

  const quillRef = useRef(null);

  const [showlabelInput, setShowlabelInput] = useState(false);
  const [addcustomfield, setAddCustomField] = useState([]);
  const [customLines, setCustomLines] = useState([]);

  // Function to handle changes in formData (e.g., input field changes)
  const [avimg, setAvimg] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvimg(imageUrl);
    }
  };

  const handleAddCustomLine = () => {
    setCustomLines((prev) => [...prev, { id: Date.now() }]); // Add a new line with a unique ID
  };
  const handleRemoveLine = (id) => {
    setCustomLines((prev) => prev.filter((line) => line.id !== id));
  };
  const handleAddCustomField = () => {
    setAddCustomField((prev) => [...prev, { name: "", value: "" }]);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...addcustomfield];
    updatedFields.splice(index, 1);
    setAddCustomField(updatedFields);
  };

  const handleIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleIconClick2 = (event) => {
    setAnchorElprofile(event.currentTarget);
  };

  const handleSubMenuOpen = (event) => {
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleSubMenuClose = () => {
    setSubMenuAnchorEl(null);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    handleCloseFont();
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElprofile(null);
    setSubMenuAnchorElprofile(null);
    setSubMenuAnchorEl(null); // Close both main menu and submenus
  };
  const handleTextFieldChange = (e) => {
    const value = e.target.value;
    // Dispatch action to update the specific field
    dispatch(updateField({ field: "title", value }));
  };
  const open = Boolean(anchorEl);
  const openSubMenu = Boolean(subMenuAnchorEl);
  const openprofile = Boolean(anchorElprofile);
  const openSubMenuprofile = Boolean(subMenuAnchorElprofile);
  const menuOptions = [
    {
      label: showSummary ? "Hide" : "Show",
      icon: showSummary ? <VisibilityOffIcon /> : <VisibilityIcon />,
      value: "toggleSummary",
    },
    {
      label: "Rename",
      icon: <ModeEditOutlinedIcon />,
      value: "rename",
      hasSubMenu: true,
    },
    {
      label: "Columns",
      icon: <ViewColumnOutlinedIcon />,
      value: "column",
      hasSubMenu: true,
    },
    { label: "Refresh", icon: <ReplayOutlinedIcon />, value: "general" },
    { label: "Remove", icon: <DeleteRounded />, value: "general" },
  ];
  const ProfilemenuOptions = [
    {
      label: showProfile ? "Hide" : "Show",
      icon: showProfile ? <VisibilityOffIcon /> : <VisibilityIcon />,
      value: "toggleProfile",
    },
    {
      label: "Rename",
      icon: <ModeEditOutlinedIcon />,
      value: "rename",
      hasSubMenu: true,
    },
    {
      label: "Columns",
      icon: <ViewColumnOutlinedIcon />,
      value: "column",
      hasSubMenu: true,
    },
    { label: "Refresh", icon: <ReplayOutlinedIcon />, value: "general" },
    { label: "Remove", icon: <DeleteRounded />, value: "general" },
  ];

  const handleFieldChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFields = [...addcustomfield];
    updatedFields[index][name] = value;
    setAddCustomField(updatedFields);
  };
  const handleFormData = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ field: name, value }));
  };
  const handleSummaryChange = (value) => {
    dispatch(updateField({ field: "summary", value }));
  };
  useEffect(() => {
    const quillEditor = document.querySelector(".ql-editor");
    if (quillEditor) {
      quillEditor.style.columnCount = selectedColumns;
      quillEditor.style.columnGap = "30px";
    }
  }, [selectedColumns]);
  const profiles = useSelector((state) => state.modal.profiles);
  const certificate = useSelector((state) => state.modal.certificate);
  const language = useSelector((state) => state.modal.language);
  const Skills = useSelector((state) => state.modal.skills);
  const Experience = useSelector((state) => state.modal.experience);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container>
          <Grid
            size={{ xs: 12, md: 3 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "98vh",
              color: "white",
              overflowY: "auto",
              overflowX: "hidden",
              bgcolor: "#000",
              p: 1,
              // Custom scrollbar styles
              "&::-webkit-scrollbar": {
                width: "6px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "#000", // track background
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#555", // scrollbar handle color
                borderRadius: "10px",
              },
              scrollbarWidth: "thin", // for Firefox

              scrollbarColor: "#555 #000", // thumb and track colors for Firefox
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                gap: 3,
                color: "#ffffff",
                height: "54px",
              }}
            >
              <PersonOutlineOutlinedIcon />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Basics
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar src={avimg} sx={{ width: "54px", height: "54px" }} />

                <input
                  accept="image/*"
                  type="file"
                  id="upload-photo"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />

                <label htmlFor="upload-photo">
                  <IconButton
                    color="primary"
                    component="span"
                    sx={{
                      position: "absolute",
                      bottom: -5,
                      right: -5,
                      backgroundColor: "white",
                      boxShadow: 1,
                      height: "18px",
                      width: "18px",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <CameraIcon fontSize="small" />
                  </IconButton>
                </label>
              </Box>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Picture</Typography>
                <span
                  style={{ display: "flex", gap: 10, alignItems: "center" }}
                >
                  <TextField
                    name="url"
                    value={formData?.url}
                    onChange={handleFormData}
                    sx={{
                      width: "255px",
                    }}
                  />
                  <SettingsInputSvideoRoundedIcon
                    style={{ width: "18px", height: "18px" }}
                  />
                </span>
              </span>
            </Box>
            {/*region full name  */}
            <Box sx={{ display: "flex", p: 1, flexDirection: "column" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>
                Full Name
              </Typography>
              <TextField
                name="fullname"
                value={formData?.fullname}
                onChange={handleFormData}
                sx={{
                  width: { xs: "90%", md: "190px" },
                }}
              />
            </Box>
            {/*region heading  */}
            <Box sx={{ display: "flex", p: 1, flexDirection: "column" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>
                Heading
              </Typography>
              <TextField
                name="heading"
                value={formData?.heading}
                onChange={handleFormData}
                sx={{
                  width: { xs: "90%", md: "190px" },
                }}
              />
            </Box>
            {/*region email and website  */}
            <Box
              sx={{
                width: "100%",
                flexDirection: "row",
                display: "flex",
                gap: 2,
                p: 1,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40%",
                }}
              >
                {" "}
                <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>
                  Email
                </Typography>
                <TextField
                  name="email"
                  value={formData?.email}
                  onChange={handleFormData}
                  sx={{
                    width: { xs: "90%", md: "100px", lg: "130px" },
                  }}
                />
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40%",
                }}
              >
                <span
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>
                    {formData?.label}
                  </Typography>
                  <RxPencil1
                    style={{ display: "flex", alignSelf: "flex-end" }}
                    onClick={() => setShowlabelInput((prev) => !prev)}
                  />
                </span>

                <TextField
                  name="website"
                  value={formData?.website}
                  onChange={handleFormData}
                  sx={{
                    width: { xs: "90%", md: "100px", lg: "130px" },
                  }}
                />
              </span>

              {showlabelInput && (
                <span style={{ width: "10%" }}>
                  {" "}
                  <TextField
                    name="label"
                    placeholder="Label"
                    value={formData?.label}
                    onChange={handleFormData}
                    sx={{
                      width: "90px",
                    }}
                  />
                </span>
              )}
            </Box>

            {/*region Phone no and Location  */}
            <Box
              sx={{
                width: "100%",
                flexDirection: "row",
                display: "flex",
                gap: 1,
                p: 1,
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40%",
                }}
              >
                {" "}
                <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>
                  Phone
                </Typography>
                <TextField
                  name="phone"
                  type="number"
                  value={formData?.phone}
                  onChange={handleFormData}
                  sx={{
                    width: { xs: "90%", md: "170px" },
                  }}
                />
              </span>
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "40%",
                }}
              >
                {" "}
                <Typography sx={{ fontSize: "14px", fontWeight: 550 }}>
                  Location
                </Typography>
                <TextField
                  name="location"
                  value={formData?.location}
                  onChange={handleFormData}
                  sx={{
                    width: { xs: "90%", md: "170px" },
                  }}
                />
              </span>
            </Box>
            {/* add new custom field part */}
            {addcustomfield.map((customitem, i) => (
              <Box
                key={i}
                sx={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  p: 1,
                  width: "100%",
                }}
              >
                <span
                  style={{
                    color: "white",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#464b40",
                    cursor: "pointer",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                    justifyContent: "center",
                  }}
                >
                  {" "}
                  <ViewCompactIcon style={{ fontSize: "18px" }} />{" "}
                </span>
                <span
                  style={{
                    color: "white",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    backgroundColor: "#464b40",
                    cursor: "pointer",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  <MailOutlineIcon style={{ fontSize: "18px" }} />{" "}
                </span>
                <TextField
                  name="name"
                  placeholder="Name"
                  value={customitem?.name}
                  onChange={(e) => handleFieldChange(e, i)}
                  // onChange={handleFormData}
                  sx={{
                    width: "155px",
                  }}
                />
                <TextField
                  name="value"
                  placeholder="Value"
                  value={customitem?.value}
                  onChange={(e) => handleFieldChange(e, i)}
                  sx={{
                    width: "155px",
                    alignSelf: "flex-end",
                  }}
                />
                <span
                  style={{
                    color: "white",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  <CloseIcon
                    style={{ fontSize: "28px" }}
                    onClick={() => handleRemoveField(i)}
                  />{" "}
                </span>
              </Box>
            ))}
            <Button
              variant="text"
              startIcon={<AddIcon />}
              sx={{
                color: "white",
                alignSelf: "flex-start",
                textTransform: "none",
              }}
              onClick={() => handleAddCustomField()}
            >
              Add a custom field
            </Button>
            <Divider
              // variant="inset"
              orientation="horizontal"
              sx={{
                textAlign: "center",
                border: "1px solid #27272a",
                mt: 4,
              }}
            />
            {/* Summary Part */}
            <Grid>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <LuSquareMenu
                    style={{ width: "18px", height: "18px", marginRight: 2 }}
                  />
                  <Typography>{formData?.title}</Typography>
                </span>
                <IconButton onClick={handleIconClick}>
                  <MenuIcon
                    sx={{ width: "18px", height: "18px", color: "white" }}
                  />
                </IconButton>

                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 1, bgcolor: "#000" }}>
                    {menuOptions?.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={(e) => {
                          if (option.value === "toggleSummary") {
                            setShowSummary((prev) => !prev);
                            handleClose(); // optional: close the popover
                          } else if (option.value === "rename") {
                            setSubMenuType("rename");
                            handleSubMenuOpen(e); // Open rename submenu
                          } else if (option.value === "column") {
                            setSubMenuType("column");
                            handleSubMenuOpen(e); // Open columns submenu
                          } else {
                            handleSelect(option.value);
                          }
                        }}
                        sx={{ ":hover": { bgcolor: "grey" }, bgcolor: "black" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            color: "white",
                            width: "100%",
                            gap: 2,
                            fontSize: "14px",
                            cursor: "pointer",
                            bgcolor: "#000",
                            ":hover": { bgcolor: "grey" },
                          }}
                        >
                          {option?.icon}
                          {option?.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Box>
                  {subMenuType && (
                    <Menu
                      open={openSubMenu}
                      anchorEl={subMenuAnchorEl}
                      onClose={handleSubMenuClose}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      sx={{ color: "white", height: "300px", overflow: "none" }}
                    >
                      {subMenuType.includes("rename") ? (
                        <MenuItem
                          disableRipple
                          sx={{
                            bgcolor: "black",
                            ":hover": {
                              bgcolor: "black",
                            },
                          }}
                        >
                          <TextField
                            placeholder="Enter new name"
                            size="small"
                            variant="outlined"
                            value={formData?.label || ""}
                            onChange={handleTextFieldChange}
                            sx={{ width: 200, bgcolor: "black" }}
                          />
                        </MenuItem>
                      ) : (
                        // Columns submenu
                        ["1 Column", "2 Columns", "3 Columns", "4 Columns"].map(
                          (label, index) => (
                            <MenuItem
                              key={label}
                              onClick={() => {
                                setSelectedColumns(index + 1); // Update column selection
                                handleSubMenuClose();
                                handleClose(); // Close both submenus
                              }}
                              sx={{
                                bgcolor: "black",
                                color: "white",
                                ":hover": { bgcolor: "grey" },
                              }}
                              // selected={selectedColumns === index + 1}
                            >
                              {label}
                            </MenuItem>
                          )
                        )
                      )}
                    </Menu>
                  )}
                </Popover>
              </Box>

              <Box
                sx={{
                  height: "235px",
                  overflow: "hidden",
                  borderRadius: "2px",

                  border: "1px solid #d3d3d3",
                  width: "100%",
                }}
              >
                <ReactQuill
                  theme="snow"
                  ref={quillRef}
                  // modules={modules}
                  value={formData?.summary}
                  onChange={handleSummaryChange}
                  name="summary"
                  placeholder="Compose your email"
                  style={{ width: "100%", height: "235px" }}
                />
              </Box>
            </Grid>
            {/* Profile part */}
            <Grid>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <ShareOutlined
                    style={{ width: "18px", height: "18px", marginRight: 2 }}
                  />
                  <Typography>{"Profile"}</Typography>
                </span>
                <IconButton onClick={handleIconClick2}>
                  <MenuIcon
                    sx={{ width: "18px", height: "18px", color: "white" }}
                  />
                </IconButton>

                {/* popover for profile */}
                <Popover
                  open={openprofile}
                  anchorEl={anchorElprofile}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 1, bgcolor: "#000" }}>
                    {ProfilemenuOptions?.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={(e) => {
                          if (option.value === "toggleProfile") {
                            setShowProfile((prev) => !prev);
                            handleClose(); // optional: close the popover
                          } else if (option.value === "renameprofile") {
                            setSubMenuType("renameprofile");
                            handleSubMenuOpen(e); // Open rename submenu
                          } else if (option.value === "columnprofile") {
                            setSubMenuType("columnprofile");
                            handleSubMenuOpen(e); // Open columns submenu
                          } else {
                            handleSelect(option.value);
                          }
                        }}
                        sx={{ ":hover": { bgcolor: "grey" }, bgcolor: "black" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            color: "white",
                            width: "100%",
                            gap: 2,
                            fontSize: "14px",
                            cursor: "pointer",
                            bgcolor: "#000",
                            ":hover": { bgcolor: "grey" },
                          }}
                        >
                          {option?.icon}
                          {option?.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Box>
                </Popover>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {showProfile && profiles.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      p: 2,
                      height: "10vh",
                      overflow: "auto",
                      maxHeight: "10vh",
                    }}
                  >
                    {profiles.map((profile, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: "6px",
                          }}
                        >
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            {profile.imgUrl && (
                              <Avatar src={`${profile.imgUrl}.png`} />
                            )}
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {profile.username}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              mr: 2,
                            }}
                          >
                            <CloseIcon
                              onClick={() => dispatch(removeProfileData(index))}
                            />
                            <EditIcon
                              sx={{ width: "20px", height: "20px" }}
                              onClick={() => {
                                dispatch(
                                  setSelectedProfile({ index, data: profile })
                                );
                                dispatch(openEditModal("profiles"));
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon style={{ fontSize: "14px" }} />}
                onClick={() => {
                  dispatch(openModal("profiles"));
                }}
              >
                Add Profile
              </Button>
            </Grid>
            {/* certification part */}
            <Grid sx={{ bgcolor: "#000" }}>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <RedeemOutlinedIcon
                    style={{ width: "18px", height: "18px", marginRight: 2 }}
                  />
                  <Typography>{"Cerification"}</Typography>
                </span>
                <IconButton
                //  onClick={handleIconClick2}
                >
                  <MenuIcon
                    sx={{ width: "18px", height: "18px", color: "white" }}
                  />
                </IconButton>

                {/* popover for profile */}
                {/* <Popover
                  open={openprofile}
                  anchorEl={anchorElprofile}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <Box sx={{ p: 1, bgcolor: "#000" }}>
                    {ProfilemenuOptions?.map((option) => (
                      <MenuItem
                        key={option.value}
                        onClick={(e) => {
                          if (option.value === "toggleProfile") {
                            setShowProfile((prev) => !prev);
                            handleClose(); // optional: close the popover
                          } else if (option.value === "renameprofile") {
                            setSubMenuType("renameprofile");
                            handleSubMenuOpen(e); // Open rename submenu
                          } else if (option.value === "columnprofile") {
                            setSubMenuType("columnprofile");
                            handleSubMenuOpen(e); // Open columns submenu
                          } else {
                            handleSelect(option.value);
                          }
                        }}
                        sx={{ ":hover": { bgcolor: "grey" }, bgcolor: "black" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            // justifyContent: "space-between",
                            color: "white",
                            width: "100%",
                            gap: 2,
                            fontSize: "14px",
                            cursor: "pointer",
                            bgcolor: "#000",
                            ":hover": { bgcolor: "grey" },
                          }}
                        >
                          {option?.icon}
                          {option?.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Box>
                </Popover> */}
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {certificate.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      p: 2,
                      height: "10vh",
                      overflow: "auto",
                      maxHeight: "10vh",
                    }}
                  >
                    {certificate.map((certificate, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: "6px",
                          }}
                        >
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {certificate?.name}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {certificate?.date}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              mr: 2,
                            }}
                          >
                            <CloseIcon
                              onClick={() =>
                                dispatch(removeCertificateData(index))
                              }
                            />
                            <EditIcon
                              sx={{ width: "20px", height: "20px" }}
                              onClick={() => {
                                dispatch(
                                  setSelectedProfile({
                                    index,
                                    data: certificate,
                                  })
                                );
                                dispatch(openEditModal("certificate"));
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon style={{ fontSize: "14px" }} />}
                onClick={() => dispatch(openModal("certificate"))}
              >
                Add Certification
              </Button>
            </Grid>
            {/* Experience part */}
            <Grid sx={{ bgcolor: "#000" }}>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <SchoolOutlinedIcon
                    style={{ width: "18px", height: "18px", marginRight: 2 }}
                  />
                  <Typography>{"Experience"}</Typography>
                </span>
                <IconButton
                //  onClick={handleIconClick2}
                >
                  <MenuIcon
                    sx={{ width: "18px", height: "18px", color: "white" }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {Experience.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      p: 2,
                      height: "10vh",
                      overflow: "auto",
                      maxHeight: "10vh",
                    }}
                  >
                    {Experience.map((experience, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: "6px",
                          }}
                        >
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {experience.experienceName}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              mr: 2,
                            }}
                          >
                            <CloseIcon
                              onClick={() => dispatch(removeExperience(index))}
                            />
                            <EditIcon
                              sx={{ width: "20px", height: "20px" }}
                              onClick={() => {
                                dispatch(
                                  setSelectedProfile({
                                    index,
                                    data: experience,
                                  })
                                );
                                dispatch(openEditModal("experience"));
                              }}
                            />
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon style={{ fontSize: "14px" }} />}
                onClick={() => dispatch(openModal("experience"))}
              >
                Add Experience
              </Button>
            </Grid>
            {/* Languagee part */}
            <Grid sx={{ bgcolor: "#000" }}>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <TranslateOutlinedIcon
                    style={{ width: "18px", height: "18px", marginRight: 2 }}
                  />
                  <Typography>{"Language"}</Typography>
                </span>
                <IconButton
                //  onClick={handleIconClick2}
                >
                  <MenuIcon
                    sx={{ width: "18px", height: "18px", color: "white" }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {language.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      p: 2,
                      height: "10vh",
                      overflow: "auto",
                      maxHeight: "10vh",
                    }}
                  >
                    {language.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: "6px",
                          }}
                        >
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {item.language}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                          <CloseIcon
                            sx={{ mr: 2.5 }}
                            onClick={() => dispatch(removeLanguage(index))}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon style={{ fontSize: "14px" }} />}
                onClick={() => dispatch(openModal("language"))}
              >
                Add Language
              </Button>
            </Grid>
            {/* Skills part */}
            <Grid sx={{ bgcolor: "#000" }}>
              <Box
                sx={{
                  display: "flex",
                  color: "white",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <AccountTreeOutlinedIcon
                    style={{ width: "18px", height: "18px", marginRight: 2 }}
                  />
                  <Typography>{"Skills"}</Typography>
                </span>
                <IconButton
                //  onClick={handleIconClick2}
                >
                  <MenuIcon
                    sx={{ width: "18px", height: "18px", color: "white" }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                {Skills.length > 0 && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                      p: 2,
                      height: "10vh",
                      overflow: "auto",
                      maxHeight: "10vh",
                    }}
                  >
                    {Skills.map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            pr: "6px",
                          }}
                        >
                          {" "}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 2,
                            }}
                          >
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {item.skillname}
                            </Typography>
                            <Typography
                              sx={{ fontSize: "14px", fontWeight: 400 }}
                            >
                              {item.skilldescription}
                            </Typography>
                          </Box>
                          <CloseIcon
                            sx={{ mr: 2.5 }}
                            onClick={() => dispatch(removeSkills(index))}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
              <Button
                variant="outlined"
                startIcon={<AddIcon style={{ fontSize: "14px" }} />}
                onClick={() => dispatch(openModal("skills"))}
              >
                Add Skills
              </Button>
            </Grid>
            {/* Theme option */}
            <Grid sx={{ width: "100%" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                Change Font Color
              </Typography>
              {["blue", "black", "#cf485f", "red", "purple", "white"].map(
                (color) => (
                  <IconButton
                    key={color}
                    onClick={() => handleColorChange(color)}
                  >
                    <Circle style={{ color }} />
                  </IconButton>
                )
              )}
              <Box>
                {" "}
                <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <Typography sx={{ color: "white" }}>Add Line</Typography>
                  <HorizontalRuleIcon
                    sx={{ width: "27px", color: "white", cursor: "pointer" }}
                    onClick={handleAddCustomLine}
                  />
                </Box>
                {customLines.map((line, i) => (
                  <Box
                    sx={{
                      display: "flex",
                      color: "white",
                      justifyContent: "space-between",
                    }}
                  >
                    {" "}
                    <Typography sx={{ fontSize: "12px" }} key={line?.id}>
                      line {i + 1}{" "}
                    </Typography>
                    <CloseIcon
                      sx={{ mr: 2.5 }}
                      onClick={() => handleRemoveLine(line?.id)}
                    />
                  </Box>
                ))}
              </Box>

              <div style={{ padding: 10, marginTop: 10 }}>
                <label style={{ marginRight: 8 }}>Pick a Custom Color:</label>
                <input
                  type="color"
                  value={mainboxstateColor}
                  onChange={(e) => {
                    setMainBoxStateColor(e.target.value);
                  }}
                />
              </div>
              <div style={{ padding: 10, height: "50px" }}>
                <label style={{ marginRight: 8 }}>Select Font Style:</label>
                <div style={{ maxHeight: "80px", overflowY: "auto" }}>
                  <TextField
                    value={fontFamily}
                    onClick={handleOpen}
                    inputRef={inputRef}
                    fullWidth
                    size="small"

                    // Prevent keyboard from editing directly
                  />

                  <Menu
                    anchorEl={anchorEll}
                    open={Boolean(anchorEll)}
                    onClose={handleCloseFont}
                    PaperProps={{
                      style: {
                        width: "200px",
                        display: "flex",
                        overflow: "auto",
                        height: "150px",
                      },
                    }}
                  >
                    {filteredFonts.length > 0 ? (
                      filteredFonts.map((font) => (
                        <MenuItem
                          key={font}
                          onClick={() => handleSelectFont(font)}
                          style={{
                            fontFamily: font,
                            fontSize: "12px",
                          }}
                        >
                          {font}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem disabled>No fonts found</MenuItem>
                    )}
                  </Menu>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 9 }}>
            <Resume
              showSummary={showSummary}
              selectedColumns={selectedColumns}
              showProfile={showProfile}
              img={avimg}
              textColor={textColor}
              selectedTheme={selectedTheme}
              mainboxstateColor={mainboxstateColor}
              fontFamily={fontFamily}
              customLines={customLines}
            />
          </Grid>
          {/* <Grid size={{ xs: 12, md: 1.2 }}>
            <Positions />
          </Grid> */}
        </Grid>
      </ThemeProvider>
      <Allmodal />
      <EditModal />
    </>
  );
}

export default ResumeBasics;
// Define reusable styles

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "white",
            height: "10px", // sets input height
            padding: "8px", // adjust as needed
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "13px",
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
            },
            "& .MuiOutlinedInput-input": {
              height: "18px", // Adjust the input height to fit within the total height of 30px
              padding: "6px 14px", // Adjust padding to vertically center the text
              fontSize: "11px",
            },
            height: {
              xl: "40px",
              lg: "30px",
              md: "30px",
              xs: "30px",
              sm: "30px",
            },
            width: { xs: "90%", md: "100px" },
          },

          "& .MuiInputLabel-root": {
            fontSize: {
              xl: "12px",
              lg: "10px",
              md: "10px",
              xs: "9px",
              sm: "9px",
            },
          },
          "& .MuiInputLabel-root.Mui-focused": {
            // color: "#0E6368",
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // border: "1.5px solid #0E6368",
          width: { xs: "90%", md: "100px" },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solidrgb(26, 27, 27)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solidrgb(39, 42, 43)",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "20px",
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "35px",
          color: "white",
          bgcolor: "#0d0d10",
          p: "5px",
          border: "1px solid grey",
          textTransform: "none",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          padding: "8px",
          fontSize: "14px",
        },
        icon: {
          color: "#1976d2", // Change dropdown arrow color
        },
      },
    },
  },
});
