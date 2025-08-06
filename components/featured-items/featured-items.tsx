import React from 'react';
import style from './featured-items.module.css';
import { Order } from '../../types/order';
import PetCard from '../pet-card/pet-card';

interface FeaturedItemsProps {
    featuredItems?: Order[]
}

const FeaturedItems: React.FC<FeaturedItemsProps> = ({
    featuredItems = []
}) => {
    return (
        <section className={style['featured-items']}>
            {featuredItems.map((item, index) => (
                <PetCard
                    key={index}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.orderImageUrls? item.orderImageUrls[0] : '/default-image.png'} // Fallback image
                    description={item.description}
                    discount={item.discount}
                />
            ))}
        </section>
    );
};

export default FeaturedItems;