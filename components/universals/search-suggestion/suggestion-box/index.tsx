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
    useEffect(() => {

    }, []);

    return (
        <div className={style['suggestion-box']}>
            <p>{suggestion.name}</p>
            <img className={style['suggestion-box__image']} src={suggestion.image || '/asset/images/dogpet.webp'} alt={suggestion.name} />
        </div>
    );
};

export default SuggestionBox;