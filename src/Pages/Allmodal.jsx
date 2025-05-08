import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  addCertificateData,
  addLanguage,
  closeModal,
} from "../Store/modalSlice";
import { RxPencil1 } from "react-icons/rx";
import { Circle } from "@mui/icons-material";
import { addProfileData } from "../Store/modalSlice";
import {
  LocalizationProvider,
  DatePicker,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { linearProgressClasses } from "@mui/material/LinearProgress";

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
function Allmodal() {
  const { isOpen, modalType } = useSelector((state) => state.modal);
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
  const dispatch = useDispatch();

  const handleCreate = () => {
    const newProfile = {
      network,
      username,
      websitelink,
      imgUrl,
    };

    dispatch(addProfileData(newProfile));

    // Optional: Reset form
    setNetwork("");
    setUsername("");
    setWebsitelink("");
    setImgUrl("");
  };
  const handleCreateCertificate = () => {
    const date = dayjs(certificationdate).format("MM-DD-YYYY");
    const newcertificate = {
      name,
      issuer,
      date,
      certificationWeb,
    };
    dispatch(addCertificateData(newcertificate));
    console.log(newcertificate, "ffdsf");
    setName("");
    setIssuer("");
    setCertificationDate("");
    setCertificationWeb("");
  };
  const AddLanguage = () => {
    const newData = {
      language,
      description,
    };
    dispatch(addLanguage(newData));
    setlanguage("");
    setDescription("");
  };

  if (!open) return null;
  const renderModalContent = () => {
    switch (modalType) {
      case "profile":
        return (
          <Grid container spacing={1}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Network</Typography>
              <TextField
                fullWidth
                placeholder="GitHub"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>User Name</Typography>
              <TextField
                fullWidth
                placeholder="John.wickles"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12 }} spacing={0.3}>
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
                }}
                onClick={handleCreate}
              >
                Create
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
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography>Level</Typography>
              <LinearProgress variant="determinate" value={60} />
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
                onClick={AddLanguage}
              >
                Add
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
          <Typography variant="body1">This is the Experience modal.</Typography>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Issuer</Typography>
              <TextField
                fullWidth
                placeholder="John wick"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography>Date</Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
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

                          // Selected date text color
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

                          width: {
                            xs: "100%",
                            sm: "100%",
                            md: "190px",
                            lg: "130px",
                            xl: "170px",
                          },
                        },
                      },
                    }}
                    // value={certificationdate && dayjs(certificationdate)}
                    onChange={(newValue) => {
                      setCertificationDate(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} spacing={0.3}>
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
                  value={certificationWeb}
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
                onClick={handleCreateCertificate}
              >
                Create
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
      <Modal open={isOpen} onClose={() => dispatch(closeModal())}>
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
              {modalType} Modal
            </Typography>
            <IconButton onClick={() => dispatch(closeModal())}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Box>
          {renderModalContent()}
        </Box>
      </Modal>
    </ThemeProvider>
  );
}

export default Allmodal;
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
