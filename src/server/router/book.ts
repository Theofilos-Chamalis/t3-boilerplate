import { createRouter } from "./context";
import { z } from "zod";

export const bookRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text} from book router!`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.book.findMany();
    },
  })
  .mutation("create", {
    input: z.object({
      title: z.string(),
      published: z.boolean(),
      publishedAt: z.date(),
      createdAt: z.date(),
      updatedAt: z.date(),
      authorId: z.number(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.book.create({
        data: {
          title: input.title,
          published: input.published,
          createdAt: input.createdAt,
          updatedAt: input.updatedAt,
          authorId: input.authorId,
          publishedAt: input.publishedAt,
        },
      });
    },
  });
