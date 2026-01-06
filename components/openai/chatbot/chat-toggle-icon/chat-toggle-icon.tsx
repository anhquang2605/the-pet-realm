import React, {useState, useEffect} from 'react';
import style from './chat-toggle-icon.module.css';

interface ChatToggleIconProps {

}

const ChatToggleIcon: React.FC<ChatToggleIconProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['chat-toggle-icon']}>
            ChatToggleIcon
        </div>
    );
};

export default ChatToggleIcon;