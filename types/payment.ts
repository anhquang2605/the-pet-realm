import { ObjectId } from "mongodb";

export interface Payments {
    cardNumber: string;//last 4 digits of the card number
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
export interface PaymentMethod extends Payments {
    id: string | ObjectId;
    dateCreated: Date;
    last4Digits: string;
    methodType: 'credit' | 'debit' | 'paypal' | 'other'; // Example types
    paymentIntentId: string; // For tracking payment intents if using a service like Stripe
}
export interface Shipping{
    recipientName: string;
    email: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
}