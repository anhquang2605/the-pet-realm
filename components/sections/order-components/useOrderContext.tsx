import {createContext, useState, useEffect } from 'react';
import { Order } from '../../../types/order';

type OrderContextType = {
    order: Order | null,
    setOrder: React.Dispatch<React.SetStateAction<any>>
}

interface OrderProviderProps {
    children: React.ReactNode;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [order, setOrder] = useState<Order | null>(null);

    return (
        <OrderContext.Provider value={{ order, setOrder }}>
            {children}
        </OrderContext.Provider>
    );
}