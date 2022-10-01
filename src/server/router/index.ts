// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";
import { authorRouter } from "./author";
import { bookRouter } from "./book";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("author.", authorRouter)
  .merge("book.", bookRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
