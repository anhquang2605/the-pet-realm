import React from 'react';
import style from './order-filter.module.css';
export interface OrderFilterI {
    priceRange: [number, number];
    isDiscounted: boolean;
    isOnHold: boolean;
    isAvailable: boolean;
}
interface OrderFilterProps {
    setFilter: React.Dispatch<React.SetStateAction<OrderFilterI>>;
    priceRange: [number, number];
}
interface CheckBoxes {
    isDiscounted: boolean;
    isOnHold: boolean;
    isAvailable: boolean;
}

const OrderFilter: React.FC<OrderFilterProps> = ({priceRange}) => {
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];
    const [priceRangeValues, setPriceRangeValues] = React.useState<[number, number]>(priceRange);
    const [checkBoxes, setCheckBoxes] = React.useState<CheckBoxes>(
        {
            isDiscounted: false,
            isOnHold: false,
            isAvailable: false
        }
    );
    const onPriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setPriceRangeValues([minPrice, value]);
    }
    const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        
    }
    return (
        <section className={style['order-filter']}>
            <h2>Filter Orders</h2>
            {/* Filter UI elements go here */}
            <div className={`${style['price-range']}`}>
                <label>
                    Price Range:
                    
                </label>
                <span className={`${style['price-range-values']}`}>
                    <span className={`${style['min-price']}`}>{minPrice}</span >
                    <input type="range" min={minPrice} max={maxPrice} value={priceRangeValues[0]}  onChange={onPriceRangeChange}/>
                    <span className={`${style['max-price']}`}>{maxPrice}</span>
                </span>
               

            </div>
            <div className={`${style['checkbox-group']}`}>
                <label>
                    <input type="checkbox" />
                    Discounted
                </label>
                <label>
                    <input type="checkbox" />
                    On Hold
                </label>
                <label>
                    <input type="checkbox" />
                    Available
                </label>
            </div>
        </section>
    );
};

export default OrderFilter;