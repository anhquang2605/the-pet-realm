import React, {useState, useEffect} from 'react';
import style from './order-form-overlay.module.css';
import OverlayItemContainer from './overlay-item-container';
export type OverlayItem = {
    message: string;
    type: string;
    innerItem?: React.ReactNode;
    hasInnerItem?: boolean;
}
type OrderFormOverlayProps = {
    overlayItems: OverlayItem[];
    currentStatus?: string;
}

const OrderFormOverlay: React.FC<OrderFormOverlayProps> = ({
    overlayItems,
    currentStatus
}) => {
    const generateOverlayContent = () => {
        return overlayItems.map((item, index) => (
            <OverlayItemContainer key={index} item={item.innerItem}  />     
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