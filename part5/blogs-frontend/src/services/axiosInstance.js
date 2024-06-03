import axios from 'axios';
import { useContext } from 'react';
import { AuthStateContext } from '../App'

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            //const { setIsLoggedIn } = useContext(AuthStateContext);
            //setIsLoggedIn(false);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
