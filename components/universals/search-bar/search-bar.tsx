import React, { useEffect } from 'react';
import style from './search-bar.module.css';
import { IoSearch } from "react-icons/io5";
import { debounce } from '../../../libs/helpers';
import { fetchFromGetAPI } from '../../../libs/api-interactions';
import { Order, ShopSuggestion } from '../../../types/order';
import SearchSuggestion from '../search-suggestion';
import { useClickOutside } from '../../hooks/click-outside';
type SearchBarProps = Record<string, unknown>;
const SearchBar: React.FC<SearchBarProps> = ({  }) => {
    const [autoCompleteResults, setAutoCompleteResults] = React.useState<ShopSuggestion[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const boxRef = React.useRef<HTMLDivElement>(null);
    useClickOutside(boxRef, () => {
        setAutoCompleteResults([]);
    });
    const toggleSearchBar = () => {
        const searchBarInput:HTMLElement = document.getElementsByClassName(style['search-bar-input'])[0] as HTMLElement;
        const searchBar = document.getElementsByClassName(style['search-bar'])[0];
        searchBar.classList.toggle(style['search-ready']);
        searchBarInput.focus();
    }
    const autoCompleteSearch =   async (value:string | null) => {
        if(!value) return;
        setIsLoading(true);
        const path = `autocomplete-order-search`;
        const options = { query: value };
        try {
            const response = await fetchFromGetAPI(path, options);
            if(setAutoCompleteResults){
                setIsLoading(false);
                setAutoCompleteResults(response);
            }
            
        } catch (error) {
            setIsLoading(false);
            console.error('Error fetching search results:', error);
            setAutoCompleteResults && setAutoCompleteResults([]);
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
            if(value !== null && value !== ''){ 
                  debouncedSearch(value);    
            }      
    }
    const debouncedSearch = debounce(   autoCompleteSearch, 500);
    const searchPet = (value: string) => {

    }

    return (
        <div ref={boxRef} className={style['search-bar-container']} >
            <div className={style['search-bar']}>
            <span onClick={
                    toggleSearchBar
                } className={style['search-bar-placeholder'] + " " + style['search-bar-shared']} >Find your pet!</span>
            <input onInput={onInputChange} className={style['search-bar-input'] + " " + style['search-bar-shared']} type="text" />
            <button onAbort={onSearchClick} className={style['search-bar-button']}>
                    <IoSearch />
            </button>
            
            </div>
            <SearchSuggestion setResults={setAutoCompleteResults} isLoading={isLoading} suggestions={autoCompleteResults} />
        </div>
    );
};

export default SearchBar;