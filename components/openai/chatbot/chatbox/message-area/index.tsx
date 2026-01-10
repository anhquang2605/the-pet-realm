import React, {useState, useEffect} from 'react';
import style from './message-area.module.css';

interface MessageAreaProps {

}

const MessageArea: React.FC<MessageAreaProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['message-area']}>
            MessageAreaIcon
        </div>
    );
};

export default MessageArea;