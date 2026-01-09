import React, {useState, useEffect} from 'react';
import style from './close-chat-button.module.css';

interface CloseChatButtonProps {

}

const CloseChatButton: React.FC<CloseChatButtonProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['close-chat-button']}>
            CloseChatButtonIcon
        </div>
    );
};

export default CloseChatButton;