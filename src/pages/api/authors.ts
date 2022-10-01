// src/pages/api/books.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const authors = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.author.findMany();
  res.status(200).json(examples);
};

export default authors;
