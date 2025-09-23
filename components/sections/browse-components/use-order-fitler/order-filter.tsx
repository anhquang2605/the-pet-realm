import React, { use, useContext } from 'react';
import style from './order-filter.module.css';
import RangeSlider, { InputEvent } from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import ActionButton from '../../../universals/buttons/action-button/action-button';
import { BsFilter } from "react-icons/bs";
import { FilterContext } from './use-order-filter';
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
    const {revealMobileFilter} = useContext(FilterContext);
    const handleRadioChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        const value = event.target.value;
        switch(value){
            case "all":
                setCheckBoxes((prev) => ({...prev, isOnHold: false, isAvailable: false}));
                break;
            case "on-hold":
                setCheckBoxes((prev) => ({...prev, isOnHold: true, isAvailable: false}));
                break;
            case "available":
                setCheckBoxes((prev) => ({...prev, isOnHold: false, isAvailable: true}));
                break;
        }   
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
                        <label htmlFor="availability">Availability:</label>
                        <fieldset id="availability" className={style['radio-group']}>
                            <input type="radio" id="all" name="availability" value="all" defaultChecked onChange={() => setCheckBoxes((prev) => ({...prev, isOnHold: false, isAvailable: false}))}/>
                            <label htmlFor="all">All</label>
                            <input type="radio" id="on-hold" name="availability" value="on-hold" onChange={handleRadioChange} />
                            <label htmlFor="on-hold">On Hold</label>
                            <input type="radio" id="available" name="availability" value="available" onChange={handleRadioChange} />
                            <label htmlFor="available">Available</label>
                        </fieldset>
                        
                    </div>
                
                </fieldset>
                <ActionButton type="link" color="deepskyblue" title="Apply Filters" onClick={applyFilters} />
            </section>
        </>
        
    );
};

export const MobileFilterRevealButton = () => {
    const {revealMobileFilter} = useContext(FilterContext);
    return (
        <button className={style['filter-button--mobile'] + " icon-button"} onClick={revealMobileFilter} aria-label="Reveal Filters" title="Reveal Filters">
            <BsFilter />
        </button>
    );
};
export default OrderFilter;