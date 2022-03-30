import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import authReducer from '../features/adminAuth/authSlice';
import commentsReducer from '../features/comments/commentsSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
});
