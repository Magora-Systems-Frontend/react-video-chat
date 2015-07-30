"use strict";

let RouteHandler = ReactRouter.RouteHandler;

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    }

    /**
     * Handle click event
     * @param {string} source
     * @param {SyntheticEvent} event
     */
    onClick(source, event) {
        if (source === "main") {
            // Always close nav drawer if main was clicked
            this.setState({open: false});
        } else {
            // Otherwise toggle open
            this.setState({open: !this.state.open});
        }
    }

    render() {
        let open = {open: this.state.open};

        return (
            <div>
                <RouteHandler/>
            </div>
        )
    }
}

export default App;
