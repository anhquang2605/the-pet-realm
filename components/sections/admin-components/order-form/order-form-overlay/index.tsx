import React, {useState, useEffect} from 'react';
import style from './order-form-overlay.module.css';
import OverlayItemContainer from './overlay-item-container';
import { RiCloseLargeFill } from "react-icons/ri";
import { MessageStatus } from '../../../../../pages/admin/orders/create';
export type OverlayItem = {
    message: string;
    type: string;
    innerItem?: React.ReactNode;
    hasInnerItem?: boolean;
}
type OrderFormOverlayProps = {
    overlayItems: OverlayItem[];
    currentStatus?: MessageStatus;
    setStatus?: (status: MessageStatus) => void;
}

const OrderFormOverlay: React.FC<OrderFormOverlayProps> = ({
    overlayItems,
    currentStatus,
    setStatus = () => {},
}) => {
    const generateOverlayContent = () => {
        return  
    }
    const handleClose = () => {
        setStatus("idle");
    }
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-form-overlay'] + " backdrop-blur-md "}>
            {
                currentStatus === 'error' 
                &&
                <button className={style['close-button']} onClick={handleClose}><RiCloseLargeFill size={32}/></button>
            }
            {
                overlayItems.length > 0 && overlayItems.map((item, index) => (
                    <OverlayItemContainer key={index} item={item.message} isVisible={item.type === currentStatus} status={item.type} />     
                ))
            }
        </div>
    );
};

export default OrderFormOverlay;