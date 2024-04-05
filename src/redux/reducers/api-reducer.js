import { createSlice } from "@reduxjs/toolkit";
import instance from "../../api";

const initialState = {
  loading: true,
  error: {
    status: false,
    message: "",
  },
  photos: [],
  rate_limit:{
    remaining:null,
    total:50,
  }
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.photos = [];
    },
    stopLoading: (state) => {
      state.loading = false;
    },
    saveData: (state, action) => {
      state.photos = action.payload;
    },
    catchError: (state, action) => {
      state.error.status = true;
      state.error.message = action.payload;
      state.photos = [];
    },
    cleanError: (state) => {
      state.error.status = false;
      state.error.message = "";
    },
    checkRateLimiter: (state,action)  =>{
      state.rate_limit={
        ...action.payload
      }
    }
  },
});

const { startLoading, saveData, stopLoading, cleanError, catchError, checkRateLimiter } =
  apiSlice.actions;
const { reducer } = apiSlice;

export const fetchData = (path) => async (dyspatch) => {
  dyspatch(startLoading());
  dyspatch(cleanError());
  try {
    const response = await instance.get(path);
    dyspatch(saveData(response.data));
    dyspatch(checkRateLimiter({
      total: response.headers['x-ratelimit-limit'],
      remaining: response.headers['x-ratelimit-remaining']
    }))
  } catch (error) {
    dyspatch(catchError(error.errors));
  }
  dyspatch(stopLoading());
};

export default reducer;
