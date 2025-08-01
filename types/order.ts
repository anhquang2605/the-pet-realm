interface Order{
    name: string;
    id: string;
    price: number;
    dateCreated: Date;
    status: string; // e.g., 'pending', 'completed', 'cancelled'
    descrition?: string; // Optional field for additional details
    
}