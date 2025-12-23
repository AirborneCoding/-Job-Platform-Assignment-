import { db } from "./connect";
import { positions } from "../schemas/positions.schemas";

const seedData = [
  {
    title: "Software Engineer",
    department: "Engineering",
    workType: "Hybrid",
    location: "Rabat, Morocco",
    description: "We are looking for a dynamic and experienced Full Stack Developer to join our team...",
  },
  {
    title: "UX Designer",
    department: "Design",
    workType: "Hybrid",
    location: "Rabat, Morocco",
    description: "Join our design team to create amazing user experiences.",
  },
  {
    title: "Product Manager",
    department: "Product",
    workType: "Hybrid",
    location: "Rabat, Morocco",
    description: "Lead product strategy and execution for our platform.",
  },
  {
    title: "Graphic Designer",
    department: "Design",
    workType: "Hybrid",
    location: "Rabat, Morocco",
    description: "Create stunning visuals for our brand and products.",
  },
  {
    title: "Marketing Manager",
    department: "Marketing",
    workType: "Hybrid",
    location: "Rabat, Morocco",
    description: "Drive growth and brand awareness across channels.",
  },
  {
    title: "Account Manager",
    department: "Customer Success",
    workType: "Hybrid",
    location: "Rabat, Morocco",
    description: "Build strong relationships with our partners and clients.",
  },
];

export async function seedPositions() {
  console.log("Seeding positions...");

  const existing = await db.select({ id: positions.id }).from(positions).limit(1);

  if (existing.length > 0) {
    console.log("Positions already seeded, skipping...");
    return;
  }

  await db.insert(positions).values(seedData);
  console.log(`✅ Seeded ${seedData.length} positions`);
}