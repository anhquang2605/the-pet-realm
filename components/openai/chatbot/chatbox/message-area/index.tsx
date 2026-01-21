import React, {useState, useEffect} from 'react';
import style from './message-area.module.css';
import { useChatBotContext } from '../../useChatBotContext';

type MessageAreaProps = {

}

const MessageArea: React.FC<MessageAreaProps> = ({
    
}) => {
    const { isSendingMessage, messages } = useChatBotContext();
    useEffect(() => {

    }, []);

    return (
        <div className={style['message-area']}>
            {
                messages.map((msg, index) => (
                    <div key={index} className={index % 2 === 0 ? style['user-message'] : style['bot-response']}>
                        {msg}
                    </div>
                ))
            }
            {isSendingMessage && <div className={style['is-sending-message'] + " animate-pulse"}>...</div>}
        </div>
    );
};

export default MessageArea;