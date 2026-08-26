import Taxjar from 'taxjar';
const key = process.env.TAXJAR_API_KEY;
const client = new Taxjar({
    apiKey: key || '',
});
export const calculateTax = async (amount: number) => {
    try {
        const tax = await client.taxForOrder({
            from_country: 'US',
            from_zip: '10001',
            from_state: 'NY',
            to_country: 'US',
            to_zip: '90001',
            to_state: 'NY',
            amount: amount,
            shipping: 0,
        }) 
        return tax;
    } catch (error) {
        console.log(error);
    }  
};