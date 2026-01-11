import React, {useState, useEffect, use} from 'react';
import style from './chatbox.module.css';
import Textbox from './textbox/textbox';
import MessageArea from './message-area';

interface ChatboxProps {
    setMessages?: React.Dispatch<React.SetStateAction<string[]>>;
    messages?: string[];
    reponses?: string[];
    isOpen?: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({
    setMessages,
    messages,
    reponses,
    isOpen,
}) => {
    const [inputMessage, setInputMessage] = useState('');
    useEffect(() => {

    }, []);
    useEffect(() => {
        if(inputMessage){
            console.log('New input message:', inputMessage);
        }
        setMessages && setMessages(prev => [...prev!, inputMessage]);
    }, [inputMessage]);
    return (
        <div className={style['chatbox'] + (isOpen ? ` ${style['is-open']}` : '')}>
            <MessageArea />
            <Textbox
                setInputMessage ={setInputMessage}
                inputMessage={inputMessage}
            />
        </div>
    );
};

export default Chatbox;