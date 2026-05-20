import React, {useState, useEffect} from 'react';
import style from './order-page-section-switcher.module.css';

type OrderPageSectionSwitcherProps = Record<string, never>;

const OrderPageSectionSwitcher: React.FC<OrderPageSectionSwitcherProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-page-section-switcher']}>
            OrderPageSectionSwitcher
        </div>
    );
};

export default OrderPageSectionSwitcher;