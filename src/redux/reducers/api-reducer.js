import { createSlice} from "@reduxjs/toolkit"; //createAction
import instance from "../../api";
import {
  getItemFromLocalStorage,
  setLocalStorageItem,
} from "../../utils/helpers";



const path = getItemFromLocalStorage('query')?.path || ""
const itemPerPage = getItemFromLocalStorage("query")?.itemPerPage || null;
const type = getItemFromLocalStorage("query")?.type || "";
const query = getItemFromLocalStorage("query")?.query || "";

const initialState = {
  query: {
    path: path,
    itemPerPage: itemPerPage,
    type: type,
    query: query,
  },
  loading: true,
  error: {
    status: false,
    message: "",
  },
  photos: [],
  rate_limit: {
    remaining: null,
    total: 50,
  },
  pagination: {
    currentPage: 1,
    totalPage: null,
    hasNextPage: null,
    hasPrevPage: null,
  },
};

const isQuerySaved = (action) => {
  return action.type.endsWith("/saveQuery");
};

const apiSlice = createSlice({
  name: "photo",
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
    checkRateLimiter: (state, action) => {
      state.rate_limit = {
        ...action.payload,
      };
    },
    saveQuery: (state, action) => {
      state.query = { ...action.payload };
    },
    updatePage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    checkPagination: (state, action) => {
      state.pagination.hasNextPage = action.payload.hasNextPage;
      state.pagination.hasPrevPage = action.payload.hasPrevPage;
      state.pagination.totalPage = action.payload.totalPage;
    },
    extraReducer: (builder) => {
      builder.addMatcher(isQuerySaved, (state) => {
        setLocalStorageItem("query", state.query);
      });
    },
  },
});

const {
  startLoading,
  saveData,
  stopLoading,
  cleanError,
  catchError,
  checkRateLimiter,
  saveQuery,
  updatePage,
  checkPagination,
} = apiSlice.actions;

export { cleanError, catchError, saveQuery, updatePage };
const { reducer } = apiSlice;

export const fetchData = (path) => async (dispatch, getState) => {
  dispatch(startLoading());
  dispatch(cleanError());
  try {
    const response = await instance.get(path);
    dispatch(saveData(response.data));
    if (response?.data?.total === 0) {
      dispatch(catchError(["Nessuna foto per il termine cercato"]));
      return;
    }
    if (response?.data?.total_pages) {
      const { currentPage } = getState().photos.pagination;

      const paginationInfo = {
        hasNextPage: currentPage + 1 <= response?.data?.total_pages,
        hasPrevPage: currentPage > 1,
        totalPage: response?.data?.total_pages,
      };

      dispatch(checkPagination(paginationInfo));
    }
    dispatch(
      checkRateLimiter({
        total: response.headers["x-ratelimit-limit"],
        remaining: response.headers["x-ratelimit-remaining"],
      })
    );
  } catch (error) {
    dispatch(catchError(error.errors));
    console.log("errore!");
  } finally {
    dispatch(stopLoading());
    console.log("caricamento terminato");
  }
};

export default reducer;
