// Configuração do adaptador OpenNext → Cloudflare Workers.
// O site é 100% estático (SSG, sem `revalidate`), então NÃO usa cache
// incremental (KV/R2) nem binding de imagens — as imagens já vêm otimizadas
// do Sanity (cdn.sanity.io) ou são WebP locais. Se um dia migrar o blog para
// ISR, adicione aqui `incrementalCache` (r2/kv) e crie o namespace correspondente.
import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({});
