interface Order{
    name: string;
    id: string;
    price: number;
    dateCreated: Date;
    status: 'pending' | 'completed' | 'cancelled' | 'fresh'; // e.g., 'pending', 'completed', 'cancelled'
    descrition?: string; // Optional field for additional details
    dateUpdated?: Date; // Optional field for tracking updates
}

export default Order

interface OrderImage {
    id: string;
    orderId: string;
    imageUrl: string;
    altText?: string; // Optional field for image description
    dateCreated: Date;
    isThumbnail: boolean; // Indicates if this is the main image for the order,
}