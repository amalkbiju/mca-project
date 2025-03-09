import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

const GeneralAction = generalSlice.actions;
const GeneralReducer = generalSlice.reducer;

export { GeneralAction, GeneralReducer };
