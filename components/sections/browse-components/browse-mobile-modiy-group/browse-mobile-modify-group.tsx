import React from 'react';
import style from './browse-mobile-modify-group.module.css';
import { FilterContextProvider } from '../use-order-fitler/use-order-filter';
import { MobileFilterRevealButton, OrderFilterI } from '../use-order-fitler/order-filter';
import OrderSorter from '../order-sorter/order-sorter';

interface BrowseMobileModifyGroupProps {
    
}

const BrowseMobileModifyGroup: React.FC<BrowseMobileModifyGroupProps> = ({}) => {
    return (
        <div className={style['browse-mobile-modify-group']}>
           <FilterContextProvider>
                <MobileFilterRevealButton />
           </FilterContextProvider>
            <OrderSorter />
        </div>
    );
};

export default BrowseMobileModifyGroup;