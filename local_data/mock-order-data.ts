import { FeatureItems, RawOrder } from "../types/order";
import { ObjectId } from 'mongodb'; // If using MongoDB
 export const mockOrderItems: FeatureItems[] = [
      {
    id: "pet-001",
    name: "Golden Retriever Puppy",
    price: 1200,
    imageUrl: "https://picsum.photos/id/237/300/400", // Dog image
    description: "Friendly and loves fetch!",
    discount: 0,
  },
  {
    id: "pet-003",
    name: "Parakeet (Blue)",
    price: 45,
    imageUrl: "https://picsum.photos/id/100/300/400", // Bird-like image
    discount: 0.1,
  },
  {
    id: "pet-004",
    name: "Holland Lop Rabbit",
    price: 150,
    imageUrl: "https://picsum.photos/id/400/300/400", // Rabbit-like image
    discount: 0.25,
  },
  {
    id: "pet-005",
    name: "Bearded Dragon",
    price: 90,
    imageUrl: "https://picsum.photos/id/500/300/400", // Reptile-like image
    discount: 0.3,
  },
  {
    id: "pet-006",
    name: "Pomeranian",
    price: 950,
    imageUrl: "https://picsum.photos/id/1025/300/400", // Small dog image
    discount: 0.4,
  },
    {
    id: "pet-001",
    name: "Golden Retriever Puppy",
    price: 1200,
    imageUrl: "https://picsum.photos/id/237/300/400", // Dog image
    description: "Friendly and loves fetch!",
    discount: 0.2,
  },
  {
    id: "pet-003",
    name: "Parakeet (Blue)",
    price: 45,
    imageUrl: "https://picsum.photos/id/100/300/400", // Bird-like image
    discount: 0.1,
  },
  {
    id: "pet-004",
    name: "Holland Lop Rabbit",
    price: 150,
    imageUrl: "https://picsum.photos/id/400/300/400", // Rabbit-like image
    discount: 0.25,
  },
  {
    id: "pet-005",
    name: "Bearded Dragon",
    price: 90,
    imageUrl: "https://picsum.photos/id/500/300/400", // Reptile-like image
    discount: 0.3,
  },
  {
    id: "pet-006",
    name: "Pomeranian",
    price: 950,
    imageUrl: "https://picsum.photos/id/1025/300/400", // Small dog image
    discount: 0.4,
  }
  ]
