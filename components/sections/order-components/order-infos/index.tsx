import React, {useState, useEffect, useContext} from 'react';
import style from './order-infos.module.css';

import { useOrderContext} from '../useOrderContext';

type OrderInfosProps = Record<string, never>;

const OrderInfos: React.FC<OrderInfosProps> = ({}) => {
    const { order } = useOrderContext();
    useEffect(() => {

    }, []);

    return (
        order && <section className={style['order-infos']}>
            <h3 className={style['order-name']}>
                {order.name}
            </h3>
            <p className={style['order-description']}>
                {order.description}
            </p>
            <span className={style['order-price'] + ' ' + (order.discount > 0 && style['order-original'])}>${order.price}</span>
            <span className={style['order-discounted']}>${order.discount * order.price}</span>
        </section>
    );
};

export default OrderInfos;