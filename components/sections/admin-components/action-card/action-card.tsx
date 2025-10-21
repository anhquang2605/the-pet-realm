import React from 'react';
import style from './action-card.module.css';
import { title } from 'process';

interface ActionCardProps {
    title?: string;
    description?: string;
    children?: React.ReactNode; 
}

const ActionCard: React.FC<ActionCardProps> = ({
    title = "Action Card Title",
    description = "This is a description for the action card.",
    children
}) => {
    return (
        <div className={style['action-card']}>
            <h5>{title}</h5>
            <p>{description}</p>
            <div>
                {children}
            </div>
        </div>
    );
};

export default ActionCard;