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
      let response = await commentsService.getCommentsForNews(id);
      response.reverse();
      return response;
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

// Increment like counter
export const incrementLikesCounter = createAsyncThunk(
  'comment/incrementLikesCounter',
  async (id, thunkAPI) => {
    try {
      return await commentsService.incrementLikesCounter(id);
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

// Decrement like counter
export const decrementLikesCounter = createAsyncThunk(
  'comment/decrementLikesCounter',
  async (id, thunkAPI) => {
    try {
      return await commentsService.decrementLikesCounter(id);
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

// Add new comment for news
export const setCommentsForNews = createAsyncThunk(
  'comment/addComment',
  async (commentData, thunkAPI) => {
    try {
      const id = commentData.newsID;
      const body = { text: commentData.text, username: commentData.username };

      return await commentsService.setCommentsForNews(id, body);
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

export const deleteComment = createAsyncThunk(
  'comment/deleteComment',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await commentsService.deleteComment(id, token);
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
        state.isSuccess = false;
        state.message = action.payload;
      })
      ///////////////////////
      .addCase(incrementLikesCounter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(incrementLikesCounter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.map((temp) => {
          return temp._id === action.payload._id
            ? (temp = action.payload)
            : temp;
        });
      })
      .addCase(incrementLikesCounter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      ///////////////////
      .addCase(decrementLikesCounter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(decrementLikesCounter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.map((temp) => {
          return temp._id === action.payload._id
            ? (temp = action.payload)
            : temp;
        });
      })
      .addCase(decrementLikesCounter.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      /////////////
      .addCase(setCommentsForNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setCommentsForNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.unshift(action.payload);
      })
      .addCase(setCommentsForNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      /////////////////////////
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload._id
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      });
    //////////////////////////
  },
});

export const { commentsReset } = commentsSlice.actions;
export default commentsSlice.reducer;
