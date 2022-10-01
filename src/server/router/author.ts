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
  })
  .mutation("create", {
    input: z.object({
      name: z.string().min(1),
      email: z.string().min(1).email(),
      password: z.string().min(6),
      birthCounty: z.string().min(1),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.author.create({
        data: {
          name: input.name,
          email: input.email,
          password: input.password,
          birthCounty: input.birthCounty,
          books: {},
        },
      });
    },
  });
