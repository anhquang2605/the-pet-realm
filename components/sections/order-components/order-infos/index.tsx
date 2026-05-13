import React, {useState, useEffect, useContext} from 'react';
import style from './order-infos.module.css';

import { useOrderContext} from '../useOrderContext';

type OrderInfosProps = Record<string, never>;

const OrderInfos: React.FC<OrderInfosProps> = ({}) => {
    const { order } = useOrderContext();

    useEffect(() => {

    }, []);

    return (
        <section className={style['order-infos']}>
            
        </section>
    );
};

export default OrderInfos;