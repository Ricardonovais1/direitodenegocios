// scripts/add-practice-area-content.mts
// Adds persuasive full-page content (fullContent) + SEO to each practice area
// document in Sanity, in Fausto's voice (estratégia, tática, leitura de jogo).
//
// Usage:
//   SANITY_WRITE_TOKEN=... node scripts/add-practice-area-content.mts
//
// Idempotent: patches existing practice-area-<slug> documents (created by
// scripts/migrate-content.mts).

const PROJECT_ID = 'h0l4pk97'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const TOKEN = process.env.SANITY_WRITE_TOKEN ?? ''

if (!TOKEN) {
  console.error('Missing SANITY_WRITE_TOKEN (needs Editor permission).')
  process.exit(1)
}

const block = (style, text) => ({
  _type: 'block',
  style,
  markDefs: [],
  children: [{ _type: 'span', text, marks: [] }],
})
const p = (text) => block('normal', text)
const h2 = (text) => block('h2', text)

const content = {
  'consultoria-juridica': {
    seo: {
      title: 'Consultoria Jurídica — Decida com Segurança | Fausto Sette Câmara',
      description: 'Orientação jurídica contínua para empresas decidirem com segurança antes de o problema virar processo. Consultivo, tático e com leitura de jogo.',
    },
    fullContent: [
      p('O advogado que só aparece quando o problema já virou processo chega tarde. Consultoria jurídica, para mim, é o contrário: é a orientação contínua que faz você decidir com segurança antes de o risco virar passivo.'),
      h2('Decidir antes de assinar'),
      p('Contrato, sociedade, contratação, demissão, parceria — quase toda decisão de negócio tem um componente jurídico. A diferença entre um bom negócio e um passivo caro, na maioria das vezes, está na leitura que você faz antes de assinar. Meu papel é ser essa leitura: apontar o que pode dar errado, o que dá para ajustar e como seguir em frente com segurança.'),
      h2('Acesso contínuo, sem burocracia'),
      p('A consultoria funciona como um jurídico interno de alto nível, mas sem o custo de manter um departamento. Você tem acesso a mim por canal direto, para as dúvidas do dia a dia — do e-mail de um cliente ao contrato de um fornecedor. Resposta objetiva, em linguagem de negócio, no tempo em que a decisão precisa sair.'),
      h2('Menos surpresa, mais previsibilidade'),
      p('O valor da consultoria está no que não acontece: a multa que não se pagou, o processo que não se abriu, a cláusula que se ajustou a tempo. É construir previsibilidade num ambiente que, por desenho, tenta gerar o contrário.'),
    ],
  },

  'direito-de-negocios': {
    seo: {
      title: 'Direito de Negócios — Jurídico de Ponta a Ponta | Fausto Sette Câmara',
      description: 'A visão integrada do jurídico sobre a sua operação: estrutura, contratos, riscos e oportunidades. Do consultivo ao contencioso, com um só profissional.',
    },
    fullContent: [
      p('Direito de negócios não é uma área: é a forma como eu olho para o jurídico inteiro. Não como um conjunto de normas isoladas, mas como uma camada da sua operação — estrutura, contratos, riscos e oportunidades vistos de uma vez.'),
      h2('O jurídico como parte do negócio'),
      p('Empresa saudável não trata jurídico como departamento de “apagar incêndio”. Trata como parte do desenho do negócio. A estrutura societária conversa com o modelo de receita, o contrato conversa com a operação real, o risco conversa com o crescimento. É essa visão integrada que eu trago para a mesa.'),
      h2('De ponta a ponta'),
      p('Do consultivo ao contencioso, o mesmo profissional acompanha a sua operação inteira. Isso muda tudo: quem conhece o seu negócio por dentro negocia melhor, redige melhor e, quando é preciso brigar, briga melhor — porque conhece o que está em jogo e o que veio antes.'),
      h2('A régua do risco'),
      p('Toda decisão de negócio é uma decisão de risco. Meu trabalho é tornar esse risco visível e administrável — para você crescer sem se expor de forma desnecessária, e assumir só os riscos que valem a pena.'),
    ],
  },

  'direito-societario': {
    seo: {
      title: 'Direito Societário — Sociedade Estruturada desde o Início | Fausto Sette Câmara',
      description: 'Constituição, acordo de sócios, governança e reorganizações societárias. Organize a estrutura cedo, enquanto é barato — antes de virar conflito.',
    },
    fullContent: [
      p('A sociedade é a estrutura sobre a qual todo o resto se constrói. Quando ela nasce mal, o problema não aparece no primeiro mês — aparece quando o negócio cresce, entra um sócio novo, ou alguém decide sair.'),
      h2('Constituição e acordo de sócios'),
      p('O contrato social formaliza a empresa perante o mundo. O acordo de sócios é o que de fato organiza a relação entre vocês: divisão de poder, entrada e saída, o que acontece com as quotas se um sócio morrer, se divorciar, se quiser sair. É o documento que evita a briga — porque define as regras enquanto todo mundo ainda está de acordo.'),
      h2('Governança e reorganizações'),
      p('Holdings, cisões, incorporações, planejamento de sucessão societária. Reorganizar a estrutura costuma ser a diferença entre pagar o mínimo necessário e pagar caro — em impostos e em conflito. Estruturo a operação para o futuro que você quer, não só para o presente.'),
      h2('O sócio que não está no papel'),
      p('Muita sociedade nasce no aperto de mão e só depois vira papel. Quando o papel não reflete o combinado, o risco é silencioso — até o dia em que não é mais. Organizar isso cedo é barato; desfazer depois, não.'),
    ],
  },

  'direito-para-startups': {
    seo: {
      title: 'Direito para Startups — do Pacto de Fundadores à Escala | Fausto Sette Câmara',
      description: 'Pacto de fundadores, vesting, stock options e rodadas de investimento. Estrutura jurídica para startups do primeiro aporte à escala.',
    },
    fullContent: [
      p('Startup não é uma empresa pequena; é uma empresa que ainda não provou o modelo. Isso muda a forma de estruturar tudo — do pacto de fundadores à rodada de investimento.'),
      h2('Pacto de fundadores'),
      p('Antes de existir CNPJ, existe a relação entre quem funda. Quem decide o quê, o que acontece se um sair, como se divide o que ainda não existe. O pacto de fundadores organiza isso enquanto é só promessa — porque é aí que é mais barato.'),
      h2('Vesting, stock options e equity'),
      p('Distribuir participação sem regra de vesting é um dos erros mais caros de uma startup em estágio inicial. Desenho vesting, opções e a estrutura de incentivo certa para alinhar fundadores, time e investidores.'),
      h2('Rodadas e investimento'),
      p('Investidor não compra só o produto; compra a segurança jurídica do negócio. Due diligence, term sheet, contrato de investimento — preparo a casa para a rodada, e negocio o que protege o seu controle e o seu futuro.'),
    ],
  },

  'direito-de-ti': {
    seo: {
      title: 'Direito de TI — Contratos, SaaS e Proteção de Dados | Fausto Sette Câmara',
      description: 'Contratos de software e SaaS, LGPD e proteção de dados para empresas de tecnologia. Assessoria de quem conhece o setor por dentro.',
    },
    fullContent: [
      p('Tecnologia vive de contratos e de proteção de dados. É o setor que eu mais conheço — e é onde a legislação brasileira mais se descolou da realidade do mercado.'),
      h2('Contratos de software e SaaS'),
      p('SLA, escopo, propriedade do código, responsabilidade por falha, LGPD embutida no produto. O contrato de tecnologia define quem responde pelo quê quando o software não faz o que promete. Redijo e negocio contratos que protegem quem desenvolve e quem compra.'),
      h2('Proteção de dados e LGPD'),
      p('A LGPD não é só multa: é responsabilidade civil, é contrato, é reputação. Ajudo a mapear, adequar e documentar o tratamento de dados — do app ao site, do cliente ao funcionário.'),
      h2('A leitura de quem conhece o setor'),
      p('Já vi o lado de dentro das operações de tecnologia: a escassez de mão de obra, a contratação PJ, o modelo SaaS, a pressão por velocidade. Essa leitura de jogo muda o conselho — porque não é um parecer genérico, é a aplicação da norma à realidade de quem faz software.'),
    ],
  },

  'direito-do-trabalho': {
    seo: {
      title: 'Direito do Trabalho — Compliance e Redução de Passivos | Fausto Sette Câmara',
      description: 'Compliance trabalhista, contratação PJ segura e defesa em reclamações e ações coletivas. Antecipe o risco antes de ele virar processo.',
    },
    fullContent: [
      p('O passivo trabalhista é o tipo de risco que cresce em silêncio. Não aparece no balanço, não dá sinal — até virar processo, fiscalização ou uma ação coletiva.'),
      h2('Compliance e prevenção'),
      p('A maioria do passivo trabalhista não vem de má-fé: vem de decisão tomada sem ler o jogo — a contratação PJ mal estruturada, o banco de horas mal documentado, a terceirização feita sem critério. Compliance trabalhista é organizar isso antes de o problema existir.'),
      h2('Contratação PJ e pejotização'),
      p('É a pergunta que mais recebo: “posso contratar esse profissional como PJ?”. A resposta não está no CNPJ de quem presta, está na realidade da relação. Estruturei uma matriz de risco para avaliar cada contratação — e é o que aplico com os meus clientes.'),
      h2('Defesa em reclamações e ações coletivas'),
      p('Quando o processo chega, a diferença está na preparação e na estratégia. Atuo na defesa de reclamações trabalhistas e ações coletivas com a mesma leitura de jogo do consultivo — porque quem conhece a operação defende melhor.'),
    ],
  },

  'propriedade-intelectual': {
    seo: {
      title: 'Propriedade Intelectual — Marcas e Segredos de Negócio | Fausto Sette Câmara',
      description: 'Registro de marcas, proteção de segredos de negócio e estratégia de propriedade intelectual para o ativo mais valioso da sua empresa.',
    },
    fullContent: [
      p('O que a sua empresa tem de mais valioso, muitas vezes, não está no balanço: está no nome, na marca, no segredo de negócio, no software. Proteger isso é proteger o próprio negócio.'),
      h2('Marcas'),
      p('A marca é o ativo que o cliente reconhece. Registro, monitoramento e defesa contra uso indevido — para que o nome que você construiu não vire um problema, nem um ativo de terceiro.'),
      h2('Segredos de negócio'),
      p('Nem tudo se registra. O que se protege por segredo — fórmula, processo, lista de clientes, método — precisa de contrato, de confidencialidade e de cuidado. O segredo vaza quando não há estrutura para segurá-lo.'),
      h2('O que protege de verdade'),
      p('Propriedade intelectual protegida de verdade não é uma lista de registros; é uma estratégia: o que registrar, o que manter em segredo, o que prever em contrato — e o que fazer quando alguém ultrapassa a linha.'),
    ],
  },

  'direito-de-patentes': {
    seo: {
      title: 'Direito de Patentes — Inovação que Vira Ativo | Fausto Sette Câmara',
      description: 'Estratégia de patentes para proteger invenções e inovação: o que patentear, como redigir o pedido e como monetizar a tecnologia.',
    },
    fullContent: [
      p('Invenção sem proteção é ideia no vento. Patente é o instrumento que transforma inovação em ativo — mas só quando é desenhada com estratégia, não como burocracia.'),
      h2('O que dá para patentear'),
      p('Nem toda inovação é patenteável, e nem tudo que é patenteável vale a pena patentear. Ajudo a separar o que protege de verdade do que só gera custo — avaliando novidade, atividade inventiva e aplicação industrial.'),
      h2('Estratégia de patente'),
      p('Patente é decisão de negócio: onde depositar, o que revelar, como redigir o quadro reivindicatório para maximizar a proteção. É isso que separa uma patente que protege de uma patente que só enfeita.'),
      h2('Defesa e licenciamento'),
      p('Patente também se defende e se monetiza. Atuo na proteção contra violação e na estruturação de licenciamento — para a inovação virar receita, não só certificado.'),
    ],
  },

  'direito-das-coisas': {
    seo: {
      title: 'Direito das Coisas — Imobiliário e Patrimônio para Negócios | Fausto Sette Câmara',
      description: 'Direito imobiliário, garantias e propriedade para empresas e patrimônio. Segurança jurídica sobre o que é seu.',
    },
    fullContent: [
      p('Direito das coisas parece distante, mas é concreto: é o imóvel da empresa, a garantia do financiamento, o patrimônio que sustenta o negócio.'),
      h2('Direito imobiliário para negócios'),
      p('Compra, venda, locação, incorporação, regularização. Operação imobiliária mal estruturada trava negócio e drena patrimônio. Estruturo cada transação para que a propriedade — e a segurança dela — fique do seu lado.'),
      h2('Garantias e financiamento'),
      p('Hipoteca, alienação fiduciária, penhor. A garantia certa muda o custo do capital e a segurança da operação. Desenho a estrutura que protege quem financia e quem toma.'),
      h2('Propriedade e patrimônio'),
      p('No fim, direito das coisas é sobre o que é seu — e como garantir que continue sendo. É a base de segurança sobre a qual o resto do patrimônio se apoia.'),
    ],
  },

  'planejamento-patrimonial': {
    seo: {
      title: 'Planejamento Patrimonial — Blindagem, Organização e Sucessão | Fausto Sette Câmara',
      description: 'Blindagem patrimonial, sucessão em vida e organização do patrimônio. Proteja o que você construiu da carga tributária, do risco do negócio e da sucessão mal feita.',
    },
    fullContent: [
      p('Patrimônio se constrói ao longo de décadas e se perde em meses de desorganização. Planejamento patrimonial é proteger o que você construiu — da carga tributária, do risco do negócio e da sucessão mal feita.'),
      h2('Blindagem patrimonial'),
      p('Separar o patrimônio pessoal do risco da empresa é o primeiro passo. Estruturas legais e legítimas — holding, segregação de ativos, doações em vida — que protegem sem fugir de obrigação.'),
      h2('Sucessão'),
      p('O pior cenário de sucessão é o que não foi planejado: inventário longo, briga entre herdeiros, empresa parada. Organizo a sucessão em vida, no ritmo e na forma que fazem sentido para a sua família e o seu negócio.'),
      h2('Organização e tranquilidade'),
      p('Planejamento patrimonial não é só para quem tem muito; é para quem quer manter o que tem. É a segurança de saber que, aconteça o que acontecer, o patrimônio está organizado, protegido e no lugar certo.'),
    ],
  },
}

const mutateUrl = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

async function main() {
  const mutations = Object.entries(content).map(([slug, c]) => ({
    patch: {
      id: `practice-area-${slug}`,
      set: { fullContent: c.fullContent, seo: c.seo },
    },
  }))

  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mutations }),
  })

  if (!res.ok) throw new Error(`Sanity patch failed: ${res.status} ${await res.text()}`)
  const result = await res.json()
  console.log(`✓ Updated ${mutations.length} practice areas (${result.results?.length ?? '?'} mutations).`)
}

main().catch((err) => {
  console.error('add-practice-area-content failed:', err)
  process.exit(1)
})
