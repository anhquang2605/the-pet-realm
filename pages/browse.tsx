import React from 'react';
import style from './page-styles/browse.module.css';
import { browseOrderItems } from '../local_data/mock-order-data';
import { Order } from '../types/order';
interface BrowseProps {
    orders: Order[]
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
        browseData.forEach((order: Order) => {
            order.id = order.id.toString();
            order.dateCreated = order.dateCreated.toString();
        })
        props.orders = browseData;
    }
    return { props,
    };
}
const Browse: React.FC<BrowseProps> = ({}) => {
    return (
        <div className={style['browse']}>
            Browse
        </div>
    );
};

export default Browse;