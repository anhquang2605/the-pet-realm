import React from 'react';
import style from './order-viewer.module.css';

interface OrderViewerProps {

}

const OrderViewer: React.FC<OrderViewerProps> = ({}) => {
    return (
        <div className={style['order-viewer']}>
            OrderViewer
        </div>
    );
};

export default OrderViewer;