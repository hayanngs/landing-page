# Notas de portabilidade

Esta cópia foi preparada para sair do Manus:

- os assets usados pela página estão em `client/public/assets`;
- as fontes Manrope e Space Grotesk foram baixadas e estão em `client/public/assets/fonts`;
- referências `/manus-storage/` foram substituídas por caminhos locais;
- plugins de build e coleta de debug do Manus foram removidos;
- o runtime não registra as rotas Manus de OAuth/storage por padrão;
- o formulário continua usando o backend tRPC + MySQL para persistir leads;
- a notificação Web3Forms continua no navegador, com chave configurada por `.env`;
- o checkout Hotmart, WhatsApp e Meta Pixel permanecem externos e documentados.

O fluxo de leads não é puramente estático: para persistir dados, publique o servidor
Node/Express e configure `DATABASE_URL`. Em hospedagem apenas estática, o layout
carrega, mas o submit do formulário precisará ser adaptado para outro endpoint.
