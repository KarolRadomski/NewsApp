import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import commentsService from './commentsService';

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get comments for news
export const getCommentsForNews = createAsyncThunk(
  'comment/getCommentsForNews',
  async (id, thunkAPI) => {
    try {
      return await commentsService.getCommentsForNews(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsForNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCommentsForNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getCommentsForNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { commentsReset } = commentsSlice.actions;
export default commentsSlice.reducer;
