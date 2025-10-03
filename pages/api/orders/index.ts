import { NextApiRequest, NextApiResponse } from "next";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      // Get a user
      res.status(200).json({ id, name: `User ${id}` });
      break;

    case "PUT":
      // Update a user
      const updateData = req.body;
      res.status(200).json({ message: `User ${id} updated`, data: updateData });
      break;

    case "DELETE":
      // Delete a user
      res.status(200).json({ message: `User ${id} deleted` });
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
