import React, {useState, useEffect} from 'react';
import style from './order-preview.module.css';
import { useOrderContext } from '../useOrderContext';

type OrderPreviewProps = Record<string, never>;

const OrderPreview: React.FC<OrderPreviewProps> = ({}) => {
    const {order} = useOrderContext()!;
    useEffect(() => {

    }, []);

    return (
        <div className={style['order-preview']}>
            OrderPreview
        </div>
    );
};

export default OrderPreview;