import React, {useState, useEffect} from 'react';
import style from './collapsable-item.module.css';

type CollapsableItemProps = {
    isActive: boolean;
    children: React.ReactNode
};

const CollapsableItem: React.FC<CollapsableItemProps> = ({isActive, children}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['collapsable-item'] + (isActive ? ' ' + style['active'] : '')}>
            {children}
        </div>
    );
};

export default CollapsableItem;