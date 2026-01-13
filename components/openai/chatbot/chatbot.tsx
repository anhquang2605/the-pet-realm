import React, { use } from 'react';
import style from './chatbot.module.css';
import { insertToPostAPI } from '../../../libs/api-interactions';
import { useState, useEffect } from 'react';
import Chatbox from './chatbox/chatbox';
import { Chat } from 'openai/resources';
import ChatToggleIcon from './chat-toggle-icon/chat-toggle-icon';
import CloseChatButton from './close-chat-button';
type ChatbotProps = Record<string, never>; // No props for now, this define that the component doesn't accept any props

const Chatbot: React.FC<ChatbotProps> = ({}) => {
    const [messages, setMessages] = useState<string[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const handleMessageSending = async (message: string) => {
        const response = await sendMessageToOpenAI(message);
        console.log('OpenAI response:', response);
    }
    const toggleChatbox = () => {
        setIsChatOpen(prev => !prev);
    }
    useEffect(() => {

    },[])
    useEffect(() => {
        if(messages.length > 0 && messages[messages.length - 1] !== '') {
            console.log(messages);
            const lastMessage = messages[messages.length - 1];
            //send last message to OpenAI
            handleMessageSending(lastMessage);
        }
    }, [messages])
    return (
        <>
            <section className={style['chatbot']}>
                  {
                    /* <CloseChatButton /> */
                    isChatOpen && 
                    <CloseChatButton onClick={() => toggleChatbox()} />
                }
                <ChatToggleIcon
                    isOpen={isChatOpen}
                    onClick={() => toggleChatbox()}
                />
                <Chatbox
                    setMessages={setMessages}
                    messages={messages}
                    isOpen={isChatOpen}
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