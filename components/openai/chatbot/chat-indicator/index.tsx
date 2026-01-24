import React, {useState, useEffect} from 'react';
import style from './chat-indicator.module.css';

type ChatIndicatorProps = Record<string, never>;

const ChatIndicator: React.FC<ChatIndicatorProps> = ({}) => {
    useEffect(() => {
        
    }, []);

    return (
        <div className={style['chat-indicator'] + " animate-ping"}>
        </div>
    );
};

export default ChatIndicator;