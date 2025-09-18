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
                                <section>
                                    <h2>No orders found</h2>
                                    <Image src="/assest/images/dogpet.webp" alt="No orders found" width={300} height={300} />
                                </section>
                            )
                        }
        </div>
    );
};

export default OrderViewer;