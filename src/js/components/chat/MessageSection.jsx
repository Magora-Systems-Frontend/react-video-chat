"use strict";

import MessageComposer from "./MessageComposer.jsx";
import MessageListItem from "./MessageListItem.jsx";
import MessageStore from "../../stores/MessageStore";
import ThreadStore from "../../stores/ThreadStore";

function getStateFromStores() {
    return {
        messages: MessageStore.getAllForCurrentThread(),
        thread:   ThreadStore.getCurrent()
    };
}

function getMessageListItem(message) {
    return (
        <MessageListItem
            key={message.id}
            message={message}
            />
    );
}

class MessageSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = getStateFromStores();
    }

    componentDidMount() {
        this._scrollToBottom();
        MessageStore.addChangeListener(this._onChange.bind(this));
        ThreadStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        MessageStore.removeChangeListener(this._onChange.bind(this));
        ThreadStore.removeChangeListener(this._onChange.bind(this));
    }

    render() {
        let messageListItems = this.state.messages.map(getMessageListItem);

        return (
            <div className="message-section">
                <h3 className="message-thread-heading">{this.state.thread.name}</h3>

                <ul className="message-list" ref="messageList">
                    {messageListItems}
                </ul>

                <MessageComposer threadID={this.state.thread.id}/>
            </div>
        );
    }

    componentDidUpdate() {
        this._scrollToBottom();
    }

    _scrollToBottom() {
        //noinspection JSUnresolvedVariable
        let ul = this.refs.messageList.getDOMNode();
        ul.scrollTop = ul.scrollHeight;
    }

    /**
     * Event handler for 'change' events from the MessageStore
     */
    _onChange() {
        this.setState(getStateFromStores());
    }

}

export default MessageSection;