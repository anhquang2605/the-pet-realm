import React from 'react';
import style from './order-filter.module.css';
import RangeSlider, { InputEvent } from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ActionButton from '../../../universals/buttons/action-button/action-button';
import { BsFilter } from "react-icons/bs";
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
    const onDiscountedChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.checked;
        setCheckBoxes((prev) => ({...prev, isDiscounted: newValue}));
    }
    const onHoldChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.checked;
        setCheckBoxes((prev) => ({...prev, isOnHold: newValue}));
    }
    const onAvailableChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const newValue = event.target.checked;
        setCheckBoxes((prev) => ({...prev, isAvailable: newValue}));
    }    
    const applyFilters = () => {
        const newFilter: OrderFilterI = {
            priceRange: priceRangeValues,
            ...checkBoxes
        }
        setFilter(newFilter);
    }
    const revealMobileFilter = () => {
        const filterSection = document.getElementsByClassName(style['order-filter'])[0];
        filterSection.classList.toggle(style['order-filter--active']);
    }
    
    return (
        <>
        
        
        <section id="order-filter" className={style['order-filter']}>
            <h3 className={style['order-filter__title']}><BsFilter /> <span className={style["order-filter__text"]}>Filter</span></h3>
            
            {/* Filter UI elements go here */}
            <fieldset className={`${style['price-range']}`}>
                <legend>Price Range</legend>
                
                <span> ${priceRangeValues[0]} - ${priceRangeValues[1]}</span>
                
                <RangeSlider min={minPrice} max={maxPrice} step={1} value={priceRangeValues} onInput={
                    onPriceRangeChange
                } ariaLabel={[priceRangeValues[0].toString(), priceRangeValues[1].toString()]} />
               

            </fieldset>
            <fieldset className={`${style['checkbox-group']}`}>
                <legend>Options</legend>
                <div className={style['checkbox-item']}>
                    <input id="browse__discounted" type="checkbox" onChange={onDiscountedChange} />
                    <label htmlFor="browse__discounted">Discounted</label>
                </div>
                <div className={style['availability-options']}>
                    <span>Availability:</span>
                    <input type="radio" id="all" name="availability" value="all" defaultChecked onChange={() => setCheckBoxes((prev) => ({...prev, isOnHold: false, isAvailable: false}))}/>

                </div>
                <div className={style['checkbox-item']}>
                    <input id="browse__on-hold" type="checkbox" onChange={onHoldChange} />
                    <label htmlFor="browse__on-hold">On Hold</label>
                </div>
                <div className={style['checkbox-item']}>
                    <input id="browse__available" type="checkbox" onChange={onAvailableChange} />
                    <label htmlFor="browse__available">Available</label>
                </div>
            </fieldset>
            <ActionButton type="link" color="deepskyblue" title="Apply Filters" onClick={applyFilters} />
        </section>
        <div className={style['filter-button-container']}>
            <button className={style['filter-button--mobile']} onClick={revealMobileFilter}>
                <BsFilter /> 
                <span className={style["fitler-button__text"]}>Filter</span> 
            </button>
        </div>
        </>
        
    );
};

export default OrderFilter;