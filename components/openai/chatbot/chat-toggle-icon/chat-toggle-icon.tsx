import React, {useState, useEffect} from 'react';
import style from './chat-toggle-icon.module.css';
import { RiChatAiFill } from "react-icons/ri";
interface ChatToggleIconProps {
    onClick?: () => void;
}

const ChatToggleIcon: React.FC<ChatToggleIconProps> = ({
    onClick = () => {},
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleButtonState = () => {
        // Logic to toggle chat visibility
        setIsOpen(prev => !prev);
        onClick();
    }
    useEffect(() => {

    }, []);

    return (
        <button className={style['chat-toggle-icon'] + (isOpen ? ` ${style['is-open']}` : '')} onClick={toggleButtonState}>
            <RiChatAiFill />
        </button>
    );
};

export default ChatToggleIcon;