import React, {useState, useEffect} from 'react';
import style from './search-suggestion.module.css';

type SearchSuggestionProps = Record<string, never>;

const SearchSuggestion: React.FC<SearchSuggestionProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['search-suggestion']}>
            SearchSuggestion
        </div>
    );
};

export default SearchSuggestion;