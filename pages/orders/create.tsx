import React, { useState, FormEvent } from "react";
import { GetStaticProps, NextPage } from "next";
import OrderForm, { OrderFormData } from "../../components/sections/admin-components/order-form/order-form";
import styles from "./../page-styles/order-create.module.css"

// /d:/Front end projects/the-pet-realm/pages/orders/create.tsx

type Product = {
    
};

type Props = {
    products: Product[];
};


const CreateOrderPage: NextPage<Props> = ({}) => {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(e: OrderFormData) {
        
        

        try {
            // Replace with your real API endpoint. This demonstrates how you'd submit.
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(e),
            });

            if (!res.ok) throw new Error("Failed to create order");

           
        } catch (err) {
            setFormStatus("error");
            console.error(err);
        }
    }

    return (
        <main className={styles['create-order']}>
            <OrderForm onSubmit={handleSubmit} status={formStatus} setStatus={setFormStatus} />
          
        </main>
    );
};

export default CreateOrderPage;