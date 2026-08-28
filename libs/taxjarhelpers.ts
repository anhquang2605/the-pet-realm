import Taxjar from 'taxjar';
import { Shipping } from '../types/payment';
const key = process.env.TAXJAR_API_KEY;
const client = new Taxjar({
    apiKey: key || '',
});
export const calculateTaxFromTaxJar = async (shipping: Shipping, amount: number) => {
    try {
        const tax = await client.taxForOrder({
            from_country: 'US',
            from_zip: '10001',
            to_country: shipping.country,
            to_zip: shipping.postalCode,
            to_state: shipping.state,
            amount: amount,
            shipping: 0
        }) 
        return tax;
    } catch (error) {
        console.log(error);
    }  
};