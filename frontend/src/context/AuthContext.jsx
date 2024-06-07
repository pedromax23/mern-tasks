import { createContext, useContext, useEffect, useState } from "react";
import Cookie from 'js-cookie';
import axios from '../api/axios';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(true);

    const login = async (data) => {
        try {
            const res = await axios.post('/login', data)
            setUser(res.data);
            setIsAuth(true);

            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }

    const register = async (data) => {
        try {
            const res = await axios.post('/register', data)
            setUser(res.data);
            setIsAuth(true);

            return res.data;
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }

            setErrors([error.response.data.message])
        }
    }

    const logout = async () => {
        const res = await axios.post('/logout');
        setUser(null);
        setIsAuth(false);
    }

    useEffect(() => {
        setLoading(true);
        if (Cookie.get('token')) {
            axios.get('/profile')
                .then((res) => {
                    setUser(res.data);
                    setIsAuth(true);
                })
                .catch((err) => {
                    setUser(null);
                    setIsAuth(false);
                })
        }
        setLoading(false);
    }, [])

    useEffect(() => {
        const clean = setTimeout(() => {
            setErrors(null)
        }, 5000)

        return () => clearTimeout(clean);
    }, [errors])

    return <AuthContext.Provider value={{
        user,
        isAuth,
        errors,
        register,
        login,
        logout,
        loading,
    }}>
        {children}
    </AuthContext.Provider>
};