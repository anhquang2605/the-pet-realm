import React, { use } from 'react';
import style from './chatbot.module.css';
import { insertToPostAPI } from '../../../libs/api-interactions';
import { useState, useEffect } from 'react';
import Chatbox from './chatbox/chatbox';
interface ChatbotProps {

}

const Chatbot: React.FC<ChatbotProps> = ({}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const handleMessageSending = async (message: string) => {
        const response = await sendMessageToOpenAI(message);
        console.log('OpenAI response:', response);
    }
    useEffect(() => {

    },[])
    useEffect(() => {
        if(messages.length > 0){
            const lastMessage = messages[messages.length - 1];
            //send last message to OpenAI
            handleMessageSending(lastMessage);
        }
    }, [messages])
    return (
        <>
            
            <section className={style['chatbot']}>
                Chatbot
                <Chatbox
                    setMessages={setMessages}
                    messages={messages}
                />
            </section>
        </>

    );
};
const sendMessageToOpenAI = async (message: string) => {
    const path = '/chat/route';
    const reponse = insertToPostAPI(path, {message});
    return reponse;
}

export default Chatbot;