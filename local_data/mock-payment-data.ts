import { Payments, Shipping } from '../types/payment';
export const MOCK_PAYMENT: Payments = {
    cardNumber: '1234567890123456',
    cardHolderName: 'John Doe',
    expiryDate: '12/25',
    cvv: '123',
    billingAddress1: '123 Main St',
    billingAddress2: 'Apt 4B',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
}
export const MOCK_SHIPPING: Shipping = {
    recipientName: 'John Doe',
    email: 'jD4t3@example.com',
    city: 'New York',
    state: 'NY',
    postalCode: '10001',
    country: 'USA',
    phoneNumber: '123-456-7890',
}