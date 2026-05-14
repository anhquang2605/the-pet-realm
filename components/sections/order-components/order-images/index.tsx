import React, {useState, useEffect} from 'react';
import style from './order-images.module.css';
import { useOrderContext } from '../useOrderContext';

type OrderImagesProps = Record<string, never>;

const OrderImages: React.FC<OrderImagesProps> = ({}) => {
    const { order } = useOrderContext();

    useEffect(() => {

    }, []);

    return (
        order && 
        <section className={style['order-images']}>
            <img className={style['order-image']} src={order.imageUrls[0]} alt={order.name} />
            
        </section>
    );
};

export default OrderImages;