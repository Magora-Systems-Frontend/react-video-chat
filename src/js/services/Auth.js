import { LOGIN_URL, SIGNUP_URL } from "../constants/LoginConstants";
import LoginActions from "../actions/LoginActions";

class AuthService {

    login(username, password) {
        console.log('login')

//        return this.handleAuth(when(request({
//            url: LOGIN_URL,
//            method: 'POST',
//            crossOrigin: true,
//            type: 'json',
//            data: {
//                username, password
//            }
//        })));
    }

    logout() {
        console.log('logout')

        LoginActions.logoutUser();
    }

    signup(username, password, extra) {
        console.log('signup')

//        return this.handleAuth(when(request({
//            url: SIGNUP_URL,
//            method: 'POST',
//            crossOrigin: true,
//            type: 'json',
//            data: {
//                username, password, extra
//            }
//        })));
    }

    handleAuth(loginPromise) {
        return loginPromise
            .then(function(response) {
                var jwt = response.id_token;
                LoginActions.loginUser(jwt);
                return true;
            });
    }
}

export default new AuthService();