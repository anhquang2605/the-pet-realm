import React, {useState, useEffect} from 'react';
import style from './collapsable.module.css';
import CollapsableItem from './collapsable-item';

type CollapsableProps = {
    currentSection: number;//based on index of items
    items: React.ReactNode[]
};

const Collapsable: React.FC<CollapsableProps> = ({currentSection, items}) => {
    useEffect(() => {

    }, []);
    const generateContent = () => {
        return items.map((item, index) => (
            <CollapsableItem key={index} isActive={index === currentSection}>
                {item}
            </CollapsableItem>
        ));
    };
    return (
        <section className={style['collapsable']}>
            {generateContent()}
        </section>
    );
};

export default Collapsable;