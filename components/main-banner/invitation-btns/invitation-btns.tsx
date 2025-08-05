import React from 'react';
import style from './invitation-btns.module.css';
import { Action } from '../main-banner';
import ActionButton from '../../universals/buttons/action-button/action-button';
interface InvitationBtnsProps {
    actions: Action[];
}

const InvitationBtns: React.FC<InvitationBtnsProps> = ({actions}) => {
    return (
        <div className={style['invitation-btns']}>
            {actions.map((action, index) => (
                <div key={index} className="flex items-center justify-center">
                    <ActionButton title={action.title} href={action.href} />
                </div>
            ))}            
        </div>
    );
};

export default InvitationBtns;