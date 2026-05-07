import React, {useState, useEffect} from 'react';
import style from './suggestion-box.module.css';
import { Order, ShopSuggestion } from '../../../../types/order';
import Link from 'next/link';

type SuggestionBoxProps = {
    suggestion: ShopSuggestion;
};
//only name, _id and image are needed for the suggestion box, so we can type it as Partial<Order> to allow for flexibility in the data we receive
const SuggestionBox: React.FC<SuggestionBoxProps> = ({
    suggestion
}) => {
    const path = `order?id=${suggestion._id}`;
    useEffect(() => {

    }, []);

    return (
        <Link href={path} className={style['suggestion-box']}>
            <img className={style['suggestion-box__image']} src={suggestion.image || '/asset/images/dogpet.webp'} alt={suggestion.name} />
            <p className={style['suggestion-box__name']}>{suggestion.name}</p>
        </Link>
    );
};

export default SuggestionBox;