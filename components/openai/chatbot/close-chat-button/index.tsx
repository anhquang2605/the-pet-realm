import React, {useState, useEffect} from 'react';
import style from './close-chat-button.module.css';
import { RiCloseFill } from "react-icons/ri";
interface CloseChatButtonProps {
    onClick?: () => void;
}

const CloseChatButton: React.FC<CloseChatButtonProps> = ({onClick}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['close-chat-button'] } onClick={onClick}>
            <RiCloseFill />
        </div>
    );
};

export default CloseChatButton;