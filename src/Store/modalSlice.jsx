// modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    isEditOpen: false,
    modalType: null,
    editmodalType: null,
    profiles: [],
    certificate: [],
    language: [],
    skills: [],
    experience: [],
    selectedProfile: null,
    sectionOrder: [
      "Summary",
      "Profile",
      "Certification",
      "Experience",
      "Skills",
      "Language",
    ],
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload; // payload is the type of modal
    },
    openEditModal: (state, action) => {
      state.isEditOpen = true;
      state.editmodalType = action.payload;
    },
    closeEditModal: (state) => {
      state.isEditOpen = false;
      state.editmodalType = null;
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
    //getting data for updation
    setSelectedProfile: (state, action) => {
      state.selectedProfile = action.payload;
    },
    clearSelectedProfile: (state) => {
      state.selectedProfile = null;
    },
    setSectionOrder: (state, action) => {
      state.sectionOrder = action.payload; // payload is the reordered array
    },

    //update data
    // updateData: (state, action) => {
    //   const { index, updatedData } = action.payload;
    //   if (state.profiles[index]) {
    //     state.profiles[index] = { ...state.profiles[index], ...updatedData };
    //   }
    // },
    updateData: (state, action) => {
      const { type, index, updatedData } = action.payload;

      if (state[type] && Array.isArray(state[type])) {
        state[type][index] = { ...state[type][index], ...updatedData };
      }
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
  openEditModal,
  closeEditModal,
  updateData,
  setSelectedProfile,
  clearSelectedProfile,
  setSectionOrder,
} = modalSlice.actions;
export default modalSlice.reducer;
