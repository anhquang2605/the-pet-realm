import {createContext, useState, useEffect, useContext } from 'react';
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
    const deliverContextByStatus = () => {
        switch (apiStatus) {
            case 'loading':
                return <div className={style.loading}>Loading...</div>;
            case 'error':
                return <div className={style.error}>Error loading order details.</div>;
            case 'success':
                return children;
            default:
                return null;
        }
    }
    useEffect(() => {
        if (id) {
            getOrderDetails(id);
        }
    }, [id]);
    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {deliverContextByStatus()}
        </OrderContext.Provider>
    );
}

export function useOrderContext(): OrderContextType{
    const context = useContext(OrderContext);
    if(!context){
        throw new Error('useOrder must be used within a OrderProvider');
    }
    return context;
}
