import axios from "axios";

export const axios_config = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});