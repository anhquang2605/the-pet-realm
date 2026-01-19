import React, {useState, useEffect} from 'react';
import style from './textbox.module.css';
import { useChatBotContext } from '../../useChatBotContext';

interface TextboxProps {
    setInputMessage?: React.Dispatch<React.SetStateAction<string>>;
    inputMessage?: string;
}

const Textbox: React.FC<TextboxProps> = ({setInputMessage, inputMessage}) => {
    const [message, setMessage] = useState('');
    const { isSendingMessage } = useChatBotContext();
    useEffect(() => {

    }, []);
    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }
    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (setInputMessage) {
            setInputMessage(message);
        }
    }
    return (
        <section className={style['textbox']}>
            <textarea className={style['text-input']} placeholder="Type your question here..." value={message} onChange={handleMessage} />
            <button className={style['send-button'] + " " + (isSendingMessage ? style['sending'] : '')} disabled={isSendingMessage}
            onClick={handleSend}>Send</button>
        </section>
    );
};

export default Textbox;