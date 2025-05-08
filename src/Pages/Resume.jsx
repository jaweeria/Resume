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
} from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect, useRef, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import avimg from "../assets/Assets/avater1.png";
import SettingsInputSvideoRoundedIcon from "@mui/icons-material/SettingsInputSvideoRounded";
import { useSelector } from "react-redux";
import avimg from "../assets/Assets/avater1.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Resume({ showSummary, selectedColumns, showProfile, img }) {
  const resumeRef = useRef();

  const formData = useSelector((state) => state.form);
  const { network, username, websitelink, imgUrl } = useSelector(
    (state) => state.modal
  );
  const profiles = useSelector((state) => state.modal.profiles);
  const certificate = useSelector((state) => state.modal.certificate);
  const language = useSelector((state) => state.modal.language);
  const items = [
    {
      icon: <LocationOnIcon sx={{ fontSize: "10px", color: "red" }} />,
      text: formData?.location,
    },
    {
      icon: <PhoneIcon sx={{ fontSize: "10px", color: "red" }} />,
      text: formData?.phone,
    },
    {
      icon: <Typography sx={{ fontSize: "10px", color: "red" }}>@</Typography>,
      text: formData?.email,
    },
    {
      icon: <AttachmentIcon sx={{ fontSize: "10px", color: "red" }} />,
      text: formData?.website,
    },
  ];
  const handleExportPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("resume.pdf");
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        minHeight: "98vh", // ensure full height
        bgcolor: "white",
      }}
    >
      <Grid
        ref={resumeRef}
        bgcolor={"white"}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          width: "100%",
          overflowX: "hidden",
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar src={img} sx={{ width: "54px", height: "54px" }} />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              {formData?.fullname !== "" && (
                <span name="fullname">{formData?.fullname}</span>
              )}
              {formData?.heading !== "" && (
                <span> {formData?.heading || ""}</span>
              )}
            </Box>
            <Box sx={{ display: "flex" }}>
              {items
                .filter((item) => item.text && item.text.trim() !== "")
                .map((item, index, filteredItems) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                  >
                    {item.icon}
                    <Typography sx={{ ml: 0.5, fontSize: "12px" }}>
                      {item.text}
                    </Typography>
                    {index < filteredItems.length - 1 && (
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ mx: 1, borderColor: "gray" }}
                      />
                    )}
                  </Box>
                ))}
            </Box>
          </span>
        </Box>
        {showProfile && profiles?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              p: 2,
            }}
          >
            <Box sx={{ borderBottom: "1px solid black", mb: 1 }}>
              <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                Profile
              </Typography>
            </Box>

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
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  {profile.imgUrl && <Avatar src={`${profile.imgUrl}.png`} />}
                  <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                    {profile.username}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 400 }}>
                  {profile.network}
                </Typography>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 400, color: "gray" }}
                >
                  {profile.websitelink}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        {showSummary && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              p: 2,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                borderBottom: "1px solid black",
                width: "100%",
                display: "flex",
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  width: "100%",
                  display: "flex",
                }}
              >
                {formData?.title}
              </Typography>
            </Box>
            <Box
              sx={{
                lineHeight: "20px",
                display: "block",
                justifyContent: "flex-start",
                p: 1,
                columnCount: selectedColumns,
                width: "80%",
                fontFamily: "sans-serif",
                fontSize: "14px",
              }}
              dangerouslySetInnerHTML={{ __html: formData?.summary }}
            />
          </Box>
        )}
        {/* Certification part */}
        {certificate?.length > 0 && (
          <Box sx={{ width: "100%", p: 2 }}>
            <Typography
              sx={{
                borderBottom: "1px solid rgb(0, 0, 0)",
                pb: 1,
                mb: 2,
                color: "#000",
                fontSize: "15px",
                fontWeight: 400,
              }}
            >
              Certificates
            </Typography>

            <Grid container spacing={2}>
              {certificate.map((certi, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 2,
                      bgcolor: "white",
                      borderRadius: 2,
                      boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                      height: "100%",
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.00)",
                      },
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                      {certi?.name}
                    </Typography>

                    {certi?.certificationWeb && (
                      <Typography
                        component="a"
                        href={certi.certificationWeb}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "#1976d2",
                          textDecoration: "underline",
                          fontSize: "13px",
                        }}
                      >
                        View Certificate
                      </Typography>
                    )}

                    <Typography sx={{ fontSize: "14px", color: "gray" }}>
                      Issued by: <strong>{certi.issuer}</strong>
                    </Typography>
                    <Typography sx={{ fontSize: "13px", color: "#555" }}>
                      Date: {certi.date}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {/* Language part */}
        {language?.length > 0 && (
          <Box sx={{ width: "100%", p: 2 }}>
            <Typography
              sx={{
                borderBottom: "1px solid rgb(0, 0, 0)",
                pb: 1,
                mb: 2,
                color: "#000",
                fontSize: "15px",
                fontWeight: 400,
              }}
            >
              Language
            </Typography>

            <Grid container spacing={2}>
              {language.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                      p: 2,
                      bgcolor: "white",
                      borderRadius: 2,
                      height: "100%",
                    }}
                  >
                    <Typography sx={{ fontWeight: "bold", fontSize: "15px" }}>
                      {item?.language}
                    </Typography>

                    <Typography sx={{ fontSize: "14px", color: "gray" }}>
                      Descripion: {item.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Grid>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          overflow: "hidden",
          justifyContent: "flex-end",
        }}
      >
        {" "}
        <Button
          variant="contained"
          sx={{
            height: "40px",
            width: 150,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            bgcolor: "black",
          }}
          onClick={handleExportPDF}
        >
          Export to pdf
        </Button>
      </Box>
    </Grid>
  );
}

export default Resume;
