import { describe, expect, it } from "vitest";
import { leadInputSchema } from "./routers";

describe("leadInputSchema", () => {
  it("accepts a valid landing page lead", () => {
    const lead = leadInputSchema.parse({
      nome: "Ana Souza",
      email: "ana@example.com",
      whatsapp: "(62) 99999-9999",
    });

    expect(lead.nome).toBe("Ana Souza");
    expect(lead.email).toBe("ana@example.com");
  });

  it("rejects malformed contact information", () => {
    expect(() =>
      leadInputSchema.parse({
        nome: "A",
        email: "email-invalido",
        whatsapp: "12",
      }),
    ).toThrow();
  });
});

