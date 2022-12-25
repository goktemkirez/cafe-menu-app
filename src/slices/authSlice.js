import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    isLoggedIn: false, 
    displayName: "", 
    email: "", 
    photoURL: "", 
    userId: 0, 
    accessToken: "", 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
      state.displayName = action.payload.displayName
      state.email = action.payload.email
      state.photoURL = action.payload.photoURL
      state.userId = action.payload.userId
      state.accessToken = action.payload.accessToken
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.displayName = ""
      state.email = ""
      state.photoURL = ""
      state.userId = 0
      state.accessToken = ""
    },
  },
})

export const { login, logout, loginWithUser } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`

export const selectAuth = (state) => state.auth

export default authSlice.reducer