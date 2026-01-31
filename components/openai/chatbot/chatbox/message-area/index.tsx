import React, {useState, useEffect} from 'react';
import style from './message-area.module.css';
import { useChatBotContext } from '../../useChatBotContext';
import { Chat } from 'openai/resources';
import ChatBubble from '../chat-bubble';

type MessageAreaProps = {

}

const MessageArea: React.FC<MessageAreaProps> = ({
    
}) => {
    const { isSendingMessage, messages } = useChatBotContext();
    useEffect(() => {

    }, []);

    return (
        <div className={style['message-area']}>
            {
                messages.map((msg, index) => (
                    <ChatBubble key={index} text={msg.content} type={msg.sender} />

                ))
            }
            {isSendingMessage && <ChatBubble text={"..."} type={'is-sending'} />}
        </div>
    );
};

export default MessageArea;