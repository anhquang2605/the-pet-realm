import React from 'react';
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
    return (
        <div className={style['order-sorter']}>
            <DropDownList 
                items={sortingOptions} 
                actions={sortingOptions.map((option) => () => {})} 
                placeholder="Sort By"
            />
        </div>
    );
};

export default OrderSorter;