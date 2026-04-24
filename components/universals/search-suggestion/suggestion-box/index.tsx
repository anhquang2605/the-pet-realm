import React, {useState, useEffect} from 'react';
import style from './suggestion-box.module.css';
import { Order } from '../../../../types/order';

type SuggestionBoxProps = {
    suggestion: Partial<Order>;
};
//only name, _id and image are needed for the suggestion box, so we can type it as Partial<Order> to allow for flexibility in the data we receive
const SuggestionBox: React.FC<SuggestionBoxProps> = ({
    suggestion
}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['suggestion-box']}>
            SuggestionBox
        </div>
    );
};

export default SuggestionBox;