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

export const FilterContextProvider: React.FC<FilterContextProviderProps> = ({children}) => {
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

export const useViewFilterContext = () => {
    if (!React.useContext(FilterContext)) {
        throw new Error('useViewFilterContext must be used within a FilterContextProvider');
    }
    return React.useContext(FilterContext);
}