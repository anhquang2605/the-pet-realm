import React, {useState, useEffect} from 'react';
import style from './chat-bubble.module.css';

type ChatBubbleProps = Record<string, never>;
const ChatBubble: React.FC<ChatBubbleProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['chat-bubble']}>
            ChatBubbleIcon
        </div>
    );
};

export default ChatBubble;