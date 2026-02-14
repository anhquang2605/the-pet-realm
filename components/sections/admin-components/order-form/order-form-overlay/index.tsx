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
        return  
    }
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-form-overlay'] + " backdrop-blur-md "}>
            {
                overlayItems.length > 0 && overlayItems.map((item, index) => (
                    <OverlayItemContainer key={index} item={item.innerItem} isVisible={item.type === currentStatus} />     
                ))
            }
        </div>
    );
};

export default OrderFormOverlay;