import React, { useState } from 'react';
import {OrderFilterI} from './order-filter';
import style from './order-filter.module.css';
interface useOrderFilterContext {
    revealMobileFilter: () => void;
}

interface FilterContextProviderProps {
    setFilter: React.Dispatch<React.SetStateAction<OrderFilterI>>;
    priceRange: [number, number];
    children: React.ReactNode;
}

export const FilterContext = React.createContext<useOrderFilterContext>({} as useOrderFilterContext);

const FilterContextProvider: React.FC<FilterContextProviderProps> = ({children}) => {
    const revealMobileFilter = () => {
        const filterSection = document.getElementsByClassName(style['order-filter'])[0];
        filterSection.classList.toggle(style['order-filter--active']);
    }
    return (
        <FilterContext.Provider value={{revealMobileFilter}}>
            {children}
        </FilterContext.Provider>
    );
}

export default FilterContextProvider;