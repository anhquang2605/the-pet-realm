import React, {useState, useEffect} from 'react';
import style from './order-page-section-switcher.module.css';
import OrderDetails from '../ORDER-SECTIONS/order-details';
import OrderPayment from '../ORDER-SECTIONS/order-payment';
import { useOrderContext } from '../useOrderContext';
import OrderConfirmation from '../ORDER-SECTIONS/order-confirmation';

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
            case 'confirmation':
                return <OrderConfirmation />;
            default:
                return null;
        }
    }
    return (
        <>
            {getSectionComponent()}
        </>
    );
};

export default OrderPageSectionSwitcher;