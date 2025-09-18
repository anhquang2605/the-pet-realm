import React from 'react';
import style from './order-viewer.module.css';
import { Order } from '../../../../types/order';
import PetCard from '../../../universals/pet-card/pet-card';
import Image from 'next/image';
interface OrderViewerProps {
    orders: Order[]
}

const OrderViewer: React.FC<OrderViewerProps> = ({orders}) => {
    return (
        <div className={style['order-viewer']}>
             {
                            orders.length > 0 ? 
                            (
                                orders.map((order: Order, index: number) => (
                                    <PetCard key={index} name={order.name} price={order.price} imageUrl={order.imageUrls[0]} description={order.description} discount={order.discount} />
                                )
                            )) : 
                            (
                                <section className={style['order-viewer__no-orders']}>
                                    <p className={style['order-viewer__no-orders__text']}>No orders found</p>
                                    <Image src="/asset/images/dogpet.webp" alt="No orders found" width={250} height={250} />
                                </section>
                            )
                        }
        </div>
    );
};

export default OrderViewer;