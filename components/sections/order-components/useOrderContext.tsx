import {createContext, useState, useEffect } from 'react';
import { Order, RawOrder } from '../../../types/order';
import { fetchFromGetAPI } from '../../../libs/api-interactions';
import style from './use-order-context.module.css';
type OrderContextType = {
    order: RawOrder | null,
    setOrder: React.Dispatch<React.SetStateAction<any>>
}

interface OrderProviderProps {
    children: React.ReactNode;
    id: string | null;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<OrderProviderProps> = ({ children, id }) => {
    const [order, setOrder] = useState<RawOrder | null>(null);
    const [apiStatus, setApiStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const getOrderDetails = async (id: string) => {
        setApiStatus('loading');
        const path = 'orders';
        try {
            const response = await fetchFromGetAPI(path, { id });
            setOrder(response[0]);
            setApiStatus('success');
        } catch (error) {
            console.error('Error fetching order details:', error);
            setApiStatus('error');
        }
    }
    useEffect(() => {
        if (id) {
            getOrderDetails(id);
        }
    }, [id]);
    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {apiStatus === 'loading' ? <div className={style.loading}>Loading...</div> : children}
        </OrderContext.Provider>
    );
}