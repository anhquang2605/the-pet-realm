import React, {useState, useEffect} from 'react';
import style from './search-suggestion.module.css';

type SearchSuggestionProps {
    suggestions: Partial<Order>; 
};

const SearchSuggestion: React.FC<SearchSuggestionProps> = ({
    suggestions
}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['search-suggestion']}>
            SearchSuggestion
        </div>
    );
};

export default SearchSuggestion;