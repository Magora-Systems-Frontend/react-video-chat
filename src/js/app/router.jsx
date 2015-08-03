"use strict";

// Components
import App from "../components/App.jsx";
import Home from "../components/Home.jsx";
import NotFound from "../components/NotFound.jsx";
import About from "../components/About.jsx";
import Login from "../components/Login.jsx";
import Logout from "../components/Logout.jsx";
import ChatApp from "../components/ChatApp.jsx";
import Register from "../components/Register.jsx";

import LoginActions from "../actions/LoginActions";

// Dependencies
let Route = ReactRouter.Route;
let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;

let routes = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={Home} />
        <NotFoundRoute handler={NotFound} />
        <Route path="about" handler={About} />
        <Route path="chat" handler={ChatApp} />
        <Route name="signup" handler={Register} />
        <Route name="login" handler={Login} />
        <Route path="logout" handler={Logout} />
    </Route>
);

let jwt = localStorage.getItem("jwt");

if (jwt) {
    LoginActions.loginUser(jwt);
}

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler />, document.querySelector("#app"));
});

// Via HTML5 history API:
//
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.querySelector('app'));
// });