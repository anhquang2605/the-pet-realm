import React, {useState, useEffect} from 'react';
import style from './order-images.module.css';
import { useOrderContext } from '../useOrderContext';
import ImageSlides from './image-slides';


type OrderImagesProps = Record<string, never>;

const OrderImages: React.FC<OrderImagesProps> = ({}) => {
    const { order } = useOrderContext();

    useEffect(() => {

    }, []);

    return (
        order && 
        <section className={style['order-images']}>
            <img className={style['order-image']} src={order.imageUrls[0]} alt={order.name} />
                {order.imageUrls.length > 1 && (
                    <ImageSlides images={order.imageUrls} />
                )}
        </section>
    );
};

export default OrderImages;