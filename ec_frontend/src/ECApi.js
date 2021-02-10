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
                `${BASE_URL}/${endpoint}`, {params: { _token, params}}
            )
        } else if (verb === 'post') {
            req = axios.post(
                `${}`
            )
        }
    }
}