import axios from 'axios';
import { TOKEN_ID } from './App';

const BASE_URL = +process.env.BASE_URL || "http://localhost:3001"

//this needs to be finished
//see backend for what you need to put here

class ECApi {
    static async request(endpoint, params = {}, verb = "get") {
        let _token = localStorage.getItem(TOKEN_ID);

        console.debug("API Call:", endpoint, params, verb);

        let req;

        if (verb === 'get') {
            req = axios.get(
                `${BASE_URL}/${endpoint}`, { _token, ...params}
            );
        } else if (endpoint === 'login') {
            req = axios.post(
                `${BASE_URL}/${endpoint}`, { ...params }
            );
        } else if (verb === 'post') {
            req = axios.post(
                `${BASE_URL}/${endpoint}`, {_token, ...params}
            );
        } else if (verb === 'patch') {
            req = axios.patch(
                `${BASE_URL}/${endpoint}`, {_token, ...params}
            );
        } else if (verb === 'delete') {
            req = axios.delete(
                `${BASE_URL}/${endpoint}`, {_token }    
            )
        }

        console.log(req)

        try {

            return await req.data
            
        } catch (e) {
            console.error("API Error:", e.response);
            let msg = e.response.data.message;
            throw Array.isArray(msg) ? msg : [msg];
        }
    }

    static async getUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    static async registerUser(data) {
        let res = await this.request('users', data, 'post');
        return res.token;
    }

    static async updateUser(username, data) {
        let res = await this.request(`users/${username}`, data, 'patch')
        return res.user
    }

    static async deleteUser(username) {
        let res = await this.request(`users/${username}`, {}, 'delete');
        return res;
    }

    static async login(data) {
        let res = await this.request('login', data, 'post');
        return res.token;
    }

    static async getEntry(date, username) {
        let res = await this.request(`diaries/${date}`, username);
        return res.entry
    }

    static async getEntries(username) {
        let res = await this.request('diaries', username);
        return res.entries;
    }

    //need a function to get a particular month

    static async makeEntry(data) {
        let res = await this.request('diaries', data, 'post');
        return res.entry;
    }

    static async getEmotions(num) {
        console.log(`resources/emotions${num ? `/${num}` : ''}`)
        console.log('before request')
        // let res = await this.request(`resources/emotions${num ? `/${num}` : ''}`);
        let res = await this.request(`resources/emotions/20`);
        console.log('after request')
        console.log('this is the res', res)
        return res
    }

    static async getPrompt() {
        let res = await this.request('resources/prompt');
        return res.prompt;
    }

    static async getFlaggedPrompts() {
        let res = await this.request('resourecs/prompts/flagged')
        return res.prompts;
    }

    static async getPrompts(num) {
        let res = await this.request(`resources/prompts${num ? `/${num}` : ''}`)
        return res.prompts;
    }

    static async makePrompt(data) {
        let res = await this.request('/prompts', data, 'post');
        return res.prompt;
    }

    static async changePromptFlag(id) {
        let res = await this.request(`resources/prompts/${id}`, {}, 'patch');
        return res.prompt;
    }

    static async deletePrompt(id) {
        let res = await this.request(`resources/prompts${id}`, {}, 'delete');
        return res;
    }

    static async getInspiration() {
        let res = await this.request('resources/inspiration');
        return res.inspiration;
    }

    static async getFlaggedInspirations() {
        let res = await this.request('resourecs/inspirations/flagged')
        return res.inspirations;
    }

    static async getInspirations(num) {
        let res = await this.request(`resources/inspirations${num ? `/${num}` : ''}`)
        return res.inspirations;
    }

    static async makeInspiration(data) {
        let res = await this.request('/inspirations', data, 'post');
        return res.inspiration;
    }

    static async changeInspirationFlag(id) {
        let res = await this.request(`resources/inspirations/${id}`, {}, 'patch');
        return res.inspiration;
    }

    static async deleteInspiration(id) {
        let res = await this.request(`resources/inspirations${id}`, {}, 'delete');
        return res;
    }
}

export default ECApi;