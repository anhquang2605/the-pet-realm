import React, { use } from 'react';
import style from './chatbot.module.css';
import { insertToPostAPI } from '../../../libs/api-interactions';
import { useState, useEffect } from 'react';
import Chatbox from './chatbox/chatbox';
import { Chat } from 'openai/resources';
import ChatToggleIcon from './chat-toggle-icon/chat-toggle-icon';
import CloseChatButton from './close-chat-button';
import { set } from 'mongoose';
type ChatbotProps = Record<string, never>; // No props for now, this define that the component doesn't accept any props

const Chatbot: React.FC<ChatbotProps> = ({}) => {
    const [messageStream, setMessageStream] = useState<string[]>([]);
    const [sentMessages, setSentMessages] = useState<string[]>([]);
    const [reponses, setReponses] = useState<string[]>([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [sendingMessage, setSendingMessage] = useState<string>("");
    const [isReponding, setIsResponding] = useState(false);
    const handleMessageSending = async (message: string) => {
        /* const response = await sendMessageToOpenAI(message);
        console.log('OpenAI response:', response); */
        setIsResponding(true);
        const reponse = await sendMessageToMockOpenAI(message);
        setSentMessages(prev => [...prev, message]);
        setReponses(prev => [...prev, reponse]);
        setMessageStream(prev => [...prev, message, reponse]);
        setIsResponding(false);
        return 
    }
    const sendMessageToMockOpenAI = async (message: string) => {
       //have a timeout to return a mock response in 1000ms
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                const mockResponse = `This is a mock response to your message: "${message}"`;
                //update sentMessages and reponses state
                resolve(mockResponse);
            }, 1000);
        });
    }
    const toggleChatbox = () => {
        setIsChatOpen(prev => !prev);
    }
    useEffect(() => {
        
    },[])
    //when user sends a message
    useEffect(() => {
        if(sendingMessage && sendingMessage.length > 0) {

           //send last message to OpenAI
            handleMessageSending(sendingMessage);

        }
    }, [sendingMessage]);
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
                    
                    setSendingMessage={setSendingMessage}
                    messages={messageStream}
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