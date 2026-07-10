// Mock Data Generator Script
// Document count: 30

const { faker } = require("@faker-js/faker");

// Database and collection configuration - edit these to target a different location
const DB_NAME = "the-pet-realm";
const COLL_NAME = "orders";

// Connect to database
use(DB_NAME);

// Document generation function
function generateDocument() {
  return {
    _id: new ObjectId(),
    dateCreated: faker.date.past(),
    dateUpdated: faker.date.recent(),
    description: faker.lorem.sentence(),
    discount: faker.number.float({
      min: 0,
      max: 1000,
      fractionDigits: 2
    }),
    imageUrls: Array.from({ length: 2 }, () =>
      faker.image.url()
    ),
    isFeatured: faker.datatype.boolean(),
    name: faker.commerce.productName(),
    paymentId: faker.string.alphanumeric({
      length: 12
    }),
    price: faker.number.float({
      min: 1,
      max: 5000,
      fractionDigits: 2
    }),
    shipmentId: faker.string.alphanumeric({
      length: 12
    }),
    status: faker.helpers.arrayElement([
      "pending",
      "paid",
      "fresh",
      "cancelled"
    ])
  };
}

const BATCH_SIZE = 1000; // Number of documents to insert per batch
const TOTAL_DOCUMENTS = 30;
const numBatches = Math.ceil(
  TOTAL_DOCUMENTS / BATCH_SIZE
);

console.log(
  `Starting mock data generation for ${DB_NAME}.${COLL_NAME}`
);
console.log(
  `Total documents to generate: ${TOTAL_DOCUMENTS} documents`
);
console.log(
  `Batch size: ${BATCH_SIZE} documents per batch`
);

const startTime = new Date();

for (
  let batchStart = 0;
  batchStart < TOTAL_DOCUMENTS;
  batchStart += BATCH_SIZE
) {
  const batchEnd = Math.min(
    batchStart + BATCH_SIZE,
    TOTAL_DOCUMENTS
  );
  const batchSize = batchEnd - batchStart;

  console.log(
    `Generating batch ${
      Math.floor(batchStart / BATCH_SIZE) + 1
    } of ${numBatches} (${batchSize} documents)...`
  );

  // Generate documents for this batch
  const batchDocuments = [];
  for (let i = 0; i < batchSize; i++) {
    batchDocuments.push(generateDocument());
  }

  // Insert the batch
  db.getCollection(COLL_NAME).insertMany(
    batchDocuments
  );

  console.log(`Batch inserted successfully.`);
}

const endTime = new Date();
const duration = (
  (endTime - startTime) /
  1000
).toFixed(2);

console.log(
  `\n=== Mock Data Generation Complete ===`
);
console.log(`Total time: ${duration} seconds`);
console.log(
  `Collection: ${DB_NAME}.${COLL_NAME}`
);