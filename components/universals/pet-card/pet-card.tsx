import React from 'react';
import style from './pet-card.module.css';
import Image from 'next/image';
import ActionButton from '../buttons/action-button/action-button';
import { useRouter } from 'next/router';
import { ObjectId } from 'mongodb';
interface PetCardProps {
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    discount?: number;
    id?: string | ObjectId
}

const PetCard: React.FC<PetCardProps> = ({
    name,
    price,
    imageUrl,
    description,
    discount = 0,
    id
}) => {
    const handleBuyNow = () => {
        const router = useRouter();
        router.push('/order?id=' + id); // Navigate to the order page with the pet's name as a query parameter
    }
    return (
        <div className={style['pet-card']}>
            <Image className={style['pet-image']} src={imageUrl} alt={name} width={300} height={400} /> 
            <section className={style['pet-details']}>
                <h5 className={style['pet-name']}>{name}</h5>
                <span className={`${style['pet-price']} ${discount !== 0 ? style['discount'] : ''}`}>$ {+(price - (price * discount)).toFixed(2)}</span>
                {discount !== 0 && <span className={style['original-price']}>$ {+price.toFixed(2)}</span>}
                <ActionButton type="add" onClick={() => {}} title="Buy Now" color='green' extraStyle={{
                    fontSize: '1rem',
                }} />
            </section>
            
                      
        </div>
    );
};

export default PetCard;