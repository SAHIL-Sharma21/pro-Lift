//making auth slice here.
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Customer, RegisterUserCredentials, LoginUserCredentials, ApiCallCredentials} from '@/app/types/user.types';

interface AuthState {
    user: Customer | null;
    loading: boolean;
    error: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
}

const initialState:AuthState = {
    user: null,
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null
}


//helper to handler auth tokens
const apiCall = async(credentials: ApiCallCredentials) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if(credentials.token){
        headers['Authorization'] = `Bearer ${credentials.token}`;
    }
    const response = await fetch(credentials.url, {
        method: credentials.method,
        headers,
        body: credentials.body ? JSON.stringify(credentials.body) : undefined,
    });

    if(!response.ok){
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred");
    }
    return response.json();
}
//asyn thunk method for api calls
export const registerUser = createAsyncThunk('auth/registerUser', async(userData: RegisterUserCredentials, {rejectWithValue}) => {
    try {
       const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData)
       });
       
       if(!response.ok){
        throw new Error("Failed to register user");
       }

       const data = await response.json();
       return data;
    } catch (error: any) {
        console.log("Error registering user: ", error?.message);
        return rejectWithValue(error?.message); //this have to change when implement axios
    }
});


export const loginUser = createAsyncThunk("auth/loginUser", async(credentials: LoginUserCredentials, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(credentials)
        });

        if(!response.ok){
            throw new Error("Failed to login user");
        }
        const data = await response.json();
        //if data is there then i can store token in localstorage
        if(data.data){
            localStorage.setItem("accessToken", data.data.accessToken);
            localStorage.setItem("refreshToken", data.data.refreshToken);
        }
        return data.data;
    } catch (error: any) {
        console.log("Error logging in user: ", error?.message)
        return rejectWithValue(error?.message);
    }
});


export const getLoggedInUser = createAsyncThunk('auth/getLoggedInUser', async(_,{rejectWithValue, getState}) => {
    try {
        const state = getState() as {auth: AuthState}

        if(state.auth.accessToken){
            const data = await apiCall({url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/getUser`, method: "GET", token: state.auth.accessToken, body: undefined});
            return data;
        }
        throw new Error("No access token available");
    } catch (error: any) {
        console.log("Error getting logged in user: ", error?.message)
        return rejectWithValue(error?.message);
    }
});


export const logoutUser = createAsyncThunk('auth/logoutUser', async(_,{getState, rejectWithValue}) => {
    try {
        const state = getState() as {auth: AuthState};
        
        if(state.auth.accessToken){
            const data = await apiCall({url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/logout`, method: "POST", token: state.auth.accessToken, body: undefined});
            console.log(data);
            if(localStorage.getItem("accessToken")){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            };
            return data;
        }
    } catch (error: any) {
        console.log("Error logging out User: ", error?.message)
        return rejectWithValue(error?.message);
    }
});


//implementing google login
export const googlLogin = createAsyncThunk('auth/googleLogin', async(token: string, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/google-login`, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({token})
        });

        if(!response.ok){
            throw new Error("Failed to login with google");
        }
        const data = await response.json();
        console.log(data.data);
        return data.data;
    } catch (error: any) {
        console.log("Error logging in with google: ", error?.message)
        return rejectWithValue(error?.message);
    }
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string  || "Failed to register user";
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken; 
                state.refreshToken = action.payload.refreshToken; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to login user";
            })
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to logout user";
            })
            .addCase(getLoggedInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.user = action.payload.user; 
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.loading = false;
                state.error = null;
            })
            .addCase(getLoggedInUser.rejected, (state, action) => {
                state.user = null;
                state.accessToken = null;
                state.refreshToken = null;
                state.loading = false;
                state.error = action.error.message as string || "Failed to get logged in user";
            })
            .addCase(googlLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(googlLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user,
                state.accessToken = action.payload.accessToken,
                state.refreshToken = action.payload.refreshToken
                state.error = null;
            })
            .addCase(googlLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to login with google";
            })
    }
});

export default authSlice.reducer;
