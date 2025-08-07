import React from 'react';
import style from './pet-card.module.css';
import Image from 'next/image';
interface PetCardProps {
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    discount?: number;
}

const PetCard: React.FC<PetCardProps> = ({
    name,
    price,
    imageUrl,
    description,
    discount = 1
}) => {
    return (
        <div className={style['pet-card']}>
            <Image className={style['pet-image']} src={imageUrl} alt={name} width={300} height={400} /> 
            <section className={style['pet-details']}>
                <h5 className={style['pet-name']}>{name}</h5>
                <span className={`${style['pet-price']} ${discount !== 1 ? style['discount'] : ''}`}>{price * discount}</span>
                {discount !== 1 && <span className={style['original-price']}>{price}</span>}
            </section>
            
                      
        </div>
    );
};

export default PetCard;