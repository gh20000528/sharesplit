import axios from 'axios';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3003/api';

export const loginWithGoogle = () => {
    window.location.href = `http://localhost:3003/auth/google`;
}

export const logout = async () => {
    const res = await axios.get(`${API_URL}/user/logout`);
    return res.data
}

export const getUserProfile = async () => {
    const token = Cookies.get('session')
    
    const res = await axios.get(`${API_URL}/user/profile`, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return res.data
}