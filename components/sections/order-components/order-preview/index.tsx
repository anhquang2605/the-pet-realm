import React, {useState, useEffect} from 'react';
import style from './order-preview.module.css';
import { useOrderContext } from '../useOrderContext';
import {TAX_RATE} from './../../../../constants/price';

type OrderPreviewProps = Record<string, never>;

const OrderPreview: React.FC<OrderPreviewProps> = ({}) => {
    const {order} = useOrderContext()!;
    useEffect(() => {

    }, []);

    return (
        order && <div className={style['order-preview']}>
            <img className={style['order-preview__image']} src={order.imageUrls[0]} alt={order.name} />
            <h4 className={style['order-preview__title']}>
                {order.name}
            </h4>
            <p className={style['order-preview__price']}>
                <span className={style['order-preview__currency']}>$</span>
                <span className={style['order-preview__amount']}>{order.price.toFixed(2)}</span>
                {order.discount > 0 && <span className={style['order-preview__discount']}>-{order.discount * 100}%</span>}
                <span className={style['order-preview__price-tax']}>
                    (incl. tax) 
                    {(order.price * TAX_RATE).toFixed(2)}
                </span>
            </p>
            <p className={style['order-preview__final-price-container']}>
                Final Price:
                <span className={style['order-preview__final-price']}>
                    ${(order.price * (1 - order.discount)).toFixed(2)}
                </span>
            </p>
        </div>
    );
};

export default OrderPreview;