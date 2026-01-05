import React, { use } from 'react';
import style from './chatbot.module.css';
import { insertToPostAPI } from '../../../libs/api-interactions';
import { useState, useEffect } from 'react';
interface ChatbotProps {

}

const Chatbot: React.FC<ChatbotProps> = ({}) => {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        
    },[])
    return (
        <div className={style['chatbot']}>
            Chatbot
        </div>
    );
};
const sendMessageToOpenAI = async (message: string) => {
    const path = '/chat';
    const reponse = insertToPostAPI(path, {message});
    return reponse;
}

export default Chatbot;