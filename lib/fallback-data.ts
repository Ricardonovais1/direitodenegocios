import type { SiteData } from '@/types'

export const fallbackData: SiteData = {
  name: 'Fausto Sette Câmara',
  tagline: 'Direito de Negócios',
  phone: '(31) 2515-6500',
  email: 'fausto.sette@sceb.com.br',
  address: 'Rua Marechal Hermes, 881, Gutierrez, Belo Horizonte/MG — CEP 30441-110',
  officeHours: ['Segunda a sexta: 9h às 18h', 'Atendimento nacional (remoto para todo o Brasil)'],
  hero: {
    eyebrow: 'Advocacia de Direito de Negócios · Belo Horizonte/MG · Atuação nacional',
    heading: 'Faça negócios com mais eficiência e menos risco.',
    subheading:
      'Sou Fausto Sette Câmara, advogado empresarial há mais de 15 anos. Ajudo empresas, empresários e profissionais a navegar o sistema brasileiro com estratégia, tática e leitura de jogo — do consultivo ao contencioso.',
    highlights: [
      { value: '15+ anos', label: 'Advocacia empresarial' },
      { value: 'UFMG', label: 'Pós em Direito Empresarial' },
      { value: '~10 anos', label: 'Negociação sindical' },
    ],
  },
  about: {
    heading: 'Você não precisa de mais um advogado. Precisa de alguém que conheça o jogo.',
    body: 'O ambiente de negócios brasileiro é um dos mais complexos do mundo. Impostos, burocracia, normas que se sobrepõem, fiscalização que muda de critério. Empreender aqui é, muitas vezes, lutar contra um sistema que parece desenhado para gerar ineficiência. Conhecimento técnico, sozinho, não resolve. O que separa negócios que prosperam dos que travam é a combinação de três coisas:',
    photo: '/images/fausto.webp',
    features: [
      { title: 'Estratégia', description: 'O plano de longo prazo para crescer sem se expor.' },
      { title: 'Tática', description: 'O “como fazer” no curto prazo, passo a passo.' },
      { title: 'Leitura de jogo', description: 'Enxergar como o sistema realmente funciona e superar os entraves que ele cria.' },
    ],
  },
  stats: [
    { value: '15+', label: 'anos de advocacia empresarial' },
    { value: 'UFMG', label: 'graduação + pós em Direito Empresarial' },
    { value: '~10', label: 'anos de negociação coletiva sindical' },
    { value: 'Nacional', label: 'atuação em todo o Brasil' },
  ],
  practiceAreas: [
    { _id: '1', number: '01', title: 'Consultoria jurídica', slug: 'consultoria-juridica', description: 'Orientação contínua para decidir com segurança, antes do problema virar processo.' },
    { _id: '2', number: '02', title: 'Direito de negócios', slug: 'direito-de-negocios', description: 'A visão integrada do jurídico sobre a sua operação: estrutura, contratos, riscos e oportunidades.' },
    { _id: '3', number: '03', title: 'Direito societário', slug: 'direito-societario', description: 'Constituição, acordos de sócios, governança e reorganizações societárias.' },
    { _id: '4', number: '04', title: 'Direito para startups', slug: 'direito-para-startups', description: 'Do pacto de fundadores às rodadas de investimento e à escala.' },
    { _id: '5', number: '05', title: 'Direito de TI', slug: 'direito-de-ti', description: 'Software, SaaS, proteção de dados, contratos de tecnologia e o universo digital.' },
    { _id: '6', number: '06', title: 'Direito do trabalho', slug: 'direito-do-trabalho', description: 'Compliance trabalhista, redução de passivos e defesa em reclamações e ações coletivas.' },
    { _id: '7', number: '07', title: 'Propriedade intelectual', slug: 'propriedade-intelectual', description: 'Marcas, patentes e segredos de negócio protegidos de verdade.' },
    { _id: '8', number: '08', title: 'Direito de patentes', slug: 'direito-de-patentes', description: 'Proteção de invenções e inovação para quem cria tecnologia.' },
    { _id: '9', number: '09', title: 'Direito das coisas', slug: 'direito-das-coisas', description: 'Direito imobiliário e de propriedade para negócios e patrimônio.' },
    { _id: '10', number: '10', title: 'Planejamento patrimonial', slug: 'planejamento-patrimonial', description: 'Blindagem, organização e sucessão do patrimônio.' },
  ],
  process: [
    { step: '1', title: 'Diagnóstico', description: 'Entendo o seu negócio, os riscos reais e o que está em jogo.' },
    { step: '2', title: 'Estratégia', description: 'Desenho o plano de longo prazo e as prioridades de curto prazo.' },
    { step: '3', title: 'Execução', description: 'Implemento, documento e negocio — do contrato à mesa de acordo.' },
    { step: '4', title: 'Acompanhamento', description: 'Fico ao seu lado para ajustar a rota conforme o cenário muda.' },
  ],
  testimonials: [
    {
      _id: 't1',
      name: 'Camila Guimarães',
      role: 'Gente e Gestão',
      company: 'Mereo',
      location: 'Belo Horizonte/MG',
      photo: '/images/camila-guimaraes.webp',
      quote:
        'Gostaria de expressar meu mais profundo agradecimento e admiração pelo trabalho excepcional do Dr. Fausto. Sua competência, dedicação e profissionalismo foram fundamentais para a resolução bem-sucedida de todos os cenários que vivenciamos. A atenção meticulosa aos detalhes, a capacidade de comunicação clara e a habilidade em navegar pelas complexidades legais com confiança e maestria são características que destacam sua atuação. Recomendo fortemente seus serviços a todos que necessitam de um advogado comprometido e eficaz.',
    },
    {
      _id: 't2',
      name: 'Rebeca Morato',
      role: 'CEO',
      company: 'Wellness Management Inovation',
      location: 'Divinópolis/MG',
      photo: '/images/rebeca-morato.webp',
      quote:
        'Em tempos tão incertos, contar com uma assessoria jurídica competente, preparada e disponível é fundamental. O time da Sette Câmara nos apoia há mais de 5 anos com esclarecimentos úteis, orientações jurídicas e apoio que vão além da esfera legal, nos auxiliando no dia a dia para cuidarmos e escalarmos nossa empresa.',
    },
    {
      _id: 't3',
      name: 'Alexandre Sartori',
      role: 'Chief Revenue Officer (CRO)',
      company: 'AIGNOSI',
      location: 'Miami, USA / Belo Horizonte, MG',
      photo: '/images/alexandre-sartori.webp',
      quote:
        'Há mais de 10 anos tenho a SCEB como parceira para assessoria jurídica nos negócios empresariais que eu atuo como sócio fundador. Além de toda a dedicação, parceria e profissionalismo, o conhecimento técnico das operações de engenharia e tecnologia que cercam os meus negócios é primordial para a qualidade e êxito dos processos e operações.',
    },
  ],
  faqs: [
    { _id: 'f1', question: 'Você atende empresas de fora de Belo Horizonte?', answer: 'Sim. A atuação é nacional, com atendimento remoto para todo o Brasil e presencial em Belo Horizonte/MG.' },
    { _id: 'f2', question: 'Vocês oferecem consultoria jurídica contínua?', answer: 'Sim. O trabalho pode ser pontual ou contínuo, conforme a necessidade do negócio — do consultivo ao contencioso.' },
    { _id: 'f3', question: 'Atendem startups e empresas de tecnologia?', answer: 'Sim. Direito para startups e Direito de TI são áreas centrais da atuação, incluindo contratos, propriedade intelectual e questões trabalhistas de TI.' },
    { _id: 'f4', question: 'Como funciona o primeiro contato?', answer: 'Basta enviar uma mensagem ou ligar. Entendemos o seu cenário e indicamos o caminho mais eficiente e de menor risco.' },
  ],
  awards: [
    { title: 'Graduação em Direito', organization: 'UFMG — 2008' },
    { title: 'Pós em Direito Empresarial', organization: 'Milton Campos — 2009' },
    { title: 'Manual da CCT', organization: 'Autor — comentário cláusula por cláusula' },
    { title: 'Sócio fundador', organization: 'SCEB — Belo Horizonte/MG' },
  ],
  caseResults: [
    { _id: 'r1', highlight: 'Negociação coletiva', label: 'Sindinfor/MG', description: 'Quase 10 anos à frente da mesa de negociação das convenções coletivas de TI.' },
    { _id: 'r2', highlight: 'Estruturação', label: 'Startups & tecnologia', description: 'Do pacto de sócios ao investimento, com proteção de propriedade intelectual.' },
    { _id: 'r3', highlight: 'Contratos de TI', label: 'Empresas de software & SaaS', description: 'Negociação, redação e gestão de risco em contratos de tecnologia.' },
    { _id: 'r4', highlight: 'Planejamento patrimonial', label: 'Empresários e famílias', description: 'Blindagem e sucessão de patrimônio com segurança jurídica.' },
    { _id: 'r5', highlight: 'Contencioso', label: 'Cível e trabalhista', description: 'Defesa estratégica em reclamações trabalhistas e disputas empresariais.' },
    { _id: 'r6', highlight: 'Consultivo contínuo', label: 'Clientes de longo prazo', description: 'Assessoria que acompanha o dia a dia e antecipa riscos antes que virem processo.' },
  ],
  courses: [
    {
      _id: 'c1',
      title: 'Curso CCT Sindpd-SP / SeproSP',
      slug: 'cct-sindpd-seprosp',
      eyebrow: 'Para RH e departamentos jurídicos de empresas de TI',
      headline: 'Domine a CCT Sindpd-SP / SeproSP — e elimine o passivo trabalhista escondido no seu RH.',
      subheadline:
        'O curso prático que percorre a Convenção Coletiva de TI cláusula por cláusula, ensina o “como fazer” — e não apenas o “o que fazer” — para você aplicar a norma coletiva com segurança, sem sustos e sem ações sindicais.',
      shortDescription:
        'Curso prático, cláusula por cláusula, para RH e jurídico de empresas de TI aplicarem a CCT Sindpd-SP/SeproSP e reduzirem passivos trabalhistas.',
      audience:
        'Departamentos jurídicos de empresas de TI, profissionais de RH de empresas sujeitas à CCT, e todos os interessados em direito coletivo do trabalho voltado para empresas de TI.',
      modules: [
        { title: 'Fundamentos da negociação coletiva', description: 'Hierarquia das normas, vigência e aplicação da CCT.' },
        { title: 'Estrutura da CCT Sindpd-SP/SeproSP', description: 'Partes, abrangência e base territorial.' },
        { title: 'Cláusulas econômicas', description: 'Pisos salariais, reajustes e adicionais.' },
        { title: 'Jornada e banco de horas', description: 'O que a convenção prevê e como aplicar.' },
        { title: 'Férias, licenças e ausências', description: 'Regras específicas da categoria de TI.' },
        { title: 'Benefícios e auxílios', description: 'Do vale-refeição ao teletrabalho, cláusula a cláusula.' },
        { title: 'Relações sindicais e contribuições', description: 'O que a empresa deve observar com o sindicato.' },
        { title: 'Aplicação prática', description: 'Instrumentalização da CCT, prevenção de passivos e resposta a fiscalizações e ações coletivas.' },
      ],
      faqs: [
        { question: 'Preciso ser advogado para fazer o curso?', answer: 'Não. O curso foi desenhado para RH e departamentos jurídicos de empresas de TI — e para qualquer profissional que aplica a CCT no dia a dia. A linguagem é clara e prática.' },
        { question: 'O curso cobre a convenção inteira, cláusula por cláusula?', answer: 'Sim. O objetivo é exatamente percorrer a CCT cláusula por cláusula, com interpretação e o “como fazer” de cada ponto.' },
        { question: 'Minha empresa não é de São Paulo. O conteúdo serve para mim?', answer: 'Se a sua empresa está sujeita à CCT Sindpd-SP/SeproSP, o conteúdo é para você. A lógica de leitura e aplicação de convenções coletivas também vale para outras normas e regiões.' },
        { question: 'Recebo o Manual da CCT?', answer: 'Sim, o Manual da CCT está incluso como bônus.' },
        { question: 'Por quanto tempo tenho acesso?', answer: '[PREENCHER — ex.: acesso vitalício, incluindo atualizações da CCT.]' },
        { question: 'Tem certificado?', answer: '[PREENCHER — ex.: sim, com carga horária de X horas.]' },
        { question: 'Como acesso o curso?', answer: '[PREENCHER — ex.: após a confirmação do pagamento, você recebe o acesso por e-mail.]' },
      ],
      price: '[PREENCHER — ex.: R$ 497,00 à vista ou 12x de R$ 49,70]',
      guarantee:
        '[PREENCHER — ex.: Garantia incondicional de 7 dias. Se por qualquer motivo você achar que o curso não é para você, devolvemos 100% do valor, sem perguntas e sem burocracia.]',
      bonus: 'Manual da CCT — o livro que comenta cada cláusula e indica o racional da evolução normativa.',
      order: 1,
    },
  ],
  secondCta: {
    heading: 'Pronto para fazer negócios com mais eficiência e menos risco?',
    body: 'Envie uma mensagem ou agende uma consulta. Vamos desenhar juntos a estratégia para o seu próximo movimento.',
  },
  footer: {
    disclaimer:
      'Conteúdo de caráter informativo, em conformidade com as normas de publicidade da OAB. Este site não promete resultados e não configura relação advogado-cliente até a formalização do contrato. [PREENCHER OAB quando disponível.]',
  },
  seo: {
    title: 'Fausto Sette Câmara — Direito de Negócios e Empresarial',
    description:
      'Advogado de Direito de Negócios com 15+ anos de experiência. Estratégia, tática e leitura de jogo para empresas, startups e empresários. Atuação nacional.',
  },
}
