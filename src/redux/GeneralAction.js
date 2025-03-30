import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
  userDetails: {},
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

const GeneralAction = generalSlice.actions;
const GeneralReducer = generalSlice.reducer;

export { GeneralAction, GeneralReducer };
