import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice'
import authReducer from '../features/adminAuth/authSlice'

export const store = configureStore({
  reducer: {
   news: newsReducer,
   auth: authReducer
  },
});
