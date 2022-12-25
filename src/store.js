import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './pages/Counter/counterSlice'
import authReducer from './slices/authSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
})