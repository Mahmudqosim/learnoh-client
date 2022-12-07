import { createSlice } from "@reduxjs/toolkit"


const initialState = {
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.user = action.payload.user
      
      localStorage.setItem("token", action.payload.token)
    },
    setUser: (state, action) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null

      localStorage.removeItem("token")
    }
  },
})

export const authSelector = (state) => state.auth

export const { setToken, setUser, clearUser } = authSlice.actions

export default authSlice.reducer
