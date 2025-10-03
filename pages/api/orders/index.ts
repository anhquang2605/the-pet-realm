import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      // Get a order
      
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
