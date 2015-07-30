"use strict";

import ChatThreadActionCreators from "../../actions/ChatThreadActionCreators";

let cx = require("react/lib/cx");

let ReactPropTypes = React.PropTypes;

class ThreadListItem extends React.Component {
    render() {
        let thread      = this.props.thread,
            lastMessage = thread.lastMessage;

        return (
            <li className={cx({
                'thread-list-item': true,
                'active': thread.id === this.props.currentThreadID
            })} onClick={this._onClick.bind(this)}>

                <h5 className="thread-name">{thread.name}</h5>

                <div className="thread-time">
                    {lastMessage.date.toLocaleTimeString()}
                </div>

                <div className="thread-last-message">
                    {lastMessage.text}
                </div>
            </li>
        );
    }

    _onClick() {
        ChatThreadActionCreators.clickThread(this.props.thread.id);
    }
}

ThreadListItem.propTypes = {
    thread:          ReactPropTypes.object,
    currentThreadID: ReactPropTypes.string
};

export default ThreadListItem;