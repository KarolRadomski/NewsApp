import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import newsService from './newsService';

const initialState = {
  news: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

//Get all news

export const getNews = createAsyncThunk('news/getAll', async (_, thunkAPI) => {
  try {
    return await newsService.getNews();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Get one news

export const getOneNews = createAsyncThunk(
  'news/getOne',
  async (id, thunkAPI) => {
    try {
      return await newsService.getOneNews(id);
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

//Add the news by Admin
export const addNews = createAsyncThunk(
  'news/setNews',
  async (newsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;

      return await newsService.addNews(newsData, token);
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

//Edit the news by Admin
export const editNews = createAsyncThunk(
  'news/editNews',
  async (newsData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await newsService.editNews(newsData, token, newsData._id);
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

//Delete the news by Admin
export const deleteNews = createAsyncThunk(
  'news/deleteNews',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.admin.token;
      return await newsService.deleteNews(id, token);
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

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    newsReset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = action.payload;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(getOneNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = action.payload;
      })
      .addCase(getOneNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(addNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news.push(action.payload);
      })
      .addCase(addNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(editNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = state.news.map((temp) => {
          return temp._id === action.payload._id
            ? (temp = action.payload)
            : temp;
        });
      })
      .addCase(editNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.news = state.news.filter(
          (newses) => newses._id !== action.payload._id
        );
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      });
  },
});

export const { newsReset } = newsSlice.actions;
export default newsSlice.reducer;
