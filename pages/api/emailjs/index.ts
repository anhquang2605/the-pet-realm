import type { NextApiRequest, NextApiResponse } from "next";

const SERVICE_ID = process.env.EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY!;
const PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY!; // Ensure this is set in your environment variables
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
    // EmailJS template variables
    const templateParams = {
      customer_name: customerName,
      customer_email: customerEmail,
      order_id: orderId,
      total: total,
      name: "The Pet Realm",
    };

    const response = await fetch(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: SERVICE_ID,
          template_id: TEMPLATE_ID,
          user_id: PUBLIC_KEY,
          template_params: templateParams,
          accessToken: PRIVATE_KEY, // Use the private key for server-side requests
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.error("EmailJS error:", errorText);

      return res.status(500).json({
        error: "Failed to send email",
      });
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Email error:", error);

    return res.status(500).json({
      error: "Failed to send email",
    });
  }
}