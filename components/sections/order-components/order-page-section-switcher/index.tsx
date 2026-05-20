import React, {useState, useEffect} from 'react';
import style from './order-page-section-switcher.module.css';

type OrderPageSectionSwitcherProps = {
    sectionName: string;
};

const OrderPageSectionSwitcher: React.FC<OrderPageSectionSwitcherProps> = ({ sectionName }) => {
    useEffect(() => {

    }, []);
    const getSectionComponent = () => {
        switch (sectionName) {
            case 'details':
                return <div>OrderDetails</div>;
            case 'payment':
                return <div>OrderPayment</div>;
            default:
                return null;
        }
    }
    return (
        <div className={style['order-page-section-switcher']}>
            {getSectionComponent()}
        </div>
    );
};

export default OrderPageSectionSwitcher;