import axios from 'axios';

import { LOCAL_STORAGE_TOKEN_ID } from './App';

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001"



class ECApi {

    static async request(endpoint, data = {}, method = "get") {
        console.debug("API CALL:", endpoint, data, method)

        let _token = localStorage.getItem(LOCAL_STORAGE_TOKEN_ID)

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${_token}` };
        const params = (method === "get") 
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API ERROR:", err)
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    static async login(data) {
        let res = await this.request('login', data, 'post');
        return res.token
    }

    static async registerUser(data) {
        let res = await this.request('users', data, 'post')
        return res.token;
    }

    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch')
        return res.user;
    }

    static async getUser(username) {
        let res = this.request(`users/${username}`);
        return res.user;
    }

    static async getEmotions(num) {
        let res = await this.request(`emotions${num ? `/${num}` : ''}`)
        return res
    }









}

export default ECApi;