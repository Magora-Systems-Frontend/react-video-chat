"use strict";

import io from 'socket.io-client';
import { LOGIN_URL, SIGNUP_URL } from "../constants/LoginConstants";
import LoginActions from "../actions/LoginActions";

class AuthService {
    login(login, password) {
        let socket = io.connect("http://localhost:8088"); //FIXME: Hardcode

        socket.emit("login", {login: login, password: password});
        console.info("Login sent");

        socket.on("setToken", LoginActions.loginUser);
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

    //handleAuth(loginPromise) {
    //    return loginPromise
    //        .then(function (response) {
    //            var jwt = response.id_token;
    //            LoginActions.loginUser(jwt);
    //            return true;
    //        });
    //}
}

export default new AuthService();