import React, {useState, useEffect} from 'react';
import style from './chatbox.module.css';

interface ChatboxProps {
    messages?: Array<{ role: string; content: string }>;
    responses?: Array<{ role: string; content: string }>;
}

const Chatbox: React.FC<ChatboxProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['chatbox']}>
            
        </div>
    );
};

export default Chatbox;