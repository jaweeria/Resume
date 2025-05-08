// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalType: null,
    profiles: [],
    certificate: [],
    language: [],
    skills: [],
    experience: [],
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload; // payload is the type of modal
    },
    // Add a profile item
    addProfileData: (state, action) => {
      state.profiles.push(action.payload);
    },
    removeProfileData: (state, action) => {
      state.profiles.splice(action.payload, 1);
    },
    addCertificateData: (state, action) => {
      state.certificate.push(action.payload);
    },
    removeCertificateData: (state, action) => {
      state.certificate.splice(action.payload, 1);
    },
    addLanguage: (state, action) => {
      state.language.push(action.payload);
    },

    removeLanguage: (state, action) => {
      state.language.splice(action.payload, 1);
    },
    addSkills: (state, action) => {
      state.skills.push(action.payload);
    },

    removeSkills: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
    addExperience: (state, action) => {
      state.experience.push(action.payload);
    },

    removeExperience: (state, action) => {
      state.experience.splice(action.payload, 1);
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
  },
});

export const {
  openModal,
  closeModal,
  addProfileData,
  removeProfileData,
  addCertificateData,
  removeCertificateData,
  addLanguage,
  removeLanguage,
  addSkills,
  removeSkills,
  addExperience,
  removeExperience,
} = modalSlice.actions;
export default modalSlice.reducer;
