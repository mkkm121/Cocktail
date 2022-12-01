import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'https://cocktails-370319.uc.r.appspot.com/api/test/';
class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'all');
    }
    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }
}
export default new UserService();