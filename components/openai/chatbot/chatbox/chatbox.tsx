import React, {useState, useEffect} from 'react';
import style from './chatbox.module.css';
import Textbox from './textbox/textbox';
import MessageArea from './message-area';

interface ChatboxProps {
    setSendingMessage: React.Dispatch<React.SetStateAction<string>>;
    messages?: string[];
    reponses?: string[];
    isOpen?: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({
    setSendingMessage,
    messages,
    reponses,
    isOpen,
}) => {
    const [inputMessage, setInputMessage] = useState('');
    useEffect(() => {

    }, []);
    useEffect(() => {
     
    }, []);
    return (
        <div className={style['chatbox'] + (isOpen ? ` ${style['is-open']}` : '')}>
            <MessageArea />
            <Textbox
                setInputMessage ={setSendingMessage}
                inputMessage={inputMessage}
            />
        </div>
    );
};

export default Chatbox;