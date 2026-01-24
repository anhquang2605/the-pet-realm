import React, {useState, useEffect} from 'react';
import style from './chat-indicator.module.css';

type ChatIndicatorProps = Record<string, never>;

const ChatIndicator: React.FC<ChatIndicatorProps> = ({}) => {
    useEffect(() => {
        
    }, []);

    return (
        <div className={style['chat-indicator'] }>
                <span className={style['chat-indicator-dot'] + " animate-ping" }></span>
                <span className={style['chat-indicator-dot']}></span>
        </div>
    );
};

export default ChatIndicator;