# Agente de publicação diária do blog — guia de configuração

Este workflow publica automaticamente, 1x por dia, o próximo post da fila em
`content/blog-queue.json`, gerando a imagem de capa com fal.ai e criando o
documento no Sanity.

## Por que isso não roda "dentro do Claude"

O ambiente onde o Claude (Cowork) executa código só tem acesso a uma lista
fechada de domínios (npm, pypi, github.com, anthropic.com...) — não alcança
`api.sanity.io` nem `fal.run`. Por isso a automação roda como GitHub Actions,
que tem acesso irrestrito à internet e um cron confiável. O Claude escreveu
o conteúdo (a fila de 15 posts) e todo o código — mas quem executa a rotina
diária é o GitHub, não uma sessão do Claude.

## O que já está pronto

- `content/blog-queue.json` — 15 posts completos (título, categoria, excerpt,
  corpo do texto, `seoTitle`, `seoDescription`, prompt de imagem), prontos
  para publicar, um por dia.
- `scripts/publish-daily-post.mjs` — script Node que roda todo dia: consulta
  o Sanity para ver quais posts já foram publicados, pega o próximo da fila,
  gera a imagem no fal.ai, sobe a imagem como asset no Sanity e cria o
  documento do post.
- `.github/workflows/daily-blog-post.yml` — o cron do GitHub Actions,
  agendado para 08:00 (horário de Brasília) todos os dias. Também pode ser
  disparado manualmente pela aba **Actions** do repositório, com o botão
  "Run workflow" — útil para testar antes de deixar no automático.

## O que você precisa fazer (uma vez)

### 1. Criar um token do Sanity com permissão de escrita

O token atual no seu `.env.local` (`SANITY_API_READ_TOKEN`) pode ser
apenas de leitura — o workflow tenta usar o mesmo valor primeiro, mas se a
primeira execução falhar com erro de permissão (401/403), crie um novo:

1. Acesse [sanity.io/manage](https://sanity.io/manage) → projeto `h0l4pk97`
   → **API** → **Tokens** → **Add API token**.
2. Nome: `github-actions-blog-publisher`.
3. Permissão: **Editor** (não "Viewer").
4. Copie o token gerado (só aparece uma vez).

### 2. Criar uma chave de API no fal.ai

1. Crie conta em [fal.ai](https://fal.ai) (se ainda não tiver).
2. Vá em **Dashboard → Keys** e gere uma chave.
3. Copie a chave (formato `key_id:key_secret`).

### 3. Cadastrar os secrets no GitHub

No repositório `Ricardonovais1/direitodenegocios`:

1. **Settings → Secrets and variables → Actions → New repository secret**.
2. Crie os dois secrets:
   - `SANITY_WRITE_TOKEN` → cole o token do passo 1.
   - `FAL_KEY` → cole a chave do passo 2.

### 4. Levar os arquivos para o repositório

Os arquivos já estão na sua pasta local (`content/`, `scripts/`,
`.github/workflows/`, este `docs/`). Faltam apenas o `git add`, `commit` e
`push` — pode pedir para o Claude Code que já está rodando nessa pasta fazer
isso, ou rodar você mesmo:

```bash
git add content/blog-queue.json scripts/publish-daily-post.mjs .github/workflows/daily-blog-post.yml docs/SETUP-BLOG-AGENT.md
git commit -m "Add daily blog post publishing agent (fal.ai + Sanity)"
git push
```

### 5. Testar antes de deixar no automático

Depois do push, vá em **Actions → Daily Blog Post → Run workflow** para
disparar manualmente uma vez. Confira no Sanity Studio (e no site) se o
primeiro post foi criado corretamente — texto, categoria e imagem de capa.
Se dor tudo certo, o cron assume a partir do dia seguinte, sem precisar
mexer em mais nada.

## Quando a fila de 15 posts acabar

O script simplesmente não publica nada nesse dia (sem erro) e registra no
log: "No unpublished posts left in the queue." Para continuar a cadência
diária, é só adicionar novos objetos ao array em
`content/blog-queue.json`, no mesmo formato. Pode me pedir para escrever
mais posts a partir de novos materiais (transcrições, PDFs) quando quiser —
mesmo processo que usamos para gerar estes 15.

## SEO

Cada post publicado preenche o campo `seo` do schema do Sanity:

- `seo.title` e `seo.description` — meta título e meta descrição dedicados
  (`seoTitle`/`seoDescription` na fila), pensados para o snippet de busca,
  distintos do título e do excerto que aparecem na página. Caem de volta
  para o título/excerto se algum post futuro não tiver esses campos.
- `seo.ogImage` — reaproveita a mesma imagem de capa gerada no fal.ai como
  imagem de compartilhamento (Open Graph / Twitter Card). Antes, a página
  de post não declarava nenhuma imagem de OG — corrigi isso em
  `app/[locale]/blog/[slug]/page.tsx` (`generateMetadata`), que agora monta
  `openGraph.images` e `twitter.images` a partir de `seo.ogImage` (ou da
  capa, se um post não tiver `seo.ogImage`).

O que já funcionava sem precisar de ajuste: o sitemap (`app/sitemap.ts`) já
inclui posts do Sanity dinamicamente via `allSlugsQuery`, então cada post
novo aparece automaticamente no `sitemap.xml` sem nenhuma ação manual. Os
slugs da fila também já são limpos e sem acentuação, bons para URL.

O que ainda não existe (fora do escopo desta automação, mas vale saber): não
há JSON-LD do tipo `Article`/`BlogPosting` por post — o `README.md` do
projeto menciona JSON-LD apenas para o schema `LegalService` do site como um
todo. Se quiser, posso adicionar isso depois.

## Categorias

O schema do Sanity (`sanity/schemas/post.ts`) tem uma lista fixa de
categorias. Os posts de LGPD foram encaixados em **"Startups & TI"** — se
quiser separar isso numa categoria própria no futuro ("LGPD & Proteção de
Dados"), é preciso adicionar a opção na lista `options.list` desse schema.

## Ajustando o horário de publicação

O cron está em `0 11 * * *` (11:00 UTC = 08:00 em Brasília). Para mudar,
edite a linha `cron` em `.github/workflows/daily-blog-post.yml` — os
horários do GitHub Actions são sempre em UTC.
