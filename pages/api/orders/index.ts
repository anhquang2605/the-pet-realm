import { NextApiRequest, NextApiResponse } from "next";
import { RawOrder } from "../../../types/order";
import { getCollectionFromDB } from "../../../libs/db-interactions";
import { ObjectId } from "mongodb";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, ids, status, isGettingPriceRange, isPartial, partialFields } = req.query;
  const ordersCollection = await getCollectionFromDB("orders");
  if(!ordersCollection) return res.status(500).json({ message: "Database connection error" });
  switch (req.method) {
    case "GET":
      // Get a order

      if(id && typeof id === "string"){
        const order = await ordersCollection.find({
          _id: new ObjectId(id)
        }).toArray();
        if(!order) return res.status(404).json({ message: "RawOrder not found" });
        return res.status(200).json(
          order);
      } else if(ids && Array.isArray(ids)){
       const filteredOrders = await ordersCollection.find((order: RawOrder) => ids.includes(order._id.toString())).toArray();
        if(!filteredOrders) return res.status(404).json({ message: "Orders not found" });
        return res.status(200).json(filteredOrders);
      } else if (name && typeof name === "string"){
        const filteredOrders = await ordersCollection.find((order: RawOrder) => order.name?.toLowerCase().includes(name.toLowerCase())).toArray();
        if(!filteredOrders) return res.status(404).json({ message: "Orders not found" });
        return res.status(200).json(filteredOrders);
      } else if (status && typeof status === "string") {
        const filteredOrders = await ordersCollection.find((order: RawOrder) => order.status === status).toArray();
        if(!filteredOrders) return res.status(404).json({ message: "Orders not found" });
        return res.status(200).json(filteredOrders);
      } else if(isGettingPriceRange && isGettingPriceRange === "true") {
        ordersCollection.aggregate([
          {
            $group: { 
              _id: null,
              minPrice: { $min: "$price" },
              maxPrice: { $max: "$price" }
            }
          }
        ]).toArray()
        .then((result) => {
          if(result.length === 0) return res.status(404).json({ message: "No orders found" });
          const { minPrice, maxPrice } = result[0];
          return res.status(200).json({ minPrice, maxPrice });
        })  
        // Handle price range request
      } else {
        const allOrders = await ordersCollection.find().toArray();
        return res.status(200).json(allOrders);
      }
        break;
    case "PUT":
      // Update a order
      const updateData = req.body;
      if(!updateData) return res.status(400).json({ message: "No data provided" });
      const idToUpdate = updateData._id;
      if(!idToUpdate) return res.status(400).json({ message: "No id provided" });
      const result = await ordersCollection.updateOne(
        { _id: new ObjectId(idToUpdate) },
        { $set: updateData }
      );
      if(result.modifiedCount === 0) return res.status(404).json({ message: "RawOrder not found or no changes made" });
      res.status(200).json({ message: `RawOrder ${id} updated`, data: updateData });
      break;

    case "DELETE":
      // Delete a order
      res.status(200).json({ message: `RawOrder ${id} deleted` });
      break;
    case "POST":
      // special cases, with serialized array data for specfied fields of the order object, to be used for partial obtain
      // Create a new order
      const {newData, orderId, partialFields } = req.body;
      if(orderId && typeof orderId === "string"){
        //get order by id and return partial fields
        const order = await ordersCollection.findOne({ _id: new ObjectId(orderId) });
        if(!order) return res.status(404).json({ message: "RawOrder not found" });
        const projectObject: { [key: string]: number } = {};
        if(partialFields && Array.isArray(partialFields)){
          partialFields.forEach((field: string) => {
            projectObject[field] = 1;
          });
        }
        const partialOrder = await ordersCollection.findOne(
          { _id: new ObjectId(orderId) },
          { projection: projectObject }
        );
        if(!partialOrder) return res.status(404).json({ message: "RawOrder not found" });
        return res.status(200).json(partialOrder);
      }
      if(!newData) return res.status(400).json({ message: "No data provided" });
      if(newData && typeof newData === "object"){
        const newOrder: RawOrder = newData;
        try{
          ordersCollection.insertOne(newOrder);
          return res.status(201).json({ message: "RawOrder created", data: newOrder });
        } catch(e){
          console.log(e);
          return res.status(500).json({ message: "Error creating order", error: e });
        }
      }
      if(newData && newData.length > 0){
        const newOrders: RawOrder[] = newData;
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
