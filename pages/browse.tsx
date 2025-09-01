import React, { use, useEffect } from 'react';
import style from './page-styles/browse.module.css';
import { browseOrderItems } from '../local_data/mock-order-data';
import { Order, RawOrder } from '../types/order';
import OrderFilter from '../components/sections/browse-components/order-fitler/order-filter';
import OrderSorter from '../components/sections/browse-components/order-sorter/order-sorter';
import OrderViewer from '../components/sections/browse-components/order-viewer/order-viewer';
import { OrderFilterI } from '../components/sections/browse-components/order-fitler/order-filter';

interface BrowseProps {
    orders: RawOrder[];
    priceRange?: [number, number];
}
const fetchBrowseData = async () => {
    // Simulate fetching data for the browse page
    const data =  browseOrderItems; // This would be replaced with an actual API call
    return data;
}
const fetchPriceRange = async () => {
    // Simulate fetching price range data
    return [0, 1000]; // Example price range
}
export async function getStaticProps() {
    const props: BrowseProps = {
        orders: [], // Initialize with an empty array or fetch actual data
        priceRange: [0, 1000], // Default price range
    };
    // Fetch data for the browse page
    const browseData = await fetchBrowseData()
    const priceRange = await fetchPriceRange();
    if (browseData) {
       const rawOrders: RawOrder[] = browseData.map((order: Order) => ({
            ...order,
            id: order.id.toString(),
            dateCreated: order.dateCreated.toISOString(), // Convert Date to ISO string
            dateUpdated: order.dateUpdated.toISOString(), // Convert Date to ISO string
        }));
          props.orders = rawOrders; // Assign the fetched data to props
        props.priceRange = priceRange as [number, number];
    }
      
    return { props,
    };
}
const Browse: React.FC<BrowseProps> = ({
    orders,
    priceRange = [0, 1000],
}) => {
    const [orderItems, setOrderItems] = React.useState<Order[]>([]);
    const [filter, setFilter] = React.useState<OrderFilterI>({
        priceRange: [0, Infinity],
        isDiscounted: false,
        isOnHold: false,
        isAvailable: false,
    });
    useEffect(()=>{  
        setOrderItems(convertToOrders(orders));
    }, [orders]);
    useEffect(() => {
        if(orderItems.length > 0){
             setOrderItems(applyFilters(orderItems, filter));
        }
    }, [filter]);
    return (
        <div id="browse-page" className={style['browse']}>
           <OrderFilter setFilter={setFilter} priceRange={priceRange} />
           <OrderSorter />
           <OrderViewer orders={orderItems} />
        </div>
    );
};

const convertToOrders = (rawOrders: RawOrder[]): Order[] => {
    return rawOrders.map((rawOrder) => ({
        ...rawOrder,
        dateCreated: new Date(rawOrder.dateCreated),
        dateUpdated: new Date(rawOrder.dateUpdated),
    }));    
}
const applyFilters = (orders: Order[], filter: OrderFilterI) => {
    return orders.filter(order => {
        const withinPriceRange = order.price >= filter.priceRange[0] && order.price <= filter.priceRange[1];
        const matchesDiscount = filter.isDiscounted ? order.discount > 0 : true;
        const matchesOnHold = filter.isOnHold ? order.status === 'pending' : true;
        const matchesAvailability = filter.isAvailable ? order.status === 'fresh' : true;
        return withinPriceRange && matchesDiscount && matchesOnHold && matchesAvailability;
    });
}
export default Browse;