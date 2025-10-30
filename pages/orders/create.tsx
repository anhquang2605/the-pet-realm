import React, { useState, FormEvent } from "react";
import { GetStaticProps, NextPage } from "next";

// /d:/Front end projects/the-pet-realm/pages/orders/create.tsx

type Product = {
    
};

type Props = {
    products: Product[];
};


const CreateOrderPage: NextPage<Props> = ({}) => {
    const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        

        try {
            // Replace with your real API endpoint. This demonstrates how you'd submit.
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to create order");

           
        } catch (err) {
            setFormStatus("error");
            console.error(err);
        }
    }

    return (
        <main style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
            <h1>Create Order</h1>

          
        </main>
    );
};

export default CreateOrderPage;