import React, {useState, useEffect} from 'react';
import style from './chat-bubble.module.css';

interface ChatBubbleProps {

}

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