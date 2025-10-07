import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../types/order";
import { getCollectionFromDB } from "../../../libs/db-interactions";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, ids } = req.query;
  const ordersCollection = await getCollectionFromDB("orders");
  if(!ordersCollection) return res.status(500).json({ message: "Database connection error" });
  switch (req.method) {
    case "GET":
      // Get a order
      const orders:Order[] = [

      ];
      if(id && typeof id === "string"){
        const order = ordersCollection.find((order: Order) => order.id === id);
        if(!order) return res.status(404).json({ message: "Order not found" });
        return res.status(200).json(order);
      } else if(ids && Array.isArray(ids)){
       const filteredOrders = ordersCollection.find((order: Order) => ids.includes(order.id as string));
        if(!filteredOrders) return res.status(404).json({ message: "Orders not found" });
        return res.status(200).json(filteredOrders);
      } else if (name && typeof name === "string"){
        const filteredOrders = ordersCollection.find((order: Order) => order.name?.toLowerCase().includes(name.toLowerCase()));
        if(!filteredOrders) return res.status(404).json({ message: "Orders not found" });
        return res.status(200).json(filteredOrders);
      }
        break;
    case "PUT":
      // Update a order
      const updateData = req.body;

      res.status(200).json({ message: `Order ${id} updated`, data: updateData });
      break;

    case "DELETE":
      // Delete a order
      res.status(200).json({ message: `Order ${id} deleted` });
      break;
    case "POST":
      // Create a new order
      const newData = req.body;
      if(!newData) return res.status(400).json({ message: "No data provided" });
      if(newData && newData.length === 1){
        const newOrder: Order = newData[0];
        try{
          ordersCollection.insertOne(newOrder);
          return res.status(201).json({ message: "Order created", data: newOrder });
        } catch(e){
          return res.status(500).json({ message: "Error creating order", error: e });
        }
      }
      if(newData && newData.length > 1){
        const newOrders: Order[] = newData;
        try{
          ordersCollection.insertMany(newOrders);
          return res.status(201).json({ message: "Orders created", data: newOrders });
        } catch(e){
          return res.status(500).json({ message: "Error creating orders", error: e });
        }
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
