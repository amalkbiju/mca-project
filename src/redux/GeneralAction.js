import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
  userDetails: {},
  alertMessages: [],
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
    addAlertMessagel: (state, action) => {
      // Corrected function name from "addAlertMessagel"
      if (!action.payload?.id) {
        action.payload.id = Date.now().toString();
      }
      state.alertMessages.push(action.payload);
    },

    removeAlertMessage: (state, action) => {
      return {
        ...state,
        alertMessages: state.alertMessages.filter(
          (alertMessage) => alertMessage?.id !== action.payload
        ),
      };
    },
  },
});

const GeneralAction = generalSlice.actions;
const GeneralReducer = generalSlice.reducer;

export { GeneralAction, GeneralReducer };
