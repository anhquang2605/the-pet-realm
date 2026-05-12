import { useState, useEffect, useRef}  from 'react';
import { useSearchParams } from 'next/navigation';
//get params from url
import { useRouter } from 'next/router';
import { fetchFromGetAPI } from '../../libs/api-interactions';
import { RawOrder } from '../../types/order';
import style from '../page-styles/order.module.css';

export default function OrdersPage( ) {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [order, setOrder] = useState<RawOrder | null>(null);
    const getOrderDetails = async (id: string) => {
        const path = 'orders';
        try {
            const response = await fetchFromGetAPI(path, { id });
            setOrder(response[0]);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
    }
    useEffect(() => {
        if (id) {
            getOrderDetails(id);
        }
    }, [id]);

    return (
        <div className={style['order-page']}>
            
        </div>
    );
}