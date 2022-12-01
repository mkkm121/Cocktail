import React from 'react'

const Messages = ({ messages, currentUser }) => {

    let renderMessage = (message) => {
        const { sender, content, color } = message;
        let messageFromMe;
        if(currentUser)
            messageFromMe = currentUser.username === message.sender;
        else
           messageFromMe = false;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className}>
                <span
                    className="avatar"
                    style={{ backgroundColor: color }}
                />
                <div className="Message-content">
                    <div className="username">
                        {sender}
                    </div>
                    <div className="text">{content}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}


export default Messages