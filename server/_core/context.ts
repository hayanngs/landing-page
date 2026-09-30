import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions,
): Promise<TrpcContext> {
  return {
    req: opts.req,
    res: opts.res,
    // The public landing page does not require authentication. Manus OAuth
    // files remain in the source tree for historical reference only.
    user: null,
  };
}
