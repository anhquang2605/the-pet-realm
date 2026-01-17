import React, {useState, useEffect} from 'react';
import style from './chat-bubble.module.css';

type ChatBubbleProps = {
    // Define any props if needed in the future
    text: string;
}
const ChatBubble: React.FC<ChatBubbleProps> = ({
    text
}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['chat-bubble']}>
            {
                text
            }
        </div>
    );
};

export default ChatBubble;