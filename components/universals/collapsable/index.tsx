import React, {useState, useEffect} from 'react';
import style from './collapsable.module.css';

type CollapsableProps = Record<string, never>;

const Collapsable: React.FC<CollapsableProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['collapsable']}>
            Collapsable
        </div>
    );
};

export default Collapsable;