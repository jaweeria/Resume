import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  colors,
  Grid,
  TextField,
  createTheme,
  ThemeProvider,
  Button,
  LinearProgress,
  FormControl,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { closeEditModal, updateData } from "../Store/modalSlice";
import { RxPencil1 } from "react-icons/rx";
import { Circle } from "@mui/icons-material";
import { addProfileData } from "../Store/modalSlice";
import {
  LocalizationProvider,
  DatePicker,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import Slider from "@mui/material/Slider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { linearProgressClasses } from "@mui/material/LinearProgress";
import { enqueueSnackbar } from "notistack";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "#09090b",
  borderRadius: 2,
  boxShadow: 1,
  p: 4,
  outline: "none",
  color: "#ffffff",
};
function EditModal() {
  const { editmodalType, isEditOpen } = useSelector((state) => state.modal);
  const selectedProfileData = useSelector(
    (state) => state.modal.selectedProfile
  );
  const [showlabelInput, setShowlabelInput] = useState(false);
  const [network, setNetwork] = useState("");
  const [username, setUsername] = useState("");
  const [websitelink, setWebsitelink] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [name, setName] = useState("");
  const [issuer, setIssuer] = useState("");
  const [certificationdate, setCertificationDate] = useState(dayjs());
  const [certificationWeb, setCertificationWeb] = useState("");
  const [language, setlanguage] = useState("");
  const [description, setDescription] = useState("");
  const [skillname, setSkillname] = useState("");
  const [skilldescription, setSkillDescription] = useState("");
  const [experienceName, setexperienceName] = useState("");
  const [dateFrom, setdateFrom] = useState(dayjs());
  const [dateTo, setdateTo] = useState(dayjs());
  const [experienceDescription, setexperienceDescription] = useState("");
  const dispatch = useDispatch();
  const [value, setValue] = useState(60);

  // useEffect(() => {}, [selectedProfileData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    // Update description based on value
    if (newValue >= 0 && newValue <= 1) {
      editmodalType === "skills"
        ? setSkillDescription("Basic")
        : setDescription("Basic");
    } else if (newValue > 1 && newValue <= 3) {
      editmodalType === "skills"
        ? setSkillDescription("Intermediate")
        : setDescription("Intermediate");
    } else if (newValue > 3 && newValue <= 4) {
      editmodalType === "skills"
        ? setSkillDescription("Fluent")
        : setDescription("Fluent");
    } else if (newValue > 4 && newValue <= 5) {
      editmodalType === "skills"
        ? setSkillDescription("Excellent")
        : setDescription("Excellent");
    }
  };

  useEffect(() => {
    if (selectedProfileData?.data) {
      setNetwork(selectedProfileData.data.network || "");
      setUsername(selectedProfileData.data.username || "");
      setWebsitelink(selectedProfileData.data.websitelink || "");
      setImgUrl(selectedProfileData.data.imgUrl || "");
      setexperienceName(selectedProfileData?.data?.experienceName);
      setexperienceDescription(
        selectedProfileData?.data?.experienceDescription
      );
      setdateFrom(dayjs(selectedProfileData?.data?.datefrom));
      setdateTo(dayjs(selectedProfileData?.data?.dateto));
    }
  }, [selectedProfileData]);

  const handleUpdate = () => {
    // debugger;
    if (selectedProfileData?.index === undefined) return;

    let updatedData;
    const datefrom = dayjs(dateFrom).format("MM-DD-YYYY");
    const dateto = dayjs(dateTo).format("MM-DD-YYYY");
    // Conditionally prepare payloads
    switch (editmodalType) {
      case "certificate":
        const date = dayjs(certificationdate).format("MM-DD-YYYY");
        updatedData = {
          name,
          issuer,
          date,
          certificationWeb,
        };
        break;
      case "profiles":
        updatedData = {
          network,
          username,
          websitelink,
          imgUrl,
        };
        break;
      case "experience":
        updatedData = {
          experienceName,
          experienceDescription,
          datefrom,
          dateto,
        };
        break;

      case "skills":
        updatedData = {
          skillname,
          skilldescription,
        };
        break;

      default:
        return;
    }
    console.log(updateData.network, "updated data");

    dispatch(
      updateData({
        type: editmodalType,
        index: selectedProfileData.index,
        updatedData,
      })
    );

    dispatch(closeEditModal());
  };

  const renderModalContent = () => {
    switch (editmodalType) {
      case "profiles":
        return (
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Network</Typography>
              <TextField
                fullWidth
                placeholder="GitHub"
                value={network}
                // defaultValue={selectedProfileData?.data?.network}
                onChange={(e) => setNetwork(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>User Name</Typography>
              <TextField
                fullWidth
                placeholder="John.wickles"
                value={username}
                // defaultValue={selectedProfileData?.data?.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid container size={{ xs: 12 }}>
              <Typography>Website</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ width: "90%" }}
                  placeholder="https://github.com/johnwickles"
                  value={websitelink}
                  // defaultValue={selectedProfileData?.data?.websitelink}
                  onChange={(e) => setWebsitelink(e.target.value)}
                />

                <RxPencil1
                  style={{
                    display: "flex",
                    alignSelf: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowlabelInput((prev) => !prev)}
                />
                {showlabelInput && (
                  <TextField
                    name="label"
                    placeholder="Label"
                    sx={{
                      position: "absolute",
                      bottom: 75,
                      right: 0,
                      transform: "translateY(1%)", // Show right below the icon
                      width: "140px",
                      zIndex: 10,
                      backgroundColor: "black", // Ensure it doesn’t blend into background
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography>Icon</Typography>
              <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <Circle sx={{ width: "50px", height: "50px" }} />
                <span
                  style={{
                    width: "100%",
                  }}
                >
                  {" "}
                  <TextField
                    fullWidth
                    placeholder="github"
                    value={imgUrl}
                    // defaultValue={selectedProfileData?.data?.imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                  />
                  <Typography
                    sx={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "gray",
                      mt: 1,
                    }}
                  >
                    Powered by Simple Icons
                  </Typography>
                </span>
              </Box>
            </Grid>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",

                width: "100%",
              }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 600,
                  textTransform: "none",
                  cursor: "pointer",
                }}
                onClick={() => handleUpdate("profiles")}
              >
                Update Profile
              </Button>
            </Box>
          </Grid>
        );
      case "language":
        return (
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Name</Typography>
              <TextField
                fullWidth
                placeholder="English"
                value={language}
                onChange={(e) => setlanguage(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Description</Typography>
              <TextField
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography>Level</Typography>
              <Slider
                value={value}
                onChange={handleChange}
                aria-label="Progress"
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={1}
                defaultValue={1}
                sx={{ color: "white" }}
              />
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 600,
                  textTransform: "none",
                }}
                // onClick={AddLanguage}
              >
                Add
              </Button>
            </Box>
          </Grid>
        );
      case "skills":
        return (
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Name</Typography>
              <TextField
                fullWidth
                placeholder="web-developer"
                value={skillname}
                onChange={(e) => setSkillname(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Description</Typography>
              <TextField
                fullWidth
                value={skilldescription}
                onChange={(e) => setSkillDescription(e.target.value)}
                disabled
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography>Level</Typography>
              <Slider
                value={value}
                onChange={handleChange}
                aria-label="Progress"
                valueLabelDisplay="auto"
                min={0}
                max={5}
                step={1}
                defaultValue={1}
                sx={{ color: "white" }}
              />
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 600,
                  textTransform: "none",
                }}
                // onClick={AddSkills}
              >
                Add Skills
              </Button>
            </Box>
          </Grid>
        );
      case "education":
        return (
          <Typography variant="body1">This is the Education modal.</Typography>
        );
      case "experience":
        return (
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Name</Typography>
              <TextField
                fullWidth
                placeholder="MaxRemind"
                value={experienceName}
                onChange={(e) => setexperienceName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Description</Typography>
              <TextField
                fullWidth
                value={experienceDescription}
                onChange={(e) => setexperienceDescription(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Date From</Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    disableFuture
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: {
                          // Label color
                          "& .MuiInputLabel-root": {
                            color: "#ffffff",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ffffff",
                          },

                          // Date text color (multiple targets for safety)
                          "& input": {
                            color: "#ffffff",
                            backgroundColor: "#000000", // Set it explicitly
                            "-webkit-text-fill-color": "#ffffff", // This is the key!
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                          "& .MuiInputBase-input": {
                            color: "#ffffff",
                          },

                          // Background and border
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#000000",
                            "& fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0E6368",
                            },
                          },

                          // Calendar icon
                          "& .MuiSvgIcon-root": {
                            color: "#ffffff",
                            fontSize: "16px",
                          },

                          width: "100%",
                          height: "40px",
                          overflow: "hidden",
                        },
                      },
                    }}
                    value={dayjs(dateFrom)}
                    onChange={(newValue) => {
                      setdateFrom(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Date To</Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={dayjs(dateTo)}
                    disableFuture
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: {
                          // Label color
                          "& .MuiInputLabel-root": {
                            color: "#ffffff",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ffffff",
                          },

                          // Date text color (multiple targets for safety)
                          "& input": {
                            color: "#ffffff",
                            backgroundColor: "#000000", // Set it explicitly
                            "-webkit-text-fill-color": "#ffffff", // This is the key!
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                          "& .MuiInputBase-input": {
                            color: "#ffffff",
                          },

                          // Background and border
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#000000",
                            "& fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0E6368",
                            },
                          },

                          // Calendar icon
                          "& .MuiSvgIcon-root": {
                            color: "#ffffff",
                            fontSize: "16px",
                          },

                          width: "100%",
                          height: "40px",
                          overflow: "hidden",
                        },
                      },
                    }}
                    onChange={(newValue) => {
                      setdateTo(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",

                width: "100%",
              }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 600,
                  textTransform: "none",
                }}
                onClick={() => handleUpdate("experience")}
              >
                Update {editmodalType}
              </Button>
            </Box>
          </Grid>
        );
      case "reference":
        return (
          <Typography variant="body1">This is the Reference modal.</Typography>
        );
      case "certificate":
        return (
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Name</Typography>
              <TextField
                fullWidth
                placeholder="john"
                // value={name}
                defaultValue={selectedProfileData?.data?.name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Issuer</Typography>
              <TextField
                fullWidth
                placeholder="John wick"
                // value={issuer}
                defaultValue={selectedProfileData?.data?.issuer}
                onChange={(e) => setIssuer(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Date</Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    disableFuture
                    defaultValue={dayjs(selectedProfileData?.data?.date)}
                    slotProps={{
                      textField: {
                        size: "small",
                        sx: {
                          // Label color
                          "& .MuiInputLabel-root": {
                            color: "#ffffff",
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#ffffff",
                          },

                          // Date text color (multiple targets for safety)
                          "& input": {
                            color: "#ffffff",
                            backgroundColor: "#000000", // Set it explicitly
                            "-webkit-text-fill-color": "#ffffff", // This is the key!
                            transition: "background-color 5000s ease-in-out 0s",
                          },
                          "& .MuiInputBase-input": {
                            color: "#ffffff",
                          },

                          // Background and border
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "#000000",
                            "& fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&:hover fieldset": {
                              borderColor: "#ffffff",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#0E6368",
                            },
                          },

                          // Calendar icon
                          "& .MuiSvgIcon-root": {
                            color: "#ffffff",
                            fontSize: "16px",
                          },

                          width: "100%",
                          height: "40px",
                          overflow: "hidden",
                        },
                      },
                    }}
                    onChange={(newValue) => {
                      setCertificationDate(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid container size={{ xs: 12, md: 6 }}>
              <Typography>Website</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ width: "90%" }}
                  placeholder="https://udemy.com/certificate"
                  // value={certificationWeb}
                  defaultValue={selectedProfileData?.data?.certificationWeb}
                  onChange={(e) => setCertificationWeb(e.target.value)}
                />

                <RxPencil1
                  style={{
                    display: "flex",
                    alignSelf: "flex-end",
                    cursor: "pointer",
                  }}
                  onClick={() => setShowlabelInput((prev) => !prev)}
                />
                {showlabelInput && (
                  <TextField
                    name="label"
                    placeholder="Label"
                    sx={{
                      position: "absolute",
                      bottom: 75,
                      right: 0,
                      transform: "translateY(1%)", // Show right below the icon
                      width: "140px",
                      zIndex: 10,
                      backgroundColor: "black", // Ensure it doesn’t blend into background
                    }}
                  />
                )}
              </Box>
            </Grid>

            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",

                width: "100%",
              }}
            >
              {" "}
              <Button
                variant="contained"
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  bgcolor: "white",
                  color: "black",
                  fontWeight: 600,
                  textTransform: "none",
                }}
                onClick={() => handleUpdate("certificate")}
              >
                Update {editmodalType}
              </Button>
            </Box>
          </Grid>
        );
      // Add more cases as needed
      default:
        return <Typography>No content available.</Typography>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={isEditOpen} onClose={() => dispatch(closeEditModal())}>
        <Box sx={style}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography
              variant="h6"
              component="h2"
              sx={{ textTransform: "capitalize" }}
            >
              Edit {editmodalType}
            </Typography>
            <IconButton onClick={() => dispatch(closeEditModal())}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          {renderModalContent()}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default EditModal;
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            fontSize: "13px",
            minHeight: "30px", // force outer input height
            "&:hover fieldset": {
              borderColor: "#1f1f22",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3f3f4a",
            },
            "& .MuiOutlinedInput-input": {
              padding: "6px 10px", // adjust to center text
              fontSize: "11px",
              lineHeight: "1.4",
              height: "18px", // direct input height
            },
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
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 10,
          borderRadius: 5,
          [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor: "#fffffff", // background track color
          },
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor: "#ffffff", // progress color
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
            border: "1.5px solid rgb(26, 27, 27)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "1.5px solid rgb(39, 42, 43)",
          },
          "& .Mui-disabled": {
            WebkitTextFillColor: "#656567", // Ensures color shows even when disabled
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: "15px",
          fontWeight: 400,
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
