import React, { use, useEffect } from 'react';
import style from './page-styles/browse.module.css';
import { browseOrderItems } from '../local_data/mock-order-data';
import { Order, RawOrder } from '../types/order';
import PetCard from '../components/universals/pet-card/pet-card';
interface BrowseProps {
    orders: RawOrder[]
}
const fetchBrowseData = async () => {
    // Simulate fetching data for the browse page
    const data =  browseOrderItems; // This would be replaced with an actual API call
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
            id: order.id.toString(),
            dateCreated: order.dateCreated.toISOString(), // Convert Date to ISO string
            dateUpdated: order.dateUpdated.toISOString(), // Convert Date to ISO string
        }));
          props.orders = rawOrders; // Assign the fetched data to props
    }
      
    return { props,
    };
}
const Browse: React.FC<BrowseProps> = ({
    orders
}) => {
    const [orderItems, setOrderItems] = React.useState<Order[]>([]);
    useEffect(()=>{
        setOrderItems(convertToOrders(orders));
    }, [orders]);
    return (
        <div className={style['browse']}>
            {
                orderItems.length > 0 ? 
                (
                    orderItems.map((order: Order, index: number) => (
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

const convertToOrders = (rawOrders: RawOrder[]): Order[] => {
    return rawOrders.map((rawOrder) => ({
        ...rawOrder,
        dateCreated: new Date(rawOrder.dateCreated),
        dateUpdated: new Date(rawOrder.dateUpdated),
    }));    
}
export default Browse;