import axios from "axios";

const user = axios.create({ baseURL: "http://localhost:5000" }) 
export const axiosInterceptor = ({ ...options }) => {
    user.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    const onSuccess = (response) => response
    const onError = (error) => {
        return error
    }

    return user(options).then(onSuccess).catch(onError)
}