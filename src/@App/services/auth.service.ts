import BaseService from '../../@Core/Api/BaseService';

class AuthService extends BaseService {
   BASE_ENDPOINT = 'auth';

   postLogin(data: { email: string; password: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/login', data);
   }

   getUser() {
      return this.request.get(this.BASE_ENDPOINT + '/getUser');
   }

   postLogout() {
      return this.request.post(this.BASE_ENDPOINT + '/logout');
   }
}

const authService = new AuthService();

export default authService;
