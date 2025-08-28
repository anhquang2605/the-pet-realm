import React, { use } from 'react';
import style from './order-filter.module.css';
import RangeSlider, { InputEvent } from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
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

const OrderFilter: React.FC<OrderFilterProps> = ({priceRange, setFilter}) => {
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
    const onPriceRangeChange = ( event: InputEvent ) => {
        setPriceRangeValues([event[0], event[1]]);
    
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
                <RangeSlider min={minPrice} max={maxPrice} step={1} value={priceRangeValues} onInput={
                    onPriceRangeChange
                } />
               

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