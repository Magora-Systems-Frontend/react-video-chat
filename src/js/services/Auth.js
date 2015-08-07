"use strict";

import io from 'socket.io-client';
import { LOGIN_URL, SIGNUP_URL } from "../constants/LoginConstants";
import LoginActions from "../actions/LoginActions";

class AuthService {
    constructor() {
        this.socket = io.connect("http://localhost:8088"); //FIXME: Hardcode
    }

    login(login, password) {
        this.socket.emit("login", {login: login, password: password});
        console.info("Login sent");

        this.socket.on("setToken", LoginActions.loginUser);
    }

    logout() {
        console.info("logout")

        LoginActions.logoutUser();
    }

    signup(userName, email, password) {
        this.socket.emit("register", {userName: userName, email: email, password: password});
        console.info("Register sent");

        //socket.on("setToken", LoginActions.loginUser);

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