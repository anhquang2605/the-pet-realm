import React, {useState, useEffect} from 'react';
import style from './collapsable-item.module.css';

type CollapsableItemProps = {
    isActive: boolean;
    children: React.ReactNode;
    title: string
};

const CollapsableItem: React.FC<CollapsableItemProps> = ({isActive, children, title = ''}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['collapsable-item'] + (isActive ? ' ' + style['active'] : '')}>
            <h3 className={style['title']}>{title}</h3>
            <div className={style.content}>
                {children}
            </div>
        </div>
    );
};

export default CollapsableItem;