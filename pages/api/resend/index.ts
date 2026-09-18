import type { NextApiRequest, NextApiResponse } from "next";
import emailjs from "@emailjs/browser";



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    customerEmail,
    customerName,
    orderId,
    total,
  } = req.body;

  try {
    // Email to business owner
    await emailjs.send({
      from: "orders@yourdomain.com",
      to: process.env.BUSINESS_EMAIL!,
      subject: `New Order #${orderId}`,
      html: `
        <h2>New Order</h2>
        <p>Customer: ${customerName}</p>
        <p>Email: ${customerEmail}</p>
        <p>Order: #${orderId}</p>
        <p>Total: $${total}</p>
      `,
    });

    // Confirmation email to customer
    await resend.emails.send({
      from: "anhquang2605@gmail.com",
      to: customerEmail,
      subject: `Your Order #${orderId} is Confirmed`,
      html: `
        <h2>Thank you for your order!</h2>
        <p>Hi ${customerName},</p>
        <p>Your order #${orderId} has been successfully received.</p>
        <p>Total: $${total}</p>
      `,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}