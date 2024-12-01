import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
    baseURL: 'https://car-doctor-server-v2-gig906v28-codtob.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            console.log('Error tracked in the interceptor', error.response)
            if (error.response.status === 401 || error.response.status === 401) {
                console.log('Logout the user');
                logout()
                    .then(() => { navigate('/login') })
                    .catch(error => console.log(error))
            }
        })
    }, [logout, navigate])

    return axiosSecure;
};

export default useAxiosSecure;