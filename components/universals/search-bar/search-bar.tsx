import React from 'react';
import style from './search-bar.module.css';
import { IoSearch } from "react-icons/io5";
import { debounce } from '../../../libs/helpers';
import { fetchFromGetAPI } from '../../../libs/api-interactions';
import { Order } from '../../../types/order';
type SearchBarProps = Record<string, never>;

const SearchBar: React.FC<SearchBarProps> = ({}) => {
    const toggleSearchBar = () => {
        const searchBarInput:HTMLElement = document.getElementsByClassName(style['search-bar-input'])[0] as HTMLElement;
        const searchBar = document.getElementsByClassName(style['search-bar'])[0];
        searchBar.classList.toggle(style['search-ready']);
        searchBarInput.focus();
    }
    const autoCompleteSearch =   async (value:string | null) => {
    const path = `atuocomplete-order-search`;
    const options = { query: value };
    try {
        const response = await fetchFromGetAPI(path, options);
        if(response && response.results){
            return response.results;
        } else {
            return [];
        }
        
    } catch (error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}
    const onSearchClick = () => {
        const searchBarInput:HTMLElement = document.getElementsByClassName(style['search-bar-input'])[0] as HTMLElement;
        const value = searchBarInput.getAttribute('value');
        if(value !== null && value !== ''){
            searchPet(value);
        }
    }
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            let results:Partial<Order>[] = [];
            if(value !== null && value !== ''){ 
                  debouncedSearch(value);    
            }      
    }
    const debouncedSearch = debounce(   autoCompleteSearch, 300);
    const searchPet = (value: string) => {
        
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