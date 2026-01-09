import React, {useState, useEffect} from 'react';
import style from './close-chat-button.module.css';
import { RiCloseFill } from "react-icons/ri";
interface CloseChatButtonProps {

}

const CloseChatButton: React.FC<CloseChatButtonProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['close-chat-button']}>
            <RiCloseFill />
        </div>
    );
};

export default CloseChatButton;