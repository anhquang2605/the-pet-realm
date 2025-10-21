import React from 'react';
import style from './action-card.module.css';

interface ActionCardProps {

}

const ActionCard: React.FC<ActionCardProps> = ({}) => {
    return (
        <div className={style['action-card']}>
            ActionCard
        </div>
    );
};

export default ActionCard;