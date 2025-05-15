import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ViewCompactIcon from "@mui/icons-material/ViewCompact";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import ViewComfyOutlinedIcon from "@mui/icons-material/ViewComfyOutlined";
import { GridView } from "@mui/icons-material";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { setSectionOrder } from "../Store/modalSlice";

function Positions() {
  const items = useSelector((state) => state.modal.sectionOrder);
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState("Summary");

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    dispatch(setSectionOrder(reorderedItems));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container p={"2px"}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-end",
            width: "100%",
            height: "97vh",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "black",
              width: "100%",
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <ViewComfyOutlinedIcon sx={{ width: "18px" }} />
              <Typography sx={{ fontSize: "22px", fontWeight: 600 }}>
                Layout
              </Typography>
            </Box>
            <ReplayOutlinedIcon sx={{ width: "18px" }} />
          </Box>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="positions">
              {(provided) => (
                <Box
                  sx={{ bgcolor: "#555555", width: "100%", height: "230px" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {items.map((item, index) => (
                    <Draggable key={item} draggableId={item} index={index}>
                      {(provided, snapshot) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          sx={{
                            display: "flex",

                            width: "100%",
                            bgcolor: "#555555",
                            mb: 1,
                            boxShadow: snapshot.isDragging
                              ? "0 0 10px #aaa"
                              : "none",
                          }}
                        >
                          <Box
                            onClick={() => setActiveSection(item)}
                            sx={{
                              display: "flex",
                              gap: 2,
                              alignItems: "center",
                              cursor: "pointer",
                              bgcolor: "black",
                              width: "100%",
                              px: 2,
                              transition: "background-color 0.3s",
                              "&:hover": {
                                bgcolor:
                                  activeSection === item
                                    ? "#bababa"
                                    : "#bababa",
                              },
                              height: "40px",
                            }}
                          >
                            <GridView sx={{ width: "14px", color: "white" }} />
                            <Typography sx={{ color: "white" }}>
                              {item}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}

export default Positions;
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
          fontSize: "18px",
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
