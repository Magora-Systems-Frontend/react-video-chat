"use strict";

import React from "react";

let ReactPropTypes = React.PropTypes;

class MessageListItem extends React.Component {
    render() {
        let message = this.props.message;

        return (
            <li className="message-list-item">
                <h5 className="message-author-name">{message.authorName}</h5>

                <div className="message-time">
                    {message.date.toLocaleTimeString()}
                </div>

                <div className="message-text">{message.text}</div>
            </li>
        );
    }
}

MessageListItem.propTypes = {
    message: ReactPropTypes.object
};

export default MessageListItem;