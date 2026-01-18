import React, {useState, useEffect} from 'react';
import style from './message-area.module.css';

type MessageAreaProps = {
    messages?: string[];
    responses?: string[];
}

const MessageArea: React.FC<MessageAreaProps> = ({
    messages,
    responses
}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['message-area']}>
            
        </div>
    );
};

export default MessageArea;