import axios from "axios";

const chatAPI = {
    getMessages: (groupId) => {
        console.log('Calling get messages from API');
        console.log(groupId)
        return axios.get(`https://cocktails-370319.uc.r.appspot.com/api/messages/${groupId}`);
    },

    sendMessage: (username, text) => {
        let msg = {
            sender: username,
            content: text
        }
        console.log(msg)
        return axios.post(`https://cocktails-370319.uc.r.appspot.com/api/send`, msg);
    }
}


export default chatAPI;