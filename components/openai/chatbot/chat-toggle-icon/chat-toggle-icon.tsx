import React, {useState, useEffect} from 'react';
import style from './chat-toggle-icon.module.css';

interface ChatToggleIconProps {
    onClick?: () => void;
}

const ChatToggleIcon: React.FC<ChatToggleIconProps> = ({
    onClick = () => {},
}) => {
    useEffect(() => {

    }, []);

    return (
        <button className={style['chat-toggle-icon']} onClick={onClick}>
            ChatToggleIcon
        </button>
    );
};

export default ChatToggleIcon;