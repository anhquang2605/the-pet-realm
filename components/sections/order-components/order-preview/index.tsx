import React, {useState, useEffect} from 'react';
import style from './order-preview.module.css';
import { useOrderContext } from '../useOrderContext';
import {TAX_RATE} from './../../../../constants/price';
import ActionButton from '../../../universals/buttons/action-button/action-button';

type OrderPreviewProps = Record<string, never>;

const OrderPreview: React.FC<OrderPreviewProps> = ({}) => {
    const {order, isReadyToSubmit} = useOrderContext()!;
    useEffect(() => {

    }, []);

    return (
        order && <div className={style['order-preview']}>
            <img className={style['order-preview__image']} src={order.imageUrls[0]} alt={order.name} />
            <h4 className={style['order-preview__title']}>
                {order.name}
            </h4>
            <p className={style['order-preview__price']}>
                <span className={style['order-preview__price-info']}>
                    <span className={style['order-preview__price-label']}>Price</span>
                    <span className={style['order-preview__price-content']}>{order.price.toFixed(2)}</span>
                </span>
                <span className={style['order-preview__price-info']}>
                    <span className={style['order-preview__price-label']}>Tax</span>
                    <span className={style['order-preview__price-content']}>{(order.price * TAX_RATE).toFixed(2)}</span>
                </span>
                <span className={style['order-preview__price-info']}>
                    <span className={style['order-preview__price-label']}>Discount</span>
                    <span className={style['order-preview__price-content']}>-{(order.price * order.discount).toFixed(2)}</span>
                </span>
            </p>
            <p className={style['order-preview__final-price-container']}>
                <span className={style['order-preview__price-label']}>Total:</span>
                <span className={style['order-preview__price-content']}>
                    ${(order.price * (1 - order.discount) + order.price * TAX_RATE).toFixed(2)}
                </span>
            </p>
            <ActionButton isDisabled={!isReadyToSubmit()} title='Place Order' color='goldenrod' type='main' onClick={() => {}} />
        </div>
    );
};

export default OrderPreview;