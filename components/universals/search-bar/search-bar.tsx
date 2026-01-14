import React from 'react';
import style from './search-bar.module.css';
import { IoSearch } from "react-icons/io5";
type SearchBarProps = Record<string, never>;
const searchPet = (value:string | null) => {
    console.log("Searching pet with value: ", value);
}
const SearchBar: React.FC<SearchBarProps> = ({}) => {
    const toggleSearchBar = () => {
        const searchBarInput:HTMLElement = document.getElementsByClassName(style['search-bar-input'])[0] as HTMLElement;
        const searchBar = document.getElementsByClassName(style['search-bar'])[0];
        searchBar.classList.toggle(style['search-ready']);
        searchBarInput.focus();
    }
    const onSearchClick = () => {
        const searchBarInput:HTMLElement = document.getElementsByClassName(style['search-bar-input'])[0] as HTMLElement;
        const value = searchBarInput.getAttribute('value');
        if(value !== null && value !== ''){
            searchPet(value);
        }
    }
    return (
        <div className={style['search-bar']}>
           <span onClick={
                toggleSearchBar
            } className={style['search-bar-placeholder'] + " " + style['search-bar-shared']} >Find your pet!</span>
           <input className={style['search-bar-input'] + " " + style['search-bar-shared']} type="text" />
           <button onAbort={onSearchClick} className={style['search-bar-button']}>
                <IoSearch />
           </button>
           
        </div>
    );
};

export default SearchBar;