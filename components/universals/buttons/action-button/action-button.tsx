import React from 'react';
import style from './action-button.module.css';

interface ActionButtonProps {

}

const ActionButton: React.FC<ActionButtonProps> = ({}) => {
    return (
        <div className={style['action-button'] + " " + "flex items-center justify-center rounded"}>
            ActionButton
        </div>
    );
};

export default ActionButton;