import React from 'react';
import style from './chatbot.module.css';

interface ChatbotProps {

}

const Chatbot: React.FC<ChatbotProps> = ({}) => {
    return (
        <div className={style['chatbot']}>
            Chatbot
        </div>
    );
};

export default Chatbot;