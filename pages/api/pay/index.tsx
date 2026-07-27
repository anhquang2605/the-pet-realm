import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const { paymentMethodId, amount } =
        await req.json();

    const paymentIntent =
        await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method: paymentMethodId,
            confirm: true,
        });

    return Response.json(paymentIntent);
}