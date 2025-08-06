import React from 'react';
import style from './featured-items.module.css';

interface FeaturedItemsProps {

}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({}) => {
    return (
        <div className={style['featured-items']}>
            FeaturedItems
        </div>
    );
};

export default FeaturedItems;