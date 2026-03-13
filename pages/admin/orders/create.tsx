import React, { useState } from "react";
import { NextPage } from "next";
import OrderForm, { OrderFormData } from "../../../components/sections/admin-components/order-form/order-form";
import styles from "./../../page-styles/order-create.module.css"
import { Order } from "../../../types/order";
import OrderFormOverlay from "../../../components/sections/admin-components/order-form/order-form-overlay";

// /d:/Front end projects/the-pet-realm/pages/orders/create.tsx


export type MessageStatus = "idle" | "submitting" | "success" | "error";
type Props = Record<string, never>;
const OVERLAY_ITEMS = [
    {
        message: "Submitting order...",
        type: "submitting",
    },
    {
        message: "Order created successfully!",
        type: "success",    
    },
    {
        message: "Failed to create order. Please try again.",
        type: "error",
    }
]
const CreateOrderPage: NextPage<Props> = ({}) => {
    const [formStatus, setFormStatus] = useState<MessageStatus>("idle");
    // Handle form submission

    async function handleSubmit(e: OrderFormData) {
        setFormStatus("submitting");
        try {
            // Replace with your real API endpoint. This demonstrates how you'd submit.
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e),
            });

            if (!res.ok) throw new Error("Failed to create order");

            setFormStatus("success");
           
        } catch (err) {
            setFormStatus("error");
            console.error(err);
        }
    }


    return (
        <main className={styles['create-order']}>
            <OrderForm onSubmit={handleSubmit} status={formStatus} setStatus={setFormStatus} />
            { formStatus !== "idle" && <OrderFormOverlay setStatus={setFormStatus} overlayItems={OVERLAY_ITEMS} currentStatus={formStatus} />}
        </main>
    );
};

export default CreateOrderPage;