import React from 'react';
import style from './action-button.module.css';
import { useRouter } from 'next/router';

interface ActionButtonProps {
    href?: string
    title: string;
    onClick?: () => void;
    type: 'main' | 'link' | 'add' | 'remove';
    color?: string; // Optional color prop for custom styling
    extraStyle?: React.CSSProperties; // Optional style prop for additional styles
}

const ActionButton: React.FC<ActionButtonProps> = ({
    href,
    title,
    onClick,
    type = "",
    color= "",
    extraStyle = {}
}) => {
    const styleType = type !== "main" ? `${style['action-type']} ${style[type]}` : '';
    const addedStyle = {
        ...extraStyle,
        backgroundColor: color
    }
    const router = useRouter();
    const handleClick = () => {
        if (onClick) {
            onClick();
        }
        if (href) {
            router.push(href);
        }
    }
    return (
        <button onClick={handleClick} className={style['action-button'] + " " + "flex items-center justify-center" + " " + styleType} style={addedStyle}>
           {title}
        </button>
    );
};

export default ActionButton;