import { createSlice } from "@reduxjs/toolkit";

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("isDarkTheme");
  if (savedTheme !== null) {
    return JSON.parse(savedTheme);
  }
  return false; // Default to light theme
};

const initialState = {
  isDarkTheme: getInitialTheme(),
};

const darkModeSlice = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    changeThemeToDark: (state) => {
      state.isDarkTheme = true;
      localStorage.setItem("isDarkTheme", "true");
    },
    changeThemeToLight: (state) => {
      state.isDarkTheme = false;
      localStorage.setItem("isDarkTheme", "false");
    },
  },
});

export const { changeThemeToDark, changeThemeToLight } = darkModeSlice.actions;

export default darkModeSlice.reducer;
