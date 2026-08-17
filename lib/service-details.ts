/**
 * Conteúdo editorial das páginas de área de atuação.
 *
 * Complementa (e nunca substitui) o que vem do Sanity: se a área tiver
 * `fullContent` publicado, ele aparece primeiro; estes blocos dão corpo,
 * estrutura e resposta a dúvidas em todas as páginas, inclusive quando o
 * Sanity está indisponível.
 *
 * Redação alinhada ao Provimento 205/2021 da OAB: nada de promessa de
 * resultado, valores ou comparação de desempenho.
 */

export interface ServiceFamily {
  id: string
  label: string
}

export const serviceFamilies: ServiceFamily[] = [
  { id: 'consultivo', label: 'Consultivo & estratégia' },
  { id: 'societario', label: 'Societário & startups' },
  { id: 'tecnologia', label: 'Tecnologia & inovação' },
  { id: 'trabalhista', label: 'Trabalho & relações coletivas' },
  { id: 'patrimonio', label: 'Patrimônio & imobiliário' },
]

export interface ServiceDetail {
  /** Frase curta de posicionamento, exibida no topo da página. */
  tagline: string
  family: ServiceFamily['id']
  /** Para quem esta área foi desenhada. */
  forWhom: string[]
  /** O que o trabalho inclui, na prática. */
  deliverables: string[]
  /** Sinais de que é hora de procurar apoio nesta área. */
  signals: string[]
  faqs: { question: string; answer: string }[]
}

