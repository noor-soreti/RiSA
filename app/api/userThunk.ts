import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axiosApiFunctions";

/*
createAsyncThunk 
-> used to create async action (thunk)
-> Redux Toolkit generates the following three actions:
    1. Pending: dispatched when async operation starts
    2. Fulfilled: dispatched when async operation succeeds
    3. Rejected: dispatched when async operation fails
-> these actions can be handled in extraReducers
*/

// thunk to handle user login
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({...userData} : any, {rejectWithValue}) => {
        try {
            const response = await api.post('/api/user/login', userData)
            if (response.status != 200) {
                throw new Error("Failed to login")
            }
            console.log(response.data);
            return response.data
        } catch (error : any) {
            if (error.status == 409) {
                console.log("409");
            }
            console.log(error);
            return null
        }
    }
)

// thunk to handle user signup
export const registerUser = createAsyncThunk(
    'user/registerUser',
    async ({...userData} : any, {rejectWithValue}) => {
        try {
            const response = await api.post('/api/user/register', userData)
            if (response.status != 200) {
                throw new Error("Failed to register user")
            }
            return response.data
        } catch (error : any) {
            if (error.status == 409) {
                console.log(error);
                return null
            }
            return null
        }
    }
)