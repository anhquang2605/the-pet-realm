import React from 'react';
import style from './action-button.module.css';
import { useRouter } from 'next/router';

interface ActionButtonProps {
    href?: string
    title: string;
    onClick?: () => void;
    type: 'main' | 'link' | 'add' | 'remove';
    color?: string; // Optional color prop for custom styling
}

const ActionButton: React.FC<ActionButtonProps> = ({
    href,
    title,
    onClick,
    type = "",
    color= ""
}) => {
    const styleType = type !== "main" ? `${style['action-type']} ${style[type]}` : '';
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
        <div onClick={handleClick} className={style['action-button'] + " " + "flex items-center justify-center" + " " + styleType} style={{
            backgroundColor: color
        }}>
           {title}
        </div>
    );
};

export default ActionButton;