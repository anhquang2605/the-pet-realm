import {createContext, useState, useEffect } from 'react';
import { Order, RawOrder } from '../../../types/order';
import { fetchFromGetAPI } from '../../../libs/api-interactions';

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
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
}