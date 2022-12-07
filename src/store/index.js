import { combineReducers } from "redux"
import { configureStore, createAction } from "@reduxjs/toolkit"

import { authApi } from "../services/auth/authApi"
import authReducer from "../services/auth/authSlice"
import enrollmentReducer from "../services/enrollment/enrollmentSlice"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import { courseApi } from '../services/course/courseApi';
import { enrollmentApi } from '../services/enrollment/enrollmentApi';

export const resetStore = createAction("resetStore")

const rootReducer = combineReducers({
  auth: authReducer,
  enrollment: enrollmentReducer,
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
  [enrollmentApi.reducerPath]: enrollmentApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, courseApi.middleware, enrollmentApi.middleware),
})

setupListeners(store.dispatch)

