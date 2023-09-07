import BaseService from '../../@Core/Api/BaseService';

class AuthService extends BaseService {
   BASE_ENDPOINT = 'auth';

   postLogin(data: { email: string; password: string }) {
      return this.request.post('login', data);
   }
}

const authService = new AuthService();

export default authService;
