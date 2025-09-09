import React, { useState } from 'react';
import style from './order-sorter.module.css';
import DropDownList from '../../../universals/drop-down-list/drop-down-list';

interface OrderSorterProps {

}
const sortingOptions = [
    "Price",
    "Name",
    "Date Added",
]
const OrderSorter: React.FC<OrderSorterProps> = ({}) => {
    const [isAscending, setIsAscending] = useState<boolean>(true);
    return (
        <div className={style['order-sorter']}>
            <DropDownList 
                items={sortingOptions} 
                actions={sortingOptions.map((option) => () => {})} 
                placeholder="Sort By"
            />
            <button 
                className={`${style['order-sorter__button']} ${isAscending ? style['order-sorter__button--ascending'] : style['order-sorter__button--descending']}`} 
                onClick={() => setIsAscending((prev) => !prev)}
            >
                {isAscending ? 'Asc' : 'Desc'}
            </button>
        </div>
    );
};

export default OrderSorter;