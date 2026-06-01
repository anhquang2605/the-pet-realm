import React, {useState, useEffect} from 'react';
import style from './collapsable-item.module.css';

type CollapsableItemProps = Record<string, never>;

const CollapsableItem: React.FC<CollapsableItemProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['collapsable-item']}>
            CollapsableItem
        </div>
    );
};

export default CollapsableItem;