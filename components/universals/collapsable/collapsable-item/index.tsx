import React, {useState, useEffect} from 'react';
import style from './collapsable-item.module.css';
import ActionButton from '../../buttons/action-button/action-button';

type CollapsableItemProps = {
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
    children: React.ReactNode;
    title: string
    isActive?: boolean;
    index?: number;
};

const CollapsableItem: React.FC<CollapsableItemProps> = ({setCurrentSection, index = 0, isActive, children, title = ''}) => {
    const handleEdit = () => {
        setCurrentSection(index + 1);
    }
    useEffect(() => {

    }, []);

    return (
        <div className={style['collapsable-item'] + (isActive ? ' ' + style['active'] : '')}>
            <h3 className={style['title']}>{title}</h3>
           { !isActive && <ActionButton type="main" title="Edit" color='goldenrod' />}
            <div className={style.content}>
                {children}
            </div>
        </div>
    );
};

export default CollapsableItem;