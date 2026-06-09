import React, {useState, useEffect} from 'react';
import style from './collapsable.module.css';
import CollapsableItem from './collapsable-item';
import { FilledContent } from '../../sections/order-components/useOrderContext';

type CollapsableProps = {
    currentSection: number;//based on index of items
    items: React.ReactNode[];
    titles: string[];
    filledContent: FilledContent;
    setCurrentSection: React.Dispatch<React.SetStateAction<number>>;
};



const Collapsable: React.FC<CollapsableProps> = ({setCurrentSection, currentSection, items = [], titles}) => {
    useEffect(() => {

    }, []);
    const generateContent = () => {
        return items.map((item, index) => (
            <CollapsableItem title={titles[index]} setCurrentSection={setCurrentSection} key={index} isActive={index === currentSection}>
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