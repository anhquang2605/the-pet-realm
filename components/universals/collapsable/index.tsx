import React, {useState, useEffect} from 'react';
import style from './collapsable.module.css';

type CollapsableProps = {
    currentSection: number;//based on index of items
    items: React.ReactNode[]
};

const Collapsable: React.FC<CollapsableProps> = ({currentSection, items}) => {
    useEffect(() => {

    }, []);
    const generateContent = () => {
        return items.map((item, index) => (
            <div key={index} className={style['collapsable-item'] + (index === currentSection ? ' ' + style['active'] : '')}>
                {item}
            </div>
        ));
    }
    return (
        <div className={style['collapsable']}>
            Collapsable
        </div>
    );
};

export default Collapsable;