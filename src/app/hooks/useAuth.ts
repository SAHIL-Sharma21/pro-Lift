//cutom hooks for auth

import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../lib/redux/store';
import {registerUser, loginUser, logoutUser, getLoggedInUser} from '@/app/lib/redux/slices/authSlice';
import { RegisterUserCredentials, LoginUserCredentials } from '../types/user.types';


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error, accessToken} = useSelector((state: RootState) => state.auth);


    const register = async(userData: RegisterUserCredentials) => {
        return await dispatch(registerUser(userData));
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

    return {
        user,
        loading,
        error,
        accessToken,
        isAuthenticated: !!user,
        login,
        logout,
        register,
        getCurrentUser
    };

};
