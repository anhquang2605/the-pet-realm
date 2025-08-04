import React from 'react';
import style from './pet-card.module.css';

interface PetCardProps {

}

const PetCard: React.FC<PetCardProps> = ({}) => {
    return (
        <div className={style['pet-card']}>
            PetCard
        </div>
    );
};

export default PetCard;