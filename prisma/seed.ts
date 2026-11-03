import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";
import { books } from "../app/lib/books";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  for (const book of books) {
    await prisma.book.upsert({
      where: { id: book.id },
      update: {
        title: book.title,
        author: book.author,
        price: book.price,
        category: book.category,
        description: book.description,
        image: book.image,
      },
      create: book,
    });
  }

  console.log(`Seeded ${books.length} books.`);
}

main()
  .catch((error) => {
    console.error("Failed to seed books:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
