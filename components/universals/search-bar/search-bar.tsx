import React from 'react';
import style from './search-bar.module.css';
import { IoSearch } from "react-icons/io5";
interface SearchBarProps {

}

const SearchBar: React.FC<SearchBarProps> = ({}) => {
    const toggleSearchBar = () => {
        const searchBarPlaceholder = document.getElementsByClassName(style['search-bar-placeholder'])[0];
        const searchBarInput = document.getElementsByClassName(style['search-bar-input'])[0];
        searchBarPlaceholder.classList.toggle(style['search-bar-placeholder--active']);
        searchBarInput.classList.toggle(style['search-bar-input--active']);
    }
    return (
        <div className={style['search-bar']}>
           <span onClick={
                toggleSearchBar
            } className={style['search-bar-placeholder']} >Find your pet!</span>
           <input className={style['search-bar-input']} type="text" />
           <IoSearch />
        </div>
    );
};

export default SearchBar;