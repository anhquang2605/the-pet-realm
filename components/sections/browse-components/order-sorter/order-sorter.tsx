import React, { useState } from 'react';
import style from './order-sorter.module.css';
import DropDownList, { OptionItem } from '../../../universals/drop-down-list/drop-down-list';
import { PiSortDescendingLight, PiSortAscendingLight  } from "react-icons/pi";
interface OrderSorterProps {
    setSortBy: React.Dispatch<React.SetStateAction<string>>;
    setIsAscending: React.Dispatch<React.SetStateAction<boolean>>;
    isAscending?: boolean;

}

const sortingOptions: OptionItem[] = [
    {
        title: "Date Added",
        value: "Date"
    },{
        title: "Price",
        value: "Price"
    }
]
const OrderSorter: React.FC<OrderSorterProps> = ({
    setSortBy,
    setIsAscending,
    isAscending = true,
}) => {
    return (
        <div className={style['order-sorter']}>
            <DropDownList 
                items={sortingOptions} 
                actions={sortingOptions.map((option) => () => {})} 
                placeholder="Sort By"
                setSelectedItem={setSortBy}
            />
            <button 
                className={`${style['order-sorter__button']} ${isAscending ? style['order-sorter__button--ascending'] : style['order-sorter__button--descending']}`} 
                onClick={() => setIsAscending((prev) => !prev)}
            >
                {isAscending ? <PiSortAscendingLight /> : <PiSortDescendingLight />} 
            </button>
        </div>
    );
};

export default OrderSorter;