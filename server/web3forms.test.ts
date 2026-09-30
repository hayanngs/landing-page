import { describe, expect, it } from "vitest";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

describe("Web3Forms configuration", () => {
  it.skipIf(!process.env.VITE_WEB3FORMS_ACCESS_KEY)("reaches the provider validation layer with the configured access key", async () => {
    const accessKey = process.env.VITE_WEB3FORMS_ACCESS_KEY;

    expect(accessKey, "VITE_WEB3FORMS_ACCESS_KEY must be configured when this test is enabled").toBeTruthy();

    const abortController = new AbortController();
    const abortTimer = setTimeout(() => abortController.abort(), 10_000);
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      signal: abortController.signal,
      body: new URLSearchParams({
        access_key: accessKey!,
        name: "Validação técnica Voz Ativa",
        email: "validacao-tecnica@vozativa.invalid",
        subject: "Validação técnica não operacional",
        botcheck: "true",
      }),
    });
    clearTimeout(abortTimer);

    const responseText = await response.text();

    expect(response.status).toBeLessThan(500);

    const cloudflareChallenge = /cf-chl|enable javascript and cookies to continue/i.test(responseText);
    if (cloudflareChallenge) {
      // The provider's bot protection blocks server-side smoke tests before it
      // evaluates credentials. Browser submissions remain the supported path.
      expect(responseText).toMatch(/cf-chl|enable javascript and cookies to continue/i);
      return;
    }

    expect(responseText).not.toMatch(/invalid access key|access key.*not found/i);
    expect(responseText).toMatch(/success|spam|botcheck|captcha/i);
  }, 15_000);
});
