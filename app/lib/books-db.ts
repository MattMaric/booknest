import { prisma } from "./prisma";

export async function getBooks() {
  return prisma.book.findMany({
    orderBy: {
      title: "asc",
    },
  });
}

export async function getBookById(id: string) {
  return prisma.book.findUnique({
    where: { id },
  });
}
