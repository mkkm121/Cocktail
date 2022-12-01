import React, {useEffect, useState} from "react";
import {Row} from "reactstrap";
import axios from "axios";
import {useLocation} from "react-router-dom";
import IngredientCard from "../components/IngredientCard/IngredientCard";
import SockJsClient from 'react-stomp';
import './LiveChat.css';
import Input from '../components/Input';
import LoginForm from '../components/LoginForm';
import Messages from '../components/Messages';
import chatAPI from '../services/chatAPI';
import { randomColor } from '../utils/common';

const SOCKET_URL = 'https://cocktails-370319.uc.r.appspot.com/ws-chat/';

function LiveChat() {
    const [messages, setMessages] = useState([])
    const [user, setUser] = useState(null)

    let onConnected = () => {
        console.log("Connected!!")
    }

    let onMessageReceived = (msg) => {
        console.log('New Message Received!!', msg);
        setMessages(messages.concat(msg));
    }

    let onSendMessage = (msgText) => {
        if(localStorage.getItem('user')) {
            setUser({
                username: JSON.parse(localStorage.getItem('user')).username,
                color: randomColor()
            })

            console.log(JSON.parse(localStorage.getItem('user')).id)
            console.log(JSON.parse(localStorage.getItem('user')).username)
            chatAPI.sendMessage(JSON.parse(localStorage.getItem('user')).username, msgText).then(res => {
                console.log('Sent', res);
            }).catch(err => {
                console.log('Error Occured while sending message to api');
            })
        }
    }

    let handleLoginSubmit = (username) => {
        console.log(username, " Logged in..");
    }

    return (
            <div className="App">
                {!!JSON.parse(localStorage.getItem('user')).username ?
                    (
                        <>
                            <SockJsClient
                                url={SOCKET_URL}
                                topics={['/topic/group']}
                                onConnect={onConnected}
                                onDisconnect={console.log("Disconnected!")}
                                onMessage={msg => onMessageReceived(msg)}
                                debug={false}
                            />
                            <Messages
                                messages={messages}
                                currentUser={user}
                            />
                            <Input onSendMessage={onSendMessage} />
                        </>
                    ) :
                    null
                }
            </div>
    )
}

export default LiveChat;
