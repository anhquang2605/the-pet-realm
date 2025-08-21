import React from 'react';
import style from './order-viewer.module.css';
import { Order } from '../../../../types/order';
import PetCard from '../../../universals/pet-card/pet-card';

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
                                <p>Loading...</p>
                            )
                        }
        </div>
    );
};

export default OrderViewer;