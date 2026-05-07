import React, {useState, useEffect} from 'react';
import style from './suggestion-box.module.css';
import { Order, ShopSuggestion } from '../../../../types/order';

type SuggestionBoxProps = {
    suggestion: ShopSuggestion;
};
//only name, _id and image are needed for the suggestion box, so we can type it as Partial<Order> to allow for flexibility in the data we receive
const SuggestionBox: React.FC<SuggestionBoxProps> = ({
    suggestion
}) => {
    const handleClick = () => {
        const path = `order/${suggestion.id}`;
        
    }
    useEffect(() => {

    }, []);

    return (
        <div onClick={handleClick} className={style['suggestion-box']}>
            <img className={style['suggestion-box__image']} src={suggestion.image || '/asset/images/dogpet.webp'} alt={suggestion.name} />
            <p className={style['suggestion-box__name']}>{suggestion.name}</p>
        </div>
    );
};

export default SuggestionBox;