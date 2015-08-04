"use strict";

import ChatAppDispatcher from "../app/dispatcher";
import RouterContainer from "../services/RouterContainer";
import {LOGIN_USER, LOGOUT_USER} from "../constants/LoginConstants.js";
import {Navigation} from "react-router";

export default {
    loginUser: (message) => {
        var savedToken = sessionStorage.getItem("videoChat");

        message.token = "yhju"; //FIXME: Debug purposes

        if (savedToken !== message.token) {
            let nextPath = RouterContainer.get().getCurrentQuery().nextPath || "/";

            RouterContainer.get().transitionTo(nextPath);

            console.info("transitionTo", nextPath);

            sessionStorage.setItem("videoChat", message.token);
        }

        ChatAppDispatcher.dispatch({
            actionType: LOGIN_USER,
            message:    message
        });
    },

    logoutUser: () => {
        RouterContainer.get().transitionTo("/login");
        sessionStorage.removeItem("videoChat");

        ChatAppDispatcher.dispatch({
            actionType: LOGOUT_USER
        });
    }
}