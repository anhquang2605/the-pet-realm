import React, {useState, useEffect} from 'react';
import style from './message-area.module.css';

type MessageAreaProps = Record<string, never>;

const MessageArea: React.FC<MessageAreaProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['message-area']}>
            
        </div>
    );
};

export default MessageArea;