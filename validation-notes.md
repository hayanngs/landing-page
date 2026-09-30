# Validação da restauração — Voz Ativa

A inspeção visual em desktop e mobile confirmou que a página preserva a direção Neo-Swiss clínico-executiva da cápsula: hierarquia tipográfica de alta presença, alternância de superfícies claras e escuras, acentos azuis reservados a ações e dados e uso dos assets preservados nas áreas de maior destaque.

| Verificação | Resultado |
| --- | --- |
| Compilação TypeScript | Concluída sem erros com `pnpm check`. |
| Suíte Vitest | 4 testes aprovados, cobrindo autenticação-base, validação de lead e alcance do endpoint Web3Forms. |
| Build de produção | Concluída com sucesso. |
| Responsividade | Verificada em 1280 × 720 e 375 × 812. |
| Formulário e checkout | Modal, validação, persistência de lead e redirecionamento à Hotmart implementados. |
| Eventos de campanha | PageView, Lead e InitiateCheckout configurados; os dois eventos de conversão recebem identificador único. |

> A verificação externa da chave Web3Forms alcança o provedor, mas o ambiente de desenvolvimento recebe um desafio anti-bot antes da validação credencial. O envio real permanece implementado no navegador, que é o fluxo recomendado pelo próprio provedor.

## Evidência de validação funcional autorizada

As âncoras `#metodo` e `#turma` foram abertas diretamente no navegador e posicionaram a página nas seções correspondentes. O CTA principal abriu o modal de interesse; uma tentativa com campos inválidos foi bloqueada pela validação nativa de e-mail, sem redirecionar a página. Após autorização do usuário, uma única inscrição técnica identificada como teste foi submetida. O estado do botão mudou para **“Confirmando...”**, o registro foi persistido na tabela `leads` e o navegador foi redirecionado para o checkout configurado da Hotmart. O registro técnico permanece no banco como evidência da validação autorizada.
