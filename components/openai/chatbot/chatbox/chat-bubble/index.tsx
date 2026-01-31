import React, {useState, useEffect} from 'react';
import style from './chat-bubble.module.css';

type ChatBubbleProps = {
    // Define any props if needed in the future
    text: string;
    type: 'user' | 'bot' | 'is-sending'
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
    text,
    type
}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['chat-bubble'] + " " + style[`${type}-message`]}>
            {
                text
            }
        </div>
    );
};

export default ChatBubble;