"use strict";

import ChatExampleData from "../ChatExampleData";
import ChatWebAPIUtils from "../utils/ChatWebAPIUtils";
import MessageSection from "./chat/MessageSection.jsx";
import ThreadSection from "./chat/ThreadSection.jsx";

class ChatApp extends React.Component {
    constructor() {
        ChatExampleData.init(); // load example data into localstorage
        ChatWebAPIUtils.getAllMessages();
    }

    render() {
        return (
            <div className="chatapp">
                <ThreadSection />
                <MessageSection />
            </div>
        );
    }
}

export default ChatApp;