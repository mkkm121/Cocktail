import axios from "axios";

const chatAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        console.log(groupId)
        return axios.get(`http://localhost:8080/api/messages/${groupId}`);
    },

    sendMessage: (username, text) => {
        let msg = {
            sender: username,
            content: text
        }
        console.log(msg)
        return axios.post(`http://localhost:8080/api/send`, msg);
    }
}


export default chatAPI;