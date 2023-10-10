import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//env var
const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
    status: "",
    error: "",
    user: {
        id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: "",
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.status = "";
            state.error = "";
            state.user = {
                id: "",
                name: "",
                email: "",
                picture: "",
                status: "",
                token: "",
            }
        }
    },

    extraReducers(builder) {
        builder.addCase(RegisterUser.pending, (state, action) => {
            state.status = "loading";
            state.error = "";
        })
        .addCase(RegisterUser.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.error = "";
            state.user = action.payload.user;
        })
        .addCase(RegisterUser.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
    }
});

export const RegisterUser = createAsyncThunk("auth/register", 
    async (values, { rejectWithValue}) => {
    try {
        const { data } = await axios.post(`${AUTH_ENDPOINT}/register`, { ...values });
        return data;
    } catch (error) {
        return rejectWithValue(error.response.data.error.message);
    }
})

export const { logout } = userSlice.actions;

export default userSlice.reducer;