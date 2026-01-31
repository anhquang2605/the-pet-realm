import React, {useState, useEffect} from 'react';
import style from './textbox.module.css';
import { useChatBotContext } from '../../useChatBotContext';
import { IoSend } from "react-icons/io5";
interface TextboxProps {

}

const Textbox: React.FC<TextboxProps> = ({}) => {
    const [message, setMessage] = useState('');
    const { isSendingMessage, setSendingMessage } = useChatBotContext();
    useEffect(() => {

    }, []);
    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(e.target.value);
    }
    const handleMessaging = (e: React.KeyboardEvent<HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement> ) => {
            e.preventDefault();
            if(message.trim().length === 0) return;
            setSendingMessage({content:message.trim(), sender: 'user'});
            setMessage('');
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleMessaging(e);
        }
    }
    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        handleMessaging(e);
    }
    return (
        <section className={style['textbox']}>
            <textarea className={style['text-input']} field-sizing="fixed" rows={1}  placeholder="Type your question here" value={message} onChange={handleMessage} onKeyUp={handleKeyPress} />
            <button className={style['send-button'] + " " + (isSendingMessage ? style['sending'] : '')} disabled={isSendingMessage}
            onClick={handleSend}><IoSend /></button>
        </section>
    );
};

export default Textbox;