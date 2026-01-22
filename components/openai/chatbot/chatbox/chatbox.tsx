import React, {useState, useEffect} from 'react';
import style from './chatbox.module.css';
import Textbox from './textbox/textbox';
import MessageArea from './message-area';
//dependencies

interface ChatboxProps {

    isOpen?: boolean;
}

const Chatbox: React.FC<ChatboxProps> = ({

    isOpen,
}) => {
    useEffect(() => {

    }, []);
    useEffect(() => {
     
    }, []);
    return (
        <div className={style['chatbox'] + (isOpen ? ` ${style['is-open']}` : '')}>
            <MessageArea 
                
            />
            <Textbox

            />
        </div>
    );
};

export default Chatbox;