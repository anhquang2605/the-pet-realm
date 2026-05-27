export interface Payments {
    cardNumber: string;
    cardHolderName: string;
    expiryDate: string; // Format: MM/YY
    cvv: string;
    billingAddress1: string;
    billingAddress2?: string; // Optional
    city: string;
    state: string;
    postalCode: string;
    country: string;
}
export interface Shipment{

}