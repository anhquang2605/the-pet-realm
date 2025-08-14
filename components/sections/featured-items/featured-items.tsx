import React from 'react';
import style from './featured-items.module.css';
import PetCard from '../../universals/pet-card/pet-card';
import { FeatureItems } from '../../../types/order';

interface FeaturedItemsProps {
    featuredItems?: FeatureItems[]
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({
    featuredItems = []
}) => {
    return (
        <section className={style['featured-items']}>
            <h2 className={style['featured-items-title']}>Featured Items</h2>
            {featuredItems.map((item, index) => (
                <PetCard
                    key={index}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl} // Fallback image
                    description={item.description}
                    discount={item.discount}
                />
            ))}
        </section>
    );
};

export default FeaturedItems;