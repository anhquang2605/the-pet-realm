import React from 'react';
import style from './browse-mobile-modify-group.module.css';
import { FilterContextProvider } from '../use-order-fitler/use-order-filter';
import { MobileFilterRevealButton, OrderFilterI } from '../use-order-fitler/order-filter';
import OrderSorter from '../order-sorter/order-sorter';

interface BrowseMobileModifyGroupProps {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isAscending?: boolean;
}

const BrowseMobileModifyGroup: React.FC<BrowseMobileModifyGroupProps> = ({
    setSortBy,
    setIsAscending,
    isAscending = true,
}) => {
    return (
        <div className={style['browse-mobile-modify-group']}>
           <FilterContextProvider>
                <MobileFilterRevealButton />
           </FilterContextProvider>
            <OrderSorter
                setSortBy={setSortBy}
                setIsAscending={setIsAscending}
                isAscending={isAscending}
            />
        </div>
    );
};

export default BrowseMobileModifyGroup;