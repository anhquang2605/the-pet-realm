import React, {useState, useEffect} from 'react';
import style from './order-page-section-switcher.module.css';
import OrderDetails from '../ORDER-SECTIONS/order-details';
import OrderPayment from '../ORDER-SECTIONS/order-payment';
import { useOrderContext } from '../useOrderContext';

type OrderPageSectionSwitcherProps = Record<string, never> ;

const OrderPageSectionSwitcher: React.FC<OrderPageSectionSwitcherProps> = ({ }) => {
    const {sectionName} = useOrderContext();
    useEffect(() => {

    }, []);
    const getSectionComponent = () => {
        switch (sectionName) {
            case 'details':
                return <OrderDetails />;
            case 'payment':
                return <OrderPayment />;
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