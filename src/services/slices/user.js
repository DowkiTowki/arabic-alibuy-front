import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { setToken, removeToken } from '../../hooks/useToken';
import axiosInstance from "../../services/axiosConfig"; 
// import Cookies from 'js-cookie';

const initialState = {
  user: {
    id: null,
    clubpoints : null,
    phone: null,
    name: null,
    email: null,
    // earnings: null,
  },
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const getPriceList = createAsyncThunk(
  "getPricesFa",
  async (lang) => {
    try {
      // storeSlice.actions.setFetchLoading(true);
      const response = await axiosInstance.post("/price-list/"+lang);
      console.log(response.data.payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const checkUserToken = createAsyncThunk(
  "auth/checkUserToken",
  async () => {
    if (!!localStorage.getItem("auth_token") === true) {
      try {
        userSlice.actions.setFetchLoading(true);
        const response = await axiosInstance.post("/auth/verify");
        return response.data;
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("No token available");
    }
  }
);

export const getClubWallet = createAsyncThunk(
  'user/getClubWallet',
  async (page = 1) => {
    if(!!localStorage.getItem('auth_token') == true){
    try {
      // userSlice.actions.setFetchLoading(true);
      const response = await axiosInstance.post('/customer/club-wallet?page='+page);
      return response.data;
    } catch (error) {
      throw error;
    }    
  }else {
    throw new Error('No token available');
  }
  }
);

export const getReward = createAsyncThunk(
  'user/getReward',
  async (id) => {
    if(!!localStorage.getItem('auth_token') == true){
    try {
      // userSlice.actions.setFetchLoading(true);
      const response = await axiosInstance.post('/customer/get-reward',{reward_id:id});
      return response.data;
    } catch (error) {
      throw error;
    }    
  }else {
    throw new Error('No token available');
  }
  }
);

export const getClubRewards = createAsyncThunk(
  'user/getClubRewards',
  async (page = 1) => {
    if(!!localStorage.getItem('auth_token') == true){
    try {
      // userSlice.actions.setFetchLoading(true);
      const response = await axiosInstance.post('/customer/club-rewards?page='+page);
      return response.data;
    } catch (error) {
      throw error;
    }    
  }else {
    throw new Error('No token available');
  }
  }
);

export const getClubFaqs = createAsyncThunk(
  'user/getClubFaqs',
  async () => {
    if(!!localStorage.getItem('auth_token') == true){
    try {
      // userSlice.actions.setFetchLoading(true);
      const response = await axiosInstance.post('/customer/club-faqs');
      return response.data;
    } catch (error) {
      throw error;
    }    
  }else {
    throw new Error('No token available');
  }
  }
);


export const getMyRewards = createAsyncThunk(
  'user/getMyRewards',
  async () => {
    if(!!localStorage.getItem('auth_token') == true){
    try {
      // userSlice.actions.setFetchLoading(true);
      const response = await axiosInstance.post('/customer/my-rewards');
      return response.data;
    } catch (error) {
      throw error;
    }    
  }else {
    throw new Error('No token available');
  }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.isAuthenticated = true;
      const { payload } = action;
      state.user = payload;
      // setToken(payload.auth_token);
    },
    clearUser(state) {
      state.user = initialState.user;
      state.isAuthenticated = false;
      // removeToken();
    },    
    setFetchLoading(state,action) {
      state.isLoading = action;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(checkUserToken.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      const { payload } = action;
      state.user = payload.data;
    })
    .addCase(checkUserToken.rejected, (state, action) => {
      state.user = initialState.user;
      state.isAuthenticated = false;
      // state.isLoading = false;
    });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectError = (state) => state.user.error;

export default userSlice.reducer;
