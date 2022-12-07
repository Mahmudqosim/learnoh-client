import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  enrollmentMap: null,
}

export const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    setEnrollment: (
      state,
      action
    ) => {
      state.enrollmentMap = action.payload.enrollmentMap
    },
    clearEnrollment: (state) => {
      state.enrollmentMap = null
    },
  },
})

export const enrollmentSelector = (state) => state.enrollment

export const { setEnrollment, clearEnrollment } = enrollmentSlice.actions

export default enrollmentSlice.reducer
