import React, {useState, useEffect} from 'react';
import style from './search-suggestion.module.css';
import { Order, ShopSuggestion } from '../../../types/order';
import SuggestionBox from './suggestion-box';

type SearchSuggestionProps = {
    suggestions: ShopSuggestion[];
    isLoading?: boolean;
    setResults?: React.Dispatch<React.SetStateAction<ShopSuggestion[]>>;
};

const SearchSuggestion: React.FC<SearchSuggestionProps> = ({
    suggestions,
    isLoading = false,
    setResults
}) => {
    useEffect(() => {

    }, []);

    return (
        isLoading ? 
            <div className={style['loading'] + " " + style['search-suggestion']}>Loading...</div>
        :
        suggestions.length === 0 ? null :<div className={style['search-suggestion']}>
            {
                suggestions.map((suggestion) => (
                    <SuggestionBox setResults={setResults} key={suggestion._id?.toString()} suggestion={suggestion} />
                ))
            }
        </div>
    );
};

export default SearchSuggestion;