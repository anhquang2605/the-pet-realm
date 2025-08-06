import React from 'react';
import style from './featured-items.module.css';

interface FeaturedItemsProps {

}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({}) => {
    return (
        <section className={style['featured-items']}>
            FeaturedItems
        </section>
    );
};

export default FeaturedItems;