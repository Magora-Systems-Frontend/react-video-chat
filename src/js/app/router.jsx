"use strict";

// Components
import App from "../components/app.jsx";
import Home from "../components/home.jsx";
import NotFound from "../components/not-found.jsx";
import About from "../components/about.jsx";


// Dependencies
let Route = ReactRouter.Route;
let DefaultRoute = ReactRouter.DefaultRoute;
let NotFoundRoute = ReactRouter.NotFoundRoute;

var routes = (
    <Route path="/" handler={App}>
        <DefaultRoute handler={Home}/>
        <NotFoundRoute handler={NotFound}/>
        <Route path="about" handler={About}/>
    </Route>
);

ReactRouter.run(routes, function (Handler) {
    React.render(<Handler/>, document.querySelector("#app"));
});

// Via HTML5 history API:
//
// Router.run(routes, Router.HistoryLocation, function (Handler) {
//   React.render(<Handler/>, document.querySelector('app'));
// });
