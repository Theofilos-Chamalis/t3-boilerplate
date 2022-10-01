import { createRouter } from "./context";
import { z } from "zod";

export const authorRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.author.findMany();
    },
  })
  .query("getOne", {
    input: z.object({
      id: z.number().positive(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.author.findUnique({
        where: {
          id: input.id,
        },
      });
    },
  });
