import React from 'react';
import style from './search-bar.module.css';

interface SearchBarProps {

}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
    return (
        <div className={style['search-bar']}>
            SearchBar
        </div>
    );
};

export default SearchBar;