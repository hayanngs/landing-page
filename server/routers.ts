import { COOKIE_NAME } from "@shared/const";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createLead } from "./db";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const LEAD_TURMA = "03, 04 e 05 de setembro de 2026 — Goiânia";
const LEAD_ORIGEM = "Landing Page VOZ ATIVA";

export const leadInputSchema = z.object({
  nome: z.string().trim().min(2).max(200),
  email: z.string().trim().email().max(320),
  whatsapp: z.string().trim().min(8).max(32),
});

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),
  leads: router({
    create: publicProcedure.input(leadInputSchema).mutation(async ({ input }) => {
      const whatsapp = input.whatsapp.replace(/\D/g, "");
      if (whatsapp.length < 10 || whatsapp.length > 13) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Informe um WhatsApp válido com DDD.",
        });
      }

      try {
        const result = await createLead({
          nome: input.nome,
          email: input.email,
          whatsapp,
          turma: LEAD_TURMA,
          origem: LEAD_ORIGEM,
        });
        return { success: true, id: result.id } as const;
      } catch (error) {
        console.error("[Leads] Failed to create lead", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Não foi possível registrar seus dados. Tente novamente.",
        });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
