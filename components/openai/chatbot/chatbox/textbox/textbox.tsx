import React, {useState, useEffect} from 'react';
import style from './textbox.module.css';

interface TextboxProps {
    setInputMessage?: React.Dispatch<React.SetStateAction<string>>;
    inputMessage?: string;
}

const Textbox: React.FC<TextboxProps> = ({setInputMessage, inputMessage}) => {
    const [message, setMessage] = useState('');
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
            <textarea placeholder="Type your message here..." value={message} onChange={handleMessage} />
            <button
            onClick={handleSend}>Send</button>
        </section>
    );
};

export default Textbox;