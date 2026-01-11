import React, {useState, useEffect} from 'react';
import style from './chat-toggle-icon.module.css';
import { RiChatAiFill } from "react-icons/ri";
interface ChatToggleIconProps {
    isOpen?: boolean;
    onClick?: () => void;
    isReplied?: boolean;
}

const ChatToggleIcon: React.FC<ChatToggleIconProps> = ({
    isOpen = false,
    onClick = () => {}
    , isReplied = false
}) => {
    
    const toggleButtonState = () => {
        // Logic to toggle chat visibility
        onClick();
    }
    useEffect(() => {

    }, []);

    return (
        <button className={style['chat-toggle-icon'] + (isOpen ? ` ${style['is-open']}` : '')} onClick={toggleButtonState}>
            <RiChatAiFill />
            {isReplied? <span className={style['notification-dot']}></span> : null}
        </button>
    );
};

export default ChatToggleIcon;