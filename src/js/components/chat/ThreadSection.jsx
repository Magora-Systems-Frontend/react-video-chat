"use strict";

import MessageStore from "../../stores/MessageStore";
import ThreadListItem from "./ThreadListItem.jsx";
import ThreadStore from "../../stores/ThreadStore";
import UnreadThreadStore from "../../stores/UnreadThreadStore";

function getStateFromStores() {
    return {
        threads:         ThreadStore.getAllChrono(),
        currentThreadID: ThreadStore.getCurrentID(),
        unreadCount:     UnreadThreadStore.getCount()
    };
}

class ThreadSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromStores();
    }

    componentDidMount() {
        ThreadStore.addChangeListener(this._onChange.bind(this));
        UnreadThreadStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        ThreadStore.removeChangeListener(this._onChange.bind(this));
        UnreadThreadStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        let threadListItems = this.state.threads.map(function (thread) {
            return (
                <ThreadListItem
                    key={thread.id}
                    thread={thread}
                    currentThreadID={this.state.currentThreadID}
                    />
            );
        }, this);

        let unread = this.state.unreadCount === 0
            ? null
            : <span>Unread threads: {this.state.unreadCount}</span>;

        return (
            <div className="thread-section">
                <div className="thread-count">
                    {unread}
                </div>

                <ul className="thread-list">
                    {threadListItems}
                </ul>
            </div>
        );
    }

    /**
     * Event handler for 'change' events from the stores
     */
    _onChange() {
        this.setState(getStateFromStores());
    }

}

export default ThreadSection;