const randomizedIDs  = () => {
  const aphabet = 'abcdefghijklmnopqrstuvwxyz';
  let id = '';
  for(let i=0; i<8; i++){
    id += aphabet.charAt(Math.floor(Math.random() * aphabet.length));
  }
  return id
}
export const orders: RawOrder[] = [
  {
    _id: new ObjectId(),
    name: "Wireless Gaming Mouse",
    price: 59.99,
    status: "completed",
    description: "Sample description for Wireless Gaming Mouse.",
    imageUrls: ["https://picsum.photos/seed/order1/800/600"],
    discount: 0.1,
    isFeatured: true,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-01T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-01T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Mechanical Keyboard",
    price: 109.5,
    status: "pending",
    description: "Sample description for Mechanical Keyboard.",
    imageUrls: ["https://picsum.photos/seed/order2/800/600"],
    discount: 0.05,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-02T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-02T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "USB-C Hub",
    price: 39.99,
    status: "fresh",
    description: "Sample description for USB-C Hub.",
    imageUrls: ["https://picsum.photos/seed/order3/800/600"],
    discount: 0.15,
    isFeatured: false,
    paymentId: "" ,
    shipmentId: "" ,
    dateCreated: new Date("2026-07-03T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-03T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Bluetooth Speaker",
    price: 89.95,
    status: "completed",
    description: "Sample description for Bluetooth Speaker.",
    imageUrls: ["https://picsum.photos/seed/order4/800/600"],
    discount: 0.2,
    isFeatured: true,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-04T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-04T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Noise Cancelling Headphones",
    price: 249.99,
    status: "cancelled",
    description: "Sample description for Noise Cancelling Headphones.",
    imageUrls: ["https://picsum.photos/seed/order5/800/600"],
    discount: 0.25,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-05T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-05T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "27-inch 4K Monitor",
    price: 379.99,
    status: "pending",
    description: "Sample description for 27-inch 4K Monitor.",
    imageUrls: ["https://picsum.photos/seed/order6/800/600"],
    discount: 0.12,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-06T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-06T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Laptop Stand",
    price: 45,
    status: "fresh",
    description: "Sample description for Laptop Stand.",
    imageUrls: ["https://picsum.photos/seed/order7/800/600"],
    discount: 0.08,
    isFeatured: true,
    paymentId: "" ,
    shipmentId: "" ,
    dateCreated: new Date("2026-07-07T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-07T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Portable SSD 1TB",
    price: 139.99,
    status: "completed",
    description: "Sample description for Portable SSD 1TB.",
    imageUrls: ["https://picsum.photos/seed/order8/800/600"],
    discount: 0.18,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-08T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-08T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Smart Watch",
    price: 199.99,
    status: "pending",
    description: "Sample description for Smart Watch.",
    imageUrls: ["https://picsum.photos/seed/order9/800/600"],
    discount: 0.1,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-01T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-01T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Webcam 1080p",
    price: 69.99,
    status: "completed",
    description: "Sample description for Webcam 1080p.",
    imageUrls: ["https://picsum.photos/seed/order10/800/600"],
    discount: 0.05,
    isFeatured: true,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-02T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-02T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Wireless Charger",
    price: 34.99,
    status: "fresh",
    description: "Sample description for Wireless Charger.",
    imageUrls: ["https://picsum.photos/seed/order11/800/600"],
    discount: 0.0,
    isFeatured: false,
    paymentId: "" ,
    shipmentId: "" ,
    dateCreated: new Date("2026-07-03T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-03T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Gaming Chair",
    price: 289,
    status: "pending",
    description: "Sample description for Gaming Chair.",
    imageUrls: ["https://picsum.photos/seed/order12/800/600"],
    discount: 0.22,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-04T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-04T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Desk Lamp",
    price: 49.95,
    status: "completed",
    description: "Sample description for Desk Lamp.",
    imageUrls: ["https://picsum.photos/seed/order13/800/600"],
    discount: 0.1,
    isFeatured: true,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-05T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-05T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Office Desk",
    price: 329.99,
    status: "cancelled",
    description: "Sample description for Office Desk.",
    imageUrls: ["https://picsum.photos/seed/order14/800/600"],
    discount: 0.3,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-06T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-06T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "External DVD Drive",
    price: 29.99,
    status: "fresh",
    description: "Sample description for External DVD Drive.",
    imageUrls: ["https://picsum.photos/seed/order15/800/600"],
    discount: 0.05,
    isFeatured: false,
    paymentId: "" ,
    shipmentId: "" ,
    dateCreated: new Date("2026-07-07T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-07T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Wi-Fi Router",
    price: 159.99,
    status: "completed",
    description: "Sample description for Wi-Fi Router.",
    imageUrls: ["https://picsum.photos/seed/order16/800/600"],
    discount: 0.14,
    isFeatured: true,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-08T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-08T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Tablet 11-inch",
    price: 449.99,
    status: "pending",
    description: "Sample description for Tablet 11-inch.",
    imageUrls: ["https://picsum.photos/seed/order17/800/600"],
    discount: 0.1,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-01T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-01T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Action Camera",
    price: 299.99,
    status: "completed",
    description: "Sample description for Action Camera.",
    imageUrls: ["https://picsum.photos/seed/order18/800/600"],
    discount: 0.15,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-02T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-02T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "Smart Home Hub",
    price: 129.99,
    status: "fresh",
    description: "Sample description for Smart Home Hub.",
    imageUrls: ["https://picsum.photos/seed/order19/800/600"],
    discount: 0.07,
    isFeatured: true,
    paymentId: "" ,
    shipmentId: "" ,
    dateCreated: new Date("2026-07-03T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-03T10:00:00.000Z").toISOString()
  },
  {
    _id: new ObjectId(),
    name: "USB Microphone",
    price: 89.99,
    status: "completed",
    description: "Sample description for USB Microphone.",
    imageUrls: ["https://picsum.photos/seed/order20/800/600"],
    discount: 0.12,
    isFeatured: false,
    paymentId: new ObjectId(),
    shipmentId: new ObjectId(),
    dateCreated: new Date("2026-07-04T09:00:00.000Z").toISOString(),
    dateUpdated: new Date("2026-07-04T10:00:00.000Z").toISOString()
  },
];