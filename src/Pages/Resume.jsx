import {
  Grid,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  Link,
} from "@mui/material";
import AttachmentIcon from "@mui/icons-material/Attachment";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, { useEffect, useRef } from "react";
// import avimg from "../assets/Assets/avater1.png";
import { createWorker } from "tesseract.js";

import { useSelector } from "react-redux";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Rnd } from "react-rnd";
import html2pdf from "html2pdf.js";

function Resume({
  showSummary,
  selectedColumns,
  showProfile,
  img,
  textColor,
  mainboxstateColor,
  fontFamily,
  customLines,
}) {
  const resumeRef = useRef();

  const formData = useSelector((state) => state.form);
  const profiles = useSelector((state) => state.modal.profiles);
  const certificate = useSelector((state) => state.modal.certificate);
  const language = useSelector((state) => state.modal.language);
  const Skills = useSelector((state) => state.modal.skills);
  const Experience = useSelector((state) => state.modal.experience);
  const sectionOrder = useSelector((state) => state.modal.sectionOrder);
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

    if (!element) {
      console.error("Resume element not found");
      return;
    }

    try {
      // Convert HTML to canvas
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL("image/png");

      // PDF setup (A4 size: 210x297 mm)
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);

      const pdfWidth = 210;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("resume.pdf");
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  // const handleExportPDF = async () => {
  //   const element = resumeRef.current;

  //   // Temporarily remove the fixed height if any
  //   const originalHeight = element.style.height;
  //   element.style.height = "auto";

  //   // Wait for layout changes to apply
  //   await new Promise((resolve) => setTimeout(resolve, 0));

  //   const canvas = await html2canvas(element, { scale: 2 });
  //   const imgData = canvas.toDataURL("image/png");

  //   const pdf = new jsPDF("p", "pt", "a4");
  //   const pageHeight = pdf.internal.pageSize.height;
  //   const pageWidth = pdf.internal.pageSize.width;

  //   const imgWidth = pageWidth;
  //   const imgHeight = (canvas.height * pageWidth) / canvas.width;

  //   let heightLeft = imgHeight;
  //   let position = 0;

  //   // Add the first page
  //   pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //   heightLeft -= pageHeight;

  //   // Add extra pages if needed
  //   while (heightLeft > 0) {
  //     position = heightLeft - imgHeight;
  //     pdf.addPage();
  //     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  //     heightLeft -= pageHeight;
  //   }

  //   pdf.save("resume.pdf");

  //   // Restore original height if needed
  //   element.style.height = originalHeight;
  // };
  useEffect(() => {}, [fontFamily]);
  return (
    // <ThemeProvider theme={themes[selectedTheme]} key={selectedTheme}>

    <Grid
      container
      direction="column"
      sx={{
        minHeight: "98vh", // ensure full height
        // bgcolor: mainbg,
      }}
    >
      <Grid
        ref={resumeRef}
        // bgcolor={"white"}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "90vh",
          width: "100%",
          overflowX: "hidden",
          fontFamily: fontFamily,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            p: 1,
            // bgcolor: mainbg,
            bgcolor: mainboxstateColor,
            color: "#fff",
          }}
        >
          <Avatar src={img} sx={{ width: "54px", height: "54px" }} />
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              // color: "#ffffff",
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
                    <Typography
                      sx={{
                        ml: 0.5,
                        fontSize: "12px",
                        //    color: textColor,
                        fontFamily: fontFamily,
                        fontWeight: 700,
                      }}
                    >
                      {item.text}
                    </Typography>
                    {index < filteredItems.length - 1 && (
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    )}
                  </Box>
                ))}
            </Box>
          </span>
        </Box>
        {/* custom line */}
        <Rnd
          default={{ x: 50, y: 100, width: 300, height: 80 }}
          // bounds={"window"}
          style={{ padding: 1, border: "1px solid black" }}
        >
          {showSummary && (
            <Box
              sx={{
                display: "flex",
                width: "100%",
                p: 1.5,
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  //borderBottom: "1px solid black",
                  width: "100%",
                  display: "flex",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: 600,
                    width: "100%",
                    display: "flex",
                    color: textColor,
                    fontFamily: fontFamily,
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
                  fontSize: "14px",
                  color: textColor,
                  fontFamily: fontFamily,
                }}
                dangerouslySetInnerHTML={{ __html: formData?.summary }}
              />
            </Box>
          )}
        </Rnd>
        {customLines.map((line) => (
          <Rnd
            default={{
              x: 100,
              y: 200,
              width: "100px",
              height: "5px",
            }}
          >
            <Box key={line?.id} sx={{ mx: 1, border: "0.2px solid black" }} />
          </Rnd>
        ))}
        {/* profile part */}
        {showProfile && profiles?.length > 0 && (
          <Rnd
            default={{ x: 100, y: 100, width: 300, height: 80 }}
            bounds={"window"}
            style={{ padding: 1, border: "1px solid black" }}
          >
            {showProfile && profiles?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  p: 1.5,
                  fontFamily: fontFamily,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: textColor,
                    fontFamily: fontFamily,
                  }}
                >
                  Profile
                </Typography>

                {profiles.map((profile, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: 0.5,
                      mb: 1,
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,

                      width: "fit-content",
                      maxWidth: "100%",
                    }}
                  >
                    {profile.imgUrl && (
                      <Avatar
                        src={`${profile.imgUrl}.png`}
                        alt={profile.username}
                        sx={{
                          width: 36,
                          height: 36,
                        }}
                      />
                    )}

                    <Typography
                      sx={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: textColor,
                        fontFamily: fontFamily,
                      }}
                    >
                      {profile.username}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: textColor,
                        opacity: 0.8,
                        fontFamily: fontFamily,
                      }}
                    >
                      {profile.network}
                    </Typography>

                    <Link
                      href={profile.websitelink}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        fontSize: "14px",
                        fontWeight: 400,
                        color: "#1976d2",
                        fontFamily: fontFamily,
                        wordBreak: "break-word",
                        transition: "color 0.2s",
                        "&:hover": {
                          color: "#004ba0",
                        },
                      }}
                    >
                      {profile.websitelink}
                    </Link>
                  </Box>
                ))}
              </Box>
            )}
          </Rnd>
        )}
        {/* certificate part */}
        {certificate?.length > 0 && (
          <Rnd
            default={{ x: 100, y: 100, width: 300, height: 80 }}
            bounds={"window"}
            style={{ padding: 1, border: "1px solid black" }}
          >
            {certificate?.length > 0 && (
              <Box sx={{ width: "100%", p: 2 }}>
                <Typography
                  sx={{
                    // borderBottom: "1px solid rgb(0, 0, 0)",
                    // pb: 1,
                    mb: 0.5,
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: "15px",
                    fontWeight: 600,
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
                          p: 1.5,
                          // bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          height: "100%",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.00)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: textColor,
                            fontFamily: fontFamily,
                          }}
                        >
                          {certi?.name}
                        </Typography>

                        {certi?.certificationWeb && (
                          <Typography
                            component="a"
                            href={certi.certificationWeb}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{
                              color: textColor,
                              fontFamily: fontFamily,
                              textDecoration: "underline",
                              fontSize: "13px",
                            }}
                          >
                            View Certificate
                          </Typography>
                        )}

                        <Typography sx={{ fontSize: "14px", color: textColor }}>
                          Issued by: <strong>{certi.issuer}</strong>
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: textColor }}>
                          Date: {certi.date}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Rnd>
        )}
        {/* Skills part */}
        {Skills?.length > 0 && (
          <Rnd
            default={{ x: 100, y: 100, width: 300, height: 80 }}
            bounds={"window"}
            style={{ padding: 1, border: "1px solid black" }}
          >
            {Skills?.length > 0 && (
              <Box sx={{ width: "100%", p: 2 }}>
                <Typography
                  sx={{
                    // borderBottom: "1px solid rgb(0, 0, 0)",
                    // pb: 1,
                    mb: 0.5,
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Skills
                </Typography>

                <Grid container spacing={2}>
                  {Skills.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          p: 1.5,
                          // bgcolor: "white",
                          borderRadius: 2,
                          height: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: textColor,
                            fontFamily: fontFamily,
                          }}
                        >
                          {item?.skillname}
                        </Typography>

                        <Typography sx={{ fontSize: "14px", color: textColor }}>
                          Descripion: {item.skilldescription}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Rnd>
        )}
        {/* Language part */}
        {language?.length > 0 && (
          <Rnd
            default={{ x: 100, y: 100, width: 300, height: 80 }}
            bounds={"window"}
            style={{ padding: 1, border: "1px solid black" }}
          >
            {language?.length > 0 && (
              <Box sx={{ width: "100%", p: 2 }}>
                <Typography
                  sx={{
                    // borderBottom: "1px solid rgb(0, 0, 0)",
                    // pb: 1,
                    mb: 0.5,
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: "15px",
                    fontWeight: 600,
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
                          p: 1.5,
                          // bgcolor: "white",
                          borderRadius: 2,
                          height: "100%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: textColor,
                            fontFamily: fontFamily,
                          }}
                        >
                          {item?.language}
                        </Typography>

                        <Typography sx={{ fontSize: "14px", color: textColor }}>
                          Descripion: {item.description}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Rnd>
        )}
        {/* Experience part */}
        {Experience?.length > 0 && (
          <Rnd
            default={{ x: 100, y: 100, width: 300, height: 80 }}
            bounds={"window"}
            style={{ padding: 1, border: "1px solid black" }}
          >
            {Experience?.length > 0 && (
              <Box sx={{ width: "100%", p: 2 }}>
                <Typography
                  sx={{
                    // borderBottom: "1px solid rgb(0, 0, 0)",
                    // pb: 1,
                    mb: 0.5,
                    color: textColor,
                    fontFamily: fontFamily,
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  Experience
                </Typography>

                <Grid container spacing={2}>
                  {Experience.map((experience, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          p: 1.5,
                          // bgcolor: "white",
                          borderRadius: 2,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                          height: "100%",
                          transition: "transform 0.2s",
                          "&:hover": {
                            transform: "scale(1.00)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "bold",
                            fontSize: "15px",
                            color: textColor,
                            fontFamily: fontFamily,
                          }}
                        >
                          <strong>{experience.experienceName}</strong>
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: textColor }}>
                          {experience.experienceDescription}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: textColor }}>
                          Date From: {experience.datefrom}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", color: textColor }}>
                          Date To: {experience.dateto}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Rnd>
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
            // bgcolor: "black",
          }}
          onClick={handleExportPDF}
        >
          Export to pdf
        </Button>
      </Box>
    </Grid>
    // </ThemeProvider>
  );
}

export default Resume;
