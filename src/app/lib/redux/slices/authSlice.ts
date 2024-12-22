//making auth slice here.
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {Customer, RegisterUserCredentials, LoginUserCredentials, ApiCallCredentials, ChangePassword} from '@/app/types/user.types';
import { RootState } from '../store';
import { apiCall } from '@/utils/apiCall';


interface AuthState {
    user: Customer | null;
    loading: boolean;
    error: string | null;
    accessToken?: string | null;
    refreshToken?: string | null;
    changePassword?: boolean;
}

const initialState:AuthState = {
    user: null,
    loading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
    changePassword: false,
}


//helper to handler auth tokens
const apiCallUsers = async(credentials: ApiCallCredentials) => {
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
    } catch (error) {
        console.log("Error registering user: ", error);
        return rejectWithValue(error instanceof Error ? error.message : "Failed to register user");
    }
});

export const registerAdmin = createAsyncThunk('auth/registerAdmin', async(userData: RegisterUserCredentials, {rejectWithValue}) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URI}/users/admin-register`, {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify(userData)
        });

        if(!response.ok){
            throw new Error("Failed to register admin");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error registering admin: ", error);
        return rejectWithValue(error instanceof Error ? error.message : "Failed to register admin");
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
    } catch (error) {
        console.log("Error logging in user: ", error)
        return rejectWithValue(error instanceof Error ? error.message : "Failed to login user");
    }
});


export const getLoggedInUser = createAsyncThunk('auth/getLoggedInUser', async(_,{rejectWithValue, getState}) => {
    try {
        const state = getState() as {auth: AuthState}

        if(state.auth.accessToken){
            const data = await apiCallUsers({url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/getUser`, method: "GET", token: state.auth.accessToken, body: undefined});
            return data;
        }
        throw new Error("No access token available");
    } catch (error) {
        console.log("Error getting logged in user: ", error)
        return rejectWithValue(error instanceof Error ? error.message : "Failed to get logged in user");
    }
});


export const logoutUser = createAsyncThunk('auth/logoutUser', async(_,{getState, rejectWithValue}) => {
    try {
        const state = getState() as {auth: AuthState};
        if(state.auth.accessToken){
            const data = await apiCallUsers({url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/logout`, method: "POST", token: state.auth.accessToken, body: undefined});
            if(localStorage.getItem("accessToken")){
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
            };
            return data;
        }
    } catch (error) {
        console.log("Error logging out User: ", error)
        return rejectWithValue(error instanceof Error ? error.message : "Failed to logout user");
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
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        return data.data;
    } catch (error) {
        console.log("Error logging in with google: ", error)
        return rejectWithValue(error instanceof Error ? error.message : "Failed to login with google");
    }
});

export const changePassword = createAsyncThunk('auth/changePassword', async(payload: ChangePassword, {rejectWithValue, getState}) => {
    try {
        const response = await apiCall({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URI}/users/change-password`,
            method: "POST",
            body: payload,
        }, getState as () => RootState);

        if(!response.ok){
            throw new Error("Failed to change password");
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        return rejectWithValue(error instanceof Error ? error.message : "Failed to change password");        
    }
})

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
            .addCase(registerAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
            })
            .addCase(registerAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to register admin"
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
                state.user = action.payload.user;
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.error = null;
            })
            .addCase(googlLogin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to login with google";
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changePassword.fulfilled, (state) => {
                state.loading = false;
                state.changePassword = true;
                state.error = null;
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as string || "Failed to change password";
            })
    }
});

export default authSlice.reducer;
