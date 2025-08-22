import React, {useEffect } from 'react';
/* import { browseOrderItems } from '../local_data/mock-order-data'; */
import { Order, RawOrder } from '../types/order';
import OrderFilter from '../components/sections/browse-components/order-fitler/order-filter';
import OrderSorter from '../components/sections/browse-components/order-sorter/order-sorter';
import OrderViewer from '../components/sections/browse-components/order-viewer/order-viewer';
interface BrowseProps {
    orders: RawOrder[]
}
const fetchBrowseData = async () => {
    // Simulate fetching data for the browse page
    const data: Order[] =  []; //browseOrderItems; // This would be replaced with an actual API call
    return data;
}
export async function getStaticProps() {
    const props: BrowseProps = {
        orders: [] // Initialize with an empty array or fetch actual data
    };
    // Fetch data for the browse page
    const browseData = await fetchBrowseData()
    if (browseData) {
       const rawOrders: RawOrder[] = browseData.map((order: Order) => ({
            ...order,
            dateCreated: order.dateCreated.toISOString(), // Convert Date to ISO string
            dateUpdated: order.dateUpdated.toISOString(), // Convert Date to ISO string
        }));
          props.orders = rawOrders; // Assign the fetched data to props
    }
      
    return { props,
    };
}
const Shop: React.FC<BrowseProps> = ({
    orders
}) => {
    const [orderItems, setOrderItems] = React.useState<Order[]>([]);
    useEffect(()=>{
        //setOrderItems(convertToOrders(orders));
    }, [orders]);
    return (
        <div className={""}>
           <OrderFilter />
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
export default Shop;