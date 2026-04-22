import { NextApiRequest, NextApiResponse } from "next";
import { Order } from "../../../types/order";
import { getCollectionFromDB } from "../../../libs/db-interactions";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query } = req.query;
    const ordersCollection = await getCollectionFromDB("orders");
    if(!ordersCollection) return res.status(500).json({ message: "Database connection error" });
    ordersCollection.aggregate([
        {
            $search: {
                index: "the-pet-realm-orders-search",
                autocomplete: {
                    query: query,
                    path: "name",
                    fuzzy: {
                        maxEdits: 1,
                        prefixLength: 1
                    }
                }
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                image: {
                    $ifNull: [ {$arrayElemAt: ["$imageUrls", 0]}, null],   
                },
            }
        }
    ]).toArray()
    .then((results: Partial<Order>[]) => {
        res.status(200).json(results);
    })
    .catch((e) => {
        console.log(e);
        res.status(500).json({ message: "Error fetching search results" });
    });
}