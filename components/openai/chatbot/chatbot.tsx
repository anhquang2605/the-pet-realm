import React, { use } from 'react';
import style from './chatbot.module.css';
import { insertToPostAPI } from '../../../libs/api-interactions';
import { useState, useEffect } from 'react';
import Chatbox from './chatbox/chatbox';
import ChatToggleIcon from './chat-toggle-icon/chat-toggle-icon';
import CloseChatButton from './close-chat-button';
import { useChatBotContext } from './useChatBotContext';
import { Chat } from 'openai/resources';
import ChatIndicator from './chat-indicator';

type ChatbotProps = Record<string, never>; // No props for now, this define that the component doesn't accept any props

const Chatbot: React.FC<ChatbotProps> = ({}) => {
    const {
        sentMessages,
        setSentMessages,
        responses,
        setResponses,
       isSendingMessage,
         setIsSendingMessage,
         messages,
        setMessages,
        sendingMessage

    } = useChatBotContext();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isRead, setIsRead] = useState(true);
    const handleMessageSending = async (message: string) => {
       
    
        setIsSendingMessage(true);
          setSentMessages( (prev) => {
            return [...prev, {
                sender: 'user',
                content: message
            }];
        });
        //const reponse: string = await sendMessageToMockOpenAI(message);
         const response = await sendMessageToOpenAI(message);
             console.log('OpenAI response:', response);
        setResponses(prev => [...prev, {
            sender: 'bot',
            content: response
        }]);
        setMessages(prev => [...prev, {
            sender: 'bot',
            content: response
        }]);
        setIsSendingMessage(false);
        
    }
    const sendMessageToMockOpenAI = async (message: string) => {
       //have a timeout to return a mock response in 1000ms
        return new Promise<string>((resolve) => {
            setTimeout(() => {
                const mockResponse = `This is a mock response to your message: "${message}"`;
                //update sentMessages and reponses state
                resolve(mockResponse);
            }, 4000);
        });
    }
    const toggleChatbox = () => {
        setIsChatOpen(prev => !prev);
    }
    
    //when user sends a message
    useEffect(() => {
        const message = sendingMessage.content;
        if(message && message.length > 0) {
            setMessages(prev => [...prev, sendingMessage]);
           //send last message to OpenAI
            handleMessageSending(message);

        }
    }, [sendingMessage]);
        useEffect(() => {
            if(isChatOpen) {
                setIsRead(true);
            }
        }, [isChatOpen]);
        //when responses change
        useEffect(() => {
            if(responses.length > 0) {
                if(!isChatOpen) {
                    setIsRead(false);
                } else {
                    setIsRead(true);
                }
            }
        }, [responses]);
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
                    
                    isOpen={isChatOpen}
                />
                { !isRead && <ChatIndicator />}
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