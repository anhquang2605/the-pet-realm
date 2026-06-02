import React, {useState, useEffect} from 'react';
import style from './collapsable.module.css';
import CollapsableItem from './collapsable-item';

//map type with string as key and ReactNode as value
export type FilledContent = {
    [key: string]: React.ReactNode;
};

type CollapsableProps = {
    currentSection: number;//based on index of items
    items: React.ReactNode[];
    titles: string[];
    filledContent: FilledContent;
};

const Collapsable: React.FC<CollapsableProps> = ({currentSection, items = [], titles}) => {
    useEffect(() => {

    }, []);
    const generateContent = () => {
        return items.map((item, index) => (
            <CollapsableItem title={titles[index]} key={index} isActive={index === currentSection}>
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