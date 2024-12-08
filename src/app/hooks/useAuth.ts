//cutom hooks for auth

import {useDispatch, useSelector} from 'react-redux';
import { AppDispatch, RootState } from '../lib/redux/store';
import {registerUser, loginUser, logoutUser, getLoggedInUser,googlLogin, registerAdmin, changePassword} from '@/app/lib/redux/slices/authSlice';
import { RegisterUserCredentials, LoginUserCredentials, ChangePassword } from '../types/user.types';
import { useCallback } from 'react';


export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {user, loading, error, accessToken} = useSelector((state: RootState) => state.auth);


    const register = useCallback(async(userData: RegisterUserCredentials) => {
        return await dispatch(registerUser(userData));
    }, [dispatch]);

    const admin = useCallback(async(userData: RegisterUserCredentials) => {
        return await dispatch(registerAdmin(userData));
    }, [dispatch]);

    const login = useCallback(async(userData: LoginUserCredentials) => {
        return await dispatch(loginUser(userData));
    }, [dispatch]);

    const logout = useCallback(async() => {
        return await dispatch(logoutUser());
    }, [dispatch]);

    const getCurrentUser = useCallback(async() => {
        return await dispatch(getLoggedInUser());
    }, [dispatch]);

    const googleLogin = useCallback(async(token: string) => {
        return await dispatch(googlLogin(token))
    }, [dispatch]);

    const passwordChange = useCallback(async(payload: ChangePassword) => {
        return await dispatch(changePassword(payload));
    }, [dispatch]);

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
        googleLogin,
        passwordChange
    };

};
