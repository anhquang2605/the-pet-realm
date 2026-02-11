import React, {useState, useEffect} from 'react';
import style from './order-form-overlay.module.css';
export type OverlayItem = {
    message: string;
    type: string;
    innerItems?: React.ReactNode;
}
type OrderFormOverlayProps = {
    overlayItems: OverlayItem[];
}

const OrderFormOverlay: React.FC<OrderFormOverlayProps> = ({
    

}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-form-overlay']}>
            OrderFormOverlay
        </div>
    );
};

export default OrderFormOverlay;