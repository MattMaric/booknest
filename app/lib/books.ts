export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  category: string;
  description: string;
};

export const books: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    price: 18.99,
    category: "Personal Development",
    description:
      "A practical guide to building good habits, breaking bad ones, and making small changes that lead to remarkable results.",
  },
  {
    id: "the-hobbit",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 14.99,
    category: "Fantasy",
    description:
      "Join Bilbo Baggins on an unexpected journey filled with adventure, mysterious creatures, and a dragon guarding a treasure.",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 32.99,
    category: "Technology",
    description:
      "A guide to writing readable, maintainable code and improving the craft of software development.",
  },
];
