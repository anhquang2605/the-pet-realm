import React, {useState, useEffect} from 'react';
import style from './order-preview.module.css';

type OrderPreviewProps = Record<string, never>;

const OrderPreview: React.FC<OrderPreviewProps> = ({}) => {
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-preview']}>
            OrderPreview
        </div>
    );
};

export default OrderPreview;