export const serviceDetails: Record<string, ServiceDetail> = {
  'consultoria-juridica': {
    tagline: 'Decisão jurídica na hora certa — antes de o problema virar processo.',
    family: 'consultivo',
    forWhom: [
      'Empresas sem departamento jurídico próprio',
      'Sócios e diretores que decidem rápido e precisam de respaldo',
      'Times de RH, financeiro e comercial que lidam com contratos no dia a dia',
    ],
    deliverables: [
      'Canal direto para dúvidas do dia a dia, com resposta objetiva',
      'Análise e redação de contratos antes da assinatura',
      'Pareceres sobre riscos regulatórios, contratuais e trabalhistas',
      'Revisão de políticas internas e fluxos de aprovação',
      'Acompanhamento de negociações e reuniões estratégicas',
    ],
    signals: [
      'Contratos são assinados sem ninguém ler com cuidado',
      'Cada dúvida jurídica vira um orçamento avulso e uma espera',
      'A empresa só chama o advogado quando a notificação já chegou',
    ],
    faqs: [
      {
        question: 'A consultoria é pontual ou contínua?',
        answer:
          'Os dois formatos existem. Há empresas que contratam um diagnóstico pontual e outras que mantêm acompanhamento contínuo, com um canal aberto para dúvidas do dia a dia. O desenho é definido junto com você, conforme o volume e a complexidade da operação.',
      },
      {
        question: 'Preciso ter departamento jurídico para contratar?',
        answer:
          'Não. A consultoria funciona tanto como jurídico externo de empresas que não têm equipe interna quanto como apoio especializado a departamentos jurídicos já estruturados.',
      },
      {
        question: 'Como funciona o primeiro contato?',
        answer:
          'Uma conversa inicial para entender o cenário, o que está em jogo e qual o nível de urgência. A partir daí, apresento o caminho que considero mais eficiente e de menor risco.',
      },
    ],
  },

  'direito-de-negocios': {
    tagline: 'A visão integrada do jurídico sobre tudo o que a sua operação faz.',
    family: 'consultivo',
    forWhom: [
      'Empresários que querem crescer sem multiplicar o risco',
      'Empresas em fase de expansão, nova praça ou novo produto',
      'Negócios que operam com contratos complexos e múltiplos parceiros',
    ],
    deliverables: [
      'Diagnóstico jurídico completo da operação, ponta a ponta',
      'Mapeamento de riscos por área: contratos, tributos, trabalho, dados',
      'Desenho da estrutura contratual entre empresa, sócios e parceiros',
      'Plano de prioridades: o que resolver agora, o que pode esperar',
      'Suporte na negociação de acordos comerciais estratégicos',
    ],
    signals: [
      'A empresa cresceu, mas a estrutura jurídica continuou a mesma do começo',
      'Ninguém sabe dizer, com precisão, onde estão os maiores riscos',
      'Decisões importantes travam por falta de segurança jurídica',
    ],
    faqs: [
      {
        question: 'Qual a diferença entre Direito de Negócios e Direito Empresarial?',
        answer:
          'Direito Empresarial descreve um conjunto de normas. Direito de Negócios, do jeito que trabalho, é a leitura estratégica dessas normas aplicada ao seu negócio específico: entender o que a empresa quer fazer, como o sistema reage a isso e qual o caminho de menor atrito.',
      },
      {
        question: 'Isso substitui as outras áreas?',
        answer:
          'Não — organiza. O trabalho começa com a visão do todo e, a partir dela, aciona as frentes específicas: societário, contratos, trabalhista, propriedade intelectual, patrimônio.',
      },
    ],
  },

  'direito-societario': {
    tagline: 'Sociedade bem desenhada é conflito que não acontece.',
    family: 'societario',
    forWhom: [
      'Sócios que estão começando ou reorganizando a sociedade',
      'Empresas com mais de um sócio e sem acordo formalizado',
      'Grupos empresariais que precisam reestruturar participações',
    ],
    deliverables: [
      'Constituição de sociedades e escolha do tipo societário',
      'Acordo de sócios: entrada, saída, sucessão e resolução de impasses',
      'Governança: definição de poderes, quóruns e limites de alçada',
      'Reorganizações societárias, cisões, incorporações e holdings',
      'Condução de negociações entre sócios e apuração de haveres',
    ],
    signals: [
      'A sociedade funciona no boca a boca, sem contrato que reflita a realidade',
      'Um sócio quer sair e ninguém combinou como isso aconteceria',
      'Decisões importantes empacam porque não há regra de desempate',
    ],
    faqs: [
      {
        question: 'Já temos contrato social. Precisamos de acordo de sócios?',
        answer:
          'Em geral, sim. O contrato social cumpre a função registral; o acordo de sócios é onde ficam as regras de convivência — entrada e saída, sucessão, não concorrência, resolução de impasses. É o documento que se lê quando algo dá errado.',
      },
      {
        question: 'Dá para revisar uma sociedade que já existe há anos?',
        answer:
          'Sim. Boa parte do trabalho societário é justamente ajustar estruturas antigas à realidade atual da empresa, com o cuidado de preservar o que já foi construído.',
      },
    ],
  },

  'direito-para-startups': {
    tagline: 'Do pacto de fundadores à rodada de investimento, sem improviso.',
    family: 'societario',
    forWhom: [
      'Fundadores no início, antes de o primeiro conflito aparecer',
      'Startups em captação ou em due diligence',
      'Times que remuneram com participação (vesting, stock options)',
    ],
    deliverables: [
      'Pacto de fundadores com vesting, cliff e regras de saída',
      'Estruturação societária pensada para receber investimento',
      'Contratos de investimento: mútuo conversível, SAFE, aporte direto',
      'Planos de opção de compra de participação para o time',
      'Preparação para due diligence e organização do dossiê jurídico',
      'Proteção de propriedade intelectual e código desde o início',
    ],
    signals: [
      'A sociedade foi dividida no chute e ninguém falou sobre vesting',
      'Um investidor pediu documentos e a casa não está organizada',
      'O código, a marca ou o produto estão no nome da pessoa errada',
    ],
    faqs: [
      {
        question: 'Somos pequenos demais para pensar nisso?',
        answer:
          'É justamente no começo que sai mais barato acertar. Vesting, titularidade de propriedade intelectual e regras de saída são baratos de combinar antes e caros de resolver depois.',
      },
      {
        question: 'Vocês atendem startups fora de Belo Horizonte?',
        answer:
          'Sim. O atendimento é nacional e majoritariamente remoto — o que costuma ser o formato natural para times distribuídos.',
      },
      {
        question: 'O que um investidor olha primeiro?',
        answer:
          'Cap table coerente, titularidade da propriedade intelectual, contratos com o time e ausência de passivos escondidos. É esse conjunto que organizamos antes da conversa começar.',
      },
    ],
  },

  'direito-de-ti': {
    tagline: 'Software, SaaS e dados: contratos que acompanham a velocidade do produto.',
    family: 'tecnologia',
    forWhom: [
      'Empresas de software, SaaS, fábricas de software e consultorias de TI',
      'Times que vendem para grandes contas e enfrentam contratos longos',
      'Negócios que tratam dados pessoais em escala',
    ],
    deliverables: [
      'Contratos de licenciamento, SaaS, desenvolvimento e sustentação',
      'SLAs, cláusulas de disponibilidade, suporte e penalidades',
      'Termos de uso e políticas de privacidade do produto',
      'Adequação à LGPD: bases legais, contratos com operadores, incidentes',
      'Contratos com fornecedores de nuvem, APIs e integrações',
      'Cláusulas de titularidade de código e de propriedade intelectual',
    ],
    signals: [
      'Você assina o contrato-padrão do cliente sem negociar cláusula nenhuma',
      'O SLA promete um nível de serviço que a operação não sustenta',
      'A empresa trata dados pessoais sem saber sob qual base legal',
    ],
    faqs: [
      {
        question: 'Vocês entendem de tecnologia ou só de Direito?',
        answer:
          'A atuação em TI é uma das frentes centrais do escritório, incluindo anos à frente da negociação coletiva do setor. Isso significa conversar sobre arquitetura, SLA e ciclo de release sem precisar de tradução.',
      },
      {
        question: 'LGPD entra aqui ou é área separada?',
        answer:
          'Entra aqui. Proteção de dados é tratada como parte do Direito de TI, integrada aos contratos, ao produto e às rotinas internas — não como um documento avulso na gaveta.',
      },
      {
        question: 'Nossos contratos são todos em inglês. É um problema?',
        answer:
          'Não. Contratos internacionais de tecnologia fazem parte da rotina, inclusive com clientes e investidores no exterior.',
      },
    ],
  },

  'direito-do-trabalho': {
    tagline: 'Compliance trabalhista de verdade — inclusive o que está na convenção coletiva.',
    family: 'trabalhista',
    forWhom: [
      'Empresas de TI sujeitas a convenções coletivas específicas',
      'Departamentos de RH que aplicam normas coletivas no dia a dia',
      'Empresas que contratam por CLT, PJ e modelos híbridos',
    ],
    deliverables: [
      'Auditoria trabalhista e mapeamento de passivos',
      'Leitura e aplicação prática de convenções coletivas, cláusula por cláusula',
      'Revisão de contratos de trabalho, PJ, jornada e teletrabalho',
      'Defesa em reclamações trabalhistas e ações coletivas sindicais',
      'Condução de negociações com sindicatos',
      'Treinamento de RH e lideranças sobre a norma aplicável',
    ],
    signals: [
      'Ninguém no RH leu a convenção coletiva inteira',
      'A empresa contrata PJ sem avaliar o risco de reconhecimento de vínculo',
      'Chegou uma ação coletiva sindical e a empresa foi pega de surpresa',
    ],
    faqs: [
      {
        question: 'Por que a convenção coletiva importa tanto?',
        answer:
          'Porque ela é de observância obrigatória para as empresas da categoria e costuma criar obrigações que a CLT não prevê. A maioria dos passivos trabalhistas em TI nasce de cláusulas coletivas que ninguém leu com atenção.',
      },
      {
        question: 'Vocês atuam só na defesa ou também na prevenção?',
        answer:
          'Nos dois. A defesa é necessária quando a ação chega, mas o trabalho mais valioso é o anterior: revisar rotinas, contratos e a aplicação da norma coletiva antes que o passivo se forme.',
      },
      {
        question: 'Existe material sobre a CCT de TI?',
        answer:
          'Sim. Além do trabalho de consultoria, há um curso dedicado à CCT Sindpd-SP/SeproSP, percorrendo a convenção cláusula por cláusula, e o Manual da CCT como material de apoio.',
      },
    ],
  },

  'propriedade-intelectual': {
    tagline: 'Marca, software e segredo de negócio protegidos antes de valerem muito.',
    family: 'tecnologia',
    forWhom: [
      'Empresas que construíram marca e ainda não a registraram',
      'Negócios cujo principal ativo é conhecimento, software ou método',
      'Criadores, autores e produtores de conteúdo',
    ],
    deliverables: [
      'Busca de anterioridade e registro de marcas no INPI',
      'Acompanhamento de processos, oposições e recursos',
      'Registro de programa de computador',
      'Contratos de cessão e licenciamento de direitos',
      'Acordos de confidencialidade e proteção de segredo de negócio',
      'Resposta a uso indevido de marca e conteúdo',
    ],
    signals: [
      'A marca está no mercado há anos e nunca foi registrada',
      'O software foi desenvolvido por terceiros e a cessão nunca foi formalizada',
      'Alguém está usando o seu nome, sua identidade ou seu conteúdo',
    ],
    faqs: [
      {
        question: 'Usar a marca há anos já garante direito sobre ela?',
        answer:
          'O uso prolongado tem relevância jurídica, mas no Brasil a proteção sólida vem do registro no INPI. Sem ele, a empresa fica exposta a quem registre primeiro.',
      },
      {
        question: 'Quanto tempo leva um registro de marca?',
        answer:
          'O prazo depende do INPI e da existência de oposições, e costuma se medir em meses. O que consigo controlar é a qualidade do pedido — classe correta, busca prévia bem feita e acompanhamento ativo do processo.',
      },
      {
        question: 'Software se registra como marca?',
        answer:
          'São coisas diferentes. A marca protege o sinal que identifica o produto; o programa de computador tem registro próprio. Em geral, vale proteger os dois.',
      },
    ],
  },

  'direito-de-patentes': {
    tagline: 'Para quem inventa: transformar solução técnica em ativo protegido.',
    family: 'tecnologia',
    forWhom: [
      'Empresas de base tecnológica e deep tech',
      'Indústrias com desenvolvimento de produto e processo',
      'Inventores independentes e centros de pesquisa',
    ],
    deliverables: [
      'Avaliação de patenteabilidade da solução',
      'Estratégia de proteção: patente, segredo industrial ou combinação',
      'Depósito e acompanhamento de pedidos junto ao INPI',
      'Contratos de titularidade com inventores, sócios e parceiros',
      'Licenciamento e transferência de tecnologia',
    ],
    signals: [
      'A equipe desenvolveu algo novo e ninguém avaliou se é protegível',
      'A invenção foi divulgada em evento ou artigo antes do depósito',
      'Não está claro quem é o titular do que foi criado internamente',
    ],
    faqs: [
      {
        question: 'Toda inovação é patenteável?',
        answer:
          'Não. A patente exige novidade, atividade inventiva e aplicação industrial, e a lei exclui certas categorias. Por isso a primeira etapa é avaliar se a patente é mesmo o melhor caminho — em alguns casos o segredo industrial protege melhor.',
      },
      {
        question: 'Divulgamos a solução publicamente. Ainda dá tempo?',
        answer:
          'Depende de quando e como foi a divulgação. Existe um período de graça previsto em lei, mas o prazo é curto e conta a favor de quem age rápido. Vale avaliar o caso concreto o quanto antes.',
      },
    ],
  },

  'direito-das-coisas': {
    tagline: 'Imóveis e patrimônio da empresa com titularidade e uso bem resolvidos.',
    family: 'patrimonio',
    forWhom: [
      'Empresas que compram, vendem ou alugam imóveis',
      'Investidores em patrimônio imobiliário',
      'Famílias e sócios com imóveis em nome da pessoa física',
    ],
    deliverables: [
      'Due diligence imobiliária antes da compra',
      'Contratos de compra e venda, locação e cessão de uso',
      'Regularização de matrícula, posse e propriedade',
      'Constituição de garantias reais e análise de ônus',
      'Disputas possessórias e de propriedade',
    ],
    signals: [
      'A compra está encaminhada e ninguém verificou a matrícula',
      'O imóvel da operação está em nome pessoal, sem contrato com a empresa',
      'A posse é antiga, mas a documentação nunca foi regularizada',
    ],
    faqs: [
      {
        question: 'Por que fazer due diligence antes de comprar?',
        answer:
          'Porque é a etapa em que aparecem ônus, penhoras, pendências de matrícula e riscos de fraude à execução. Verificar antes é incomparavelmente mais simples do que desfazer depois.',
      },
      {
        question: 'O imóvel da empresa deve ficar em nome de quem?',
        answer:
          'Depende do objetivo: proteção patrimonial, planejamento sucessório, eficiência tributária e risco da operação puxam para lados diferentes. É uma decisão a ser tomada com o cenário completo na mesa.',
      },
    ],
  },

  'planejamento-patrimonial': {
    tagline: 'Organizar hoje o que a sua família não vai querer discutir depois.',
    family: 'patrimonio',
    forWhom: [
      'Empresários com patrimônio pessoal e empresarial misturados',
      'Famílias que querem organizar a sucessão em vida',
      'Sócios que querem separar o risco da empresa do patrimônio da família',
    ],
    deliverables: [
      'Diagnóstico do patrimônio e dos riscos de exposição',
      'Estruturação de holding patrimonial ou familiar',
      'Instrumentos de sucessão: doação com reserva, testamento, acordos familiares',
      'Regime de bens, pactos antenupciais e proteção de participações',
      'Governança familiar e regras de convivência entre gerações',
    ],
    signals: [
      'O patrimônio da família responde pelos riscos da empresa',
      'A sucessão nunca foi conversada e depende da boa vontade de todos',
      'Bens estão espalhados, sem estrutura e sem plano',
    ],
    faqs: [
      {
        question: 'Planejamento patrimonial é só para grandes fortunas?',
        answer:
          'Não. Qualquer patrimônio que sustente uma família ou um negócio se beneficia de organização. O que muda é a complexidade da estrutura, não a utilidade dela.',
      },
      {
        question: 'Isso serve para blindar contra dívidas?',
        answer:
          'Planejamento patrimonial é organização lícita e feita em tempo adequado — não instrumento para frustrar credores. Estruturas montadas depois do problema tendem a ser desconstituídas judicialmente, e é justamente esse erro que o trabalho evita.',
      },
      {
        question: 'Holding sempre é a melhor solução?',
        answer:
          'Nem sempre. A holding é uma das ferramentas possíveis e precisa fazer sentido diante do perfil do patrimônio, do custo de manutenção e do objetivo da família. A escolha vem depois do diagnóstico.',
      },
    ],
  },
}

export function getServiceDetail(slug: string | undefined): ServiceDetail | null {
  if (!slug) return null
  // Acesso direto pegaria coisas do protótipo (`constructor`, `toString`) para
  // slugs com esses nomes.
  return Object.prototype.hasOwnProperty.call(serviceDetails, slug)
    ? serviceDetails[slug]
    : null
}

/**
 * Mapa slug → família. Mantido separado para o filtro do cliente não precisar
 * carregar todo o conteúdo editorial (FAQs, entregáveis…) no bundle.
 */
export function getFamilyBySlug(): Record<string, string> {
  return Object.fromEntries(
    Object.entries(serviceDetails).map(([slug, detail]) => [slug, detail.family]),
  )
}
