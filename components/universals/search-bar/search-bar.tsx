import React from 'react';
import style from './search-bar.module.css';
import { IoSearch } from "react-icons/io5";
import { debounce } from '../../../libs/helpers';
import { fetchFromGetAPI } from '../../../libs/api-interactions';
import { Order, ShopSuggestion } from '../../../types/order';
import SearchSuggestion from '../search-suggestion';
type SearchBarProps = Record<string, unknown>;
const SearchBar: React.FC<SearchBarProps> = ({  }) => {
    const [autoCompleteResults, setAutoCompleteResults] = React.useState<ShopSuggestion[]>([]);
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
        let results:ShopSuggestion[] = [];
        if(response && response.results){
            results = response.results;
        } 
        if(setAutoCompleteResults){
            setAutoCompleteResults(results);
        }
        
    } catch (error) {
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
           <input onInput={onInputChange} className={style['search-bar-input'] + " " + style['search-bar-shared']} type="text" />
           <button onAbort={onSearchClick} className={style['search-bar-button']}>
                <IoSearch />
           </button>
           <SearchSuggestion suggestions={autoCompleteResults} />
        </div>
    );
};

export default SearchBar;