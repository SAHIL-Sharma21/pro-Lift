//cutom hooks for auth

import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../lib/redux/store';
import {registerUser, loginUser, logoutUser, getLoggedInUser,googlLogin, registerAdmin} from '@/app/lib/redux/slices/authSlice';
import { RegisterUserCredentials, LoginUserCredentials } from '../types/user.types';


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error, accessToken} = useSelector((state: RootState) => state.auth);


    const register = async(userData: RegisterUserCredentials) => {
        return await dispatch(registerUser(userData));
    }

    const admin = async(userData: RegisterUserCredentials) => {
        return await dispatch(registerAdmin(userData));
    }

    const login = async(userData: LoginUserCredentials) => {
        return await dispatch(loginUser(userData));
    }

    const logout = async() => {
        return await dispatch(logoutUser());
    }

    const getCurrentUser = async() => {
        return await dispatch(getLoggedInUser());
    }

    const googleLogin = async(token: string) => {
        return await dispatch(googlLogin(token))
    }

    return {
        user,
        loading,
        error,
        accessToken,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        admin,
        getCurrentUser,
        googleLogin
    };

};
