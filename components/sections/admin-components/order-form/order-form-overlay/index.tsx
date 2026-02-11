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
    overlayItems

}) => {
    const generateOverlayContent = () => {
        return overlayItems.map((item, index) => (
            <div key={index} className={`${style['overlay-item']} ${style[item.type]}`}>
                {item.message}
                {item.innerItems}
            </div>
        )); 
    }
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-form-overlay']}>
            {
                overlayItems.length > 0 && generateOverlayContent()
            }
        </div>
    );
};

export default OrderFormOverlay;