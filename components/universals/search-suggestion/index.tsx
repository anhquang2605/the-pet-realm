import React, {useState, useEffect} from 'react';
import style from './search-suggestion.module.css';
import { Order } from '../../../types/order';
import SuggestionBox from './suggestion-box';

type SearchSuggestionProps = {
    suggestions: Partial<Order>[];
    isLoading?: boolean;
};

const SearchSuggestion: React.FC<SearchSuggestionProps> = ({
    suggestions,
    isLoading = false
}) => {
    useEffect(() => {

    }, []);

    return (
        isLoading ? <div className={style['loading']}>Loading...</div> :
        <div className={style['search-suggestion']}>
            {
                suggestions.map((suggestion) => (
                    <SuggestionBox key={suggestion.id?.toString()} suggestion={suggestion} />
                ))
            }
        </div>
    );
};

export default SearchSuggestion;