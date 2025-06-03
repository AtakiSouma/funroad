import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { authRouter } from "@/modules/auth/server/procedure";
import { productRouter } from "@/modules/products/server/procedure";
import { tagsRouter } from "@/modules/tags/server/procedures";
export const appRouter = createTRPCRouter({
  auth: authRouter,
  products:productRouter,
  categories: categoriesRouter,
  tags: tagsRouter,
  hello: baseProcedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query((opts) => {
      return {
        greeting: `hello ${opts.input.text}`,
      };
    }),
});
// export type definition of API
export type AppRouter = typeof appRouter;
