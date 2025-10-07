import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../types/order";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, name, ids } = req.query;

  switch (req.method) {
    case "GET":
      // Get a order
      const orders:Order[] = [

      ];
      if(id && typeof id === "string"){
        const order = orders.find(order => order.id === id);
        if(!order) return res.status(404).json({ message: "Order not found" });
        return res.status(200).json(order);
      } if(ids && Array.isArray(ids)){
        const filteredOrders = orders.filter(order => ids.includes(order.id.toString()));
        return res.status(200).json(filteredOrders);
  
      }
      res.status(200).json({ id, name: `Order ${id}` });
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

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
