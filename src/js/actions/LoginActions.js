import ChatAppDispatcher from "../app/dispatcher";
import {LOGIN_USER, LOGOUT_USER} from '../constants/LoginConstants.js';

let Navigation = ReactRouter.Navigation;

export default {
    loginUser: (jwt) => {
        Navigation.transitionTo("/");
        localStorage.setItem("jwt", jwt);

        ChatAppDispatcher.dispatch({
            actionType: LOGIN_USER,
            jwt:        jwt
        });
    },

    logoutUser: () => {
        Navigation.transitionTo("/login");
        localStorage.removeItem("jwt");

        ChatAppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}