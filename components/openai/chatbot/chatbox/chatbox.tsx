import React, {useState, useEffect, use} from 'react';
import style from './chatbox.module.css';
import Textbox from './textbox/textbox';

interface ChatboxProps {
    setMessages?: React.Dispatch<React.SetStateAction<string[]>>;
    messages?: string[];
    reponses?: string[];
}

const Chatbox: React.FC<ChatboxProps> = ({
    setMessages,
    messages,
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
        <div className={style['chatbox']}>
            <h2>Chatbox</h2>
            <Textbox
                setInputMessage ={setInputMessage}
                inputMessage={inputMessage}
            />
        </div>
    );
};

export default Chatbox;