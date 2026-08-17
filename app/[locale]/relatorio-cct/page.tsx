import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/motion/Reveal'
import BackToTop from '@/components/motion/BackToTop'
import { getSiteData } from '@/lib/site-data'

const COURSE_URL = '/cursos/cct-sindpd-seprosp'

const BASE_DECISIONS = 2221

/** Contagem de decisões do TRT-2 por tema, do mais ao menos litigado. */
const themes = [
  { theme: 'Enquadramento sindical', decisions: 1132, share: 51.0 },
  { theme: 'Intervalo intrajornada', decisions: 647, share: 29.1 },
  { theme: 'Gestante', decisions: 555, share: 25.0 },
  { theme: 'Adicional noturno', decisions: 405, share: 18.2 },
  { theme: 'Participação nos lucros', decisions: 387, share: 17.4 },
  { theme: 'Terceirização', decisions: 381, share: 17.2 },
  { theme: 'Banco de horas', decisions: 313, share: 14.1 },
  { theme: 'Vale-refeição', decisions: 277, share: 12.5 },
  { theme: 'Contribuição assistencial', decisions: 235, share: 10.6 },
  { theme: 'Sobreaviso', decisions: 225, share: 10.1 },
  { theme: 'Divisor 200', decisions: 208, share: 9.4 },
  { theme: 'Multa convencional', decisions: 183, share: 8.2 },
  { theme: 'Teleatendimento', decisions: 180, share: 8.1 },
  { theme: 'Teletrabalho', decisions: 121, share: 5.4 },
  { theme: 'Ação de cumprimento', decisions: 112, share: 5.0 },
  { theme: 'Adicional de 75%', decisions: 110, share: 5.0 },
  { theme: 'Plano de saúde', decisions: 110, share: 5.0 },
  { theme: 'Piso salarial', decisions: 108, share: 4.9 },
  { theme: 'Estabilidade provisória', decisions: 93, share: 4.2 },
  { theme: 'Seguro de vida', decisions: 79, share: 3.6 },
  { theme: 'Quilometragem', decisions: 72, share: 3.2 },
  { theme: 'Auxílio-doença', decisions: 58, share: 2.6 },
  { theme: 'Help desk', decisions: 47, share: 2.1 },
  { theme: 'Auxílio-creche', decisions: 44, share: 2.0 },
  { theme: 'Contrato de experiência', decisions: 19, share: 0.9 },
]

const readings = [
  {
    number: '2.1',
    title: 'O litígio dominante é sobre aplicabilidade, não sobre aplicação',
    lead: '1.132 decisões — 51% de todo o acervo — discutem enquadramento sindical.',
    paragraphs: [
      'Este é o achado central. A pergunta que mais chega ao TRT-2 não é como aplicar a CCT do Sindpd: é se ela se aplica. E a resposta, na esmagadora maioria dos casos, decide sozinha o destino de toda a ação — porque, afastado o enquadramento, caem em bloco os pedidos de piso, vale-refeição, adicionais convencionais e multas normativas.',
      'O critério aplicado é uniforme e previsível: atividade preponderante do empregador, art. 511, §2º, da CLT. Sindicatos concorrentes que aparecem com frequência: SECSP e SECOR (comerciários), SIEMACO-SP (asseio e conservação), SINDIESP, SECAEESP (conservação e assistência técnica), SINCOMÉRCIO ABC e FENABAN (bancários).',
      'Ponto de atenção pouco explorado: há decisão no sentido de que, se a empresa de processamento de dados presta serviços exclusivos ao seu grupo econômico, os empregados seguem a atividade preponderante do grupo — não a de TI. Isso alcança diretamente centros de serviços compartilhados e subsidiárias de tecnologia de grupos varejistas, financeiros e industriais.',
    ],
  },
  {
    number: '2.2',
    title: 'O segundo tema mais litigado é justamente o que a CCT-SP não regula',
    lead: 'Intervalo intrajornada: 647 decisões — e nenhuma cláusula na Convenção paulista.',
    paragraphs: [
      'A lacuna já era conhecida por comparação com a CCT mineira, que dedica cláusula própria ao tema e autoriza a redução para 30 minutos. O dado mostra que não se trata de omissão inofensiva: é o segundo tema de mérito mais frequente em todo o acervo.',
      'Aplica-se, portanto, o regime puro do art. 71 da CLT, sem a flexibilização que o art. 611-A, III, autorizaria por norma coletiva.',
      'Consequência prática: este é, isoladamente, o argumento mais forte para um Acordo Coletivo específico com o Sindpd (Cláusula 66ª). A empresa que opera turnos e quer previsibilidade nesse ponto tem 647 razões documentadas para negociar.',
    ],
  },
  {
    number: '2.3',
    title: 'A estabilidade gestacional é um passivo maior do que aparenta',
    lead: 'Gestante: 555 decisões. “Estabilidade provisória” como expressão genérica: apenas 93.',
    paragraphs: [
      'A diferença mostra que o tema gestante é litigado por nome próprio e com peso muito superior às demais garantias de emprego somadas.',
      'E o cenário tende a piorar: o Tema 163 do TST, com tese vinculante fixada em 30/06/2025, consolidou que a garantia alcança o contrato de experiência — que aparece hoje em apenas 19 decisões, número que deve subir.',
      'Consequência: oferecer exame de gravidez no demissional, com consentimento expresso, deixa de ser cautela e passa a ser gestão de risco quantificada.',
    ],
  },
  {
    number: '2.4',
    title: 'A PLR é litigada onde a Convenção quase não dispõe',
    lead: '387 decisões — quinto tema geral — para uma cláusula que, em São Paulo, não institui direito algum.',
    paragraphs: [
      'A cláusula apenas obriga a empresa a provocar a negociação em 120 dias da data-base. O volume sugere duas frentes distintas de litígio: a cobrança da própria obrigação de fazer, com multa convencional pelo descumprimento — hipótese localizada concretamente na amostra —; e discussões sobre programas próprios de PLR e seus critérios.',
      'Consequência: o ofício anual ao Sindpd até 30 de abril, que costuma figurar como item de calendário, é na verdade um item de contencioso. Custa um protocolo e evita ser réu.',
    ],
  },
  {
    number: '2.5',
    title: 'O adicional noturno lidera o bloco de jornada',
    lead: '405 decisões — acima de banco de horas (313), sobreaviso (225) e divisor (208).',
    paragraphs: [
      'É o passivo silencioso: a CCT amplia o período noturno até as 6h e eleva o adicional a 30%, mas não afasta a hora ficta de 52min30s. Empresa que remunera o adicional corretamente, mas computa a hora noturna como de 60 minutos, paga a menor — e o número mostra que isso é discutido com frequência.',
    ],
  },
  {
    number: '2.6',
    title: 'Teleatendimento supera help desk em quatro por um',
    lead: 'Teleatendimento: 180. Help desk: 47.',
    paragraphs: [
      'A relação inverte a intuição de quem opera o setor. O litígio se dá predominantemente sob a rubrica de teleatendimento — que é justamente a qualificação que reduz a jornada para 6 horas por força do art. 227 da CLT e, agora, do Tema 176 do TST (tese vinculante de 30/06/2025).',
      'Isso confere valor prático imediato à parte final da Cláusula 3ª, alínea “D”, que separa normativamente as duas atividades. E confirma o diagnóstico: o baixo volume de “help desk” não indica baixo risco — indica que a discussão chega ao tribunal já rotulada de forma desfavorável à empresa.',
    ],
  },
]

const riskClasses = [
  {
    title: 'Alto volume, exposição unitária moderada',
    themes: 'Enquadramento sindical · Intervalo intrajornada · Adicional noturno · Banco de horas · Vale-refeição',
    body: 'São os temas que geram condenação frequente, de valor médio, e que exigem conformidade sistêmica: parametrização de folha, controle de jornada, política escrita.',
  },
  {
    title: 'Baixo volume, exposição unitária alta',
    themes: 'Seguro de vida (79) · Quilometragem (72) · Auxílio-doença (58) · Auxílio-creche (44)',
    body: 'Raramente litigados, mas cada caso carrega valor desproporcional. O seguro de vida é o exemplo extremo: são 79 decisões, mas a Cláusula 20ª, §2º, transforma a empresa sem apólice em seguradora de R$ 36.000,00 por sinistro, além do dano moral aos beneficiários.',
  },
]

const findings = [
  {
    clause: 'Cláusula 39ª — banco de horas',
    body: 'Reiteradamente validada, com fundamento triplo: previsão expressa em norma coletiva, art. 59-B, parágrafo único, da CLT (a habitualidade não descaracteriza) e Súmula 85, V (inaplicável ao banco de horas). Registrado, ainda, que a reclassificação sindical não invalida por si o regime.',
  },
  {
    clause: 'Onde a Cláusula 39ª cai, cai pelo §1º',
    body: 'Sentença localizada declara a nulidade do sistema por descumprimento da efetiva fruição e quitação quadrimestral do saldo. O risco não está na validade do regime: está na execução.',
  },
  {
    clause: 'Cláusula 38ª, §5º — divisor',
    body: 'Embargos de declaração acolhidos por contradição, contra empregador que computava crédito de banco de horas apenas acima de 44 horas semanais, ignorando o limite convencional de 40 e o divisor 200.',
  },
  {
    clause: 'Cláusula 61ª — destinação da multa',
    body: 'Acórdão da 5ª Turma afasta a tese de reversão automática ao sindicato: a literalidade da norma coletiva prevê a reversão ao Sindpd apenas nas hipóteses de descumprimento de cláusulas associativas e assistenciais (alínea B).',
  },
  {
    clause: 'Cláusula 3ª, “D” — help desk',
    body: 'Sentença reconheceu jornada de teleatendimento no primeiro cargo e, por consequência, declarou irregular a compensação via banco de horas quanto à extrapolação da 6ª hora diária, apesar de a defesa sustentar tratar-se de suporte técnico. É o cenário de risco do Tema 176 já materializado.',
  },
  {
    clause: 'Cláusula 16ª — PLR',
    body: 'Sentença registra a inexistência de negociação para implantação de PLR, conforme exigido pela norma coletiva, como fundamento de indenização e multa convencional.',
  },
  {
    clause: 'Cláusula 7ª — quilometragem',
    body: 'Invocada em juízo, com defesa alegando que o uso de veículo próprio era escolha pessoal para o trajeto casa-trabalho — exatamente a distinção entre deslocamento a serviço e vale-transporte.',
  },
]

const methodNotes = [
  {
    title: 'O que os números medem',
    body: 'São contagens por ocorrência do termo no documento, não por ratio decidendi. Uma decisão que apenas menciona “banco de horas” na descrição da defesa entra na contagem tanto quanto aquela que o julga. Os números medem frequência de tematização, não frequência de julgamento — servem para priorizar, não para concluir.',
  },
  {
    title: 'Falsos positivos conhecidos',
    body: 'A busca por “SINDPD” captura também decisões em que o sindicato é parte em ação própria (contribuições, ações de cumprimento) sem aplicação de cláusula a contrato individual. As 112 decisões de “ação de cumprimento” são, em boa parte, desse tipo.',
  },
  {
    title: 'Por que os percentuais somam mais de 100%',
    body: 'Uma mesma decisão trata, em regra, de vários temas. Cada percentual é a participação do tema no total de 2.221 decisões da base, e não uma fatia exclusiva.',
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  await params
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  return {
    title: 'Relatório de litigância da CCT Sindpd-SP/SeproSP',
    description:
      'Levantamento jurisprudencial no TRT-2: 2.221 decisões que aplicam a CCT Sindpd-SP/SeproSP, mapeadas por tema. Onde a convenção coletiva de TI realmente vira processo.',
    alternates: { canonical: `${siteUrl}/relatorio-cct` },
  }
}

export default async function RelatorioCctPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const data = await getSiteData()

  const maxShare = themes[0].share

  return (
    <>
      <Header name={data.name} tagline={data.tagline} phone={data.phone} locale={locale} />

      <main id="main-content">
        <PageHero
          eyebrow="Relatório gratuito"
          title="Onde a CCT Sindpd-SP/SeproSP realmente vira processo."
          lead="Levantamento jurisprudencial no TRT-2: 2.221 decisões que aplicam a convenção coletiva de TI, mapeadas tema a tema — para você saber onde olhar primeiro."
          crumbs={[
            { label: 'Início', href: '/' },
            { label: 'Cursos', href: '/cursos' },
            { label: 'Relatório de litigância' },
          ]}
        >
          <dl className="grid gap-x-8 gap-y-4 text-sm sm:grid-cols-3">
            {[
              { label: 'Fonte', value: 'Jurisprudência do TRT da 2ª Região' },
              { label: 'Coleta', value: '16 de agosto de 2026' },
              { label: 'Universo', value: 'Acórdãos e sentenças, sem recorte temporal' },
            ].map((item) => (
              <div key={item.label}>
                <dt className="mb-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-gold-light">
                  {item.label}
                </dt>
                <dd className="text-slate-300">{item.value}</dd>
              </div>
            ))}
          </dl>
        </PageHero>

        {/* 1. O mapa */}
        <section className="bg-white py-20">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">1. O mapa</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                Os 25 temas, do mais ao menos litigado.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="mb-9 text-lg text-muted">
                A base são as{' '}
                <strong className="font-bold text-navy">
                  {BASE_DECISIONS.toLocaleString('pt-BR')} decisões
                </strong>{' '}
                do TRT-2 que citam o Sindpd. Cada linha mostra quantas delas tratam do tema — e o
                quanto ele pesa no acervo.
              </p>
            </Reveal>

            <Reveal variant="up" delay={190}>
              <div className="overflow-x-auto rounded-[20px] border border-black/[0.06] bg-offwhite">
                <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                  <caption className="sr-only">
                    Decisões do TRT-2 sobre a CCT Sindpd-SP/SeproSP por tema, em número absoluto e
                    em percentual da base de {BASE_DECISIONS.toLocaleString('pt-BR')} decisões.
                  </caption>
                  <thead>
                    <tr className="border-b border-black/[0.08]">
                      <th
                        scope="col"
                        className="px-5 py-4 text-[0.68rem] font-black uppercase tracking-[0.14em] text-muted"
                      >
                        Tema
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-4 text-right text-[0.68rem] font-black uppercase tracking-[0.14em] text-muted"
                      >
                        Decisões
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-4 text-[0.68rem] font-black uppercase tracking-[0.14em] text-muted"
                      >
                        % da base
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {themes.map((item, index) => (
                      <tr
                        key={item.theme}
                        className="border-b border-black/[0.05] last:border-b-0 even:bg-black/[0.015]"
                      >
                        <th
                          scope="row"
                          className="px-5 py-3 font-normal text-[#1f2933] [font-weight:inherit]"
                        >
                          <span className="mr-2.5 text-xs tabular-nums text-slate-400">
                            {index + 1}
                          </span>
                          {item.theme}
                        </th>
                        <td className="px-3 py-3 text-right font-bold tabular-nums text-navy">
                          {item.decisions.toLocaleString('pt-BR')}
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="h-2 w-24 shrink-0 overflow-hidden rounded-l-sm rounded-r bg-navy/[0.09]"
                            >
                              <span
                                className="block h-full rounded-l-sm rounded-r bg-navy"
                                style={{ width: `${(item.share / maxShare) * 100}%` }}
                              />
                            </span>
                            <span className="tabular-nums text-muted">
                              {item.share.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Reveal>

            <Reveal variant="up" delay={70}>
              <p className="mt-5 text-sm text-muted">
                Os percentuais somam mais de 100% porque uma mesma decisão trata, em regra, de
                vários temas.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 2. As seis leituras */}
        <section className="bg-parchment texture-grain texture-grain-light relative py-20">
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">2. A leitura</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-10 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                As seis leituras que importam.
              </h2>
            </Reveal>

            <div className="grid gap-5">
              {readings.map((reading, index) => (
                <Reveal
                  key={reading.number}
                  as="article"
                  variant="up"
                  delay={Math.min(index, 3) * 70}
                  className="rounded-[20px] bg-white p-7 shadow-card md:p-8"
                >
                  <p className="mb-2 font-serif text-sm font-bold text-gold-ink">
                    {reading.number}
                  </p>
                  <h3 className="mb-3 font-serif text-xl font-bold leading-snug text-navy">
                    {reading.title}
                  </h3>
                  <p className="mb-4 border-l-2 border-gold py-1 pl-5 font-bold text-navy">
                    {reading.lead}
                  </p>
                  <div className="grid gap-3 text-[#3c4757]">
                    {reading.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Duas classes de risco */}
        <section className="bg-ink texture-grain relative overflow-hidden py-20">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">3. Prioridade</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-white md:text-[2.75rem]">
                Duas classes de risco — e elas pedem respostas opostas.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="mb-9 text-lg text-slate-300">
                Os números revelam uma divisão que costuma ser tratada de forma indiferenciada.
              </p>
            </Reveal>

            <div className="grid gap-4 md:grid-cols-2">
              {riskClasses.map((item, index) => (
                <Reveal
                  key={item.title}
                  variant="up"
                  delay={index * 90}
                  className="rounded-[20px] border border-white/10 bg-white/[0.04] p-7"
                >
                  <h3 className="mb-2 font-serif text-lg font-bold leading-snug text-gold-light">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-xs leading-relaxed text-slate-400">{item.themes}</p>
                  <p className="text-sm leading-relaxed text-slate-300">{item.body}</p>
                </Reveal>
              ))}
            </div>

            <Reveal variant="up" delay={90}>
              <p className="mt-9 border-l-2 border-gold py-1 pl-5 font-bold text-white">
                A prioridade de conformidade não deve seguir a ordem de litigiosidade. Contratar o
                seguro de vida custa alguns reais por vida/mês e resolve um risco de dezenas de
                milhares por evento; ajustar o divisor de folha custa uma tarde e resolve um risco
                de cinco anos de diferenças.
              </p>
            </Reveal>
          </div>
        </section>

        {/* 4. Achados da amostra */}
        <section className="bg-white py-20">
          <div className="container-fw max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">4. Amostra lida</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                O que aparece quando se lê a decisão inteira.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="mb-9 text-lg text-muted">
                Achados da leitura integral de aproximadamente 25 decisões da base.
              </p>
            </Reveal>

            <div className="grid gap-3">
              {findings.map((item, index) => (
                <Reveal
                  key={item.clause}
                  as="article"
                  variant="up"
                  delay={Math.min(index, 3) * 70}
                  className="rounded-2xl border border-black/[0.06] bg-offwhite p-6"
                >
                  <h3 className="mb-1.5 font-serif font-bold text-navy">{item.clause}</h3>
                  <p className="text-sm leading-relaxed text-[#3c4757]">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Nota metodológica */}
        <section className="bg-parchment texture-grain texture-grain-light relative py-20">
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <p className="eyebrow mb-4">5. Nota metodológica</p>
            </Reveal>
            <Reveal variant="up" delay={70}>
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] text-navy md:text-[2.75rem]">
                Como estes números foram apurados — e o que eles não provam.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={130}>
              <p className="mb-9 text-lg text-muted">
                A coleta foi feita no sistema de jurisprudência do TRT da 2ª Região em 16 de agosto
                de 2026, sobre acórdãos e sentenças, sem recorte temporal. Cada contagem
                corresponde à expressão exata do tema no campo de busca por palavras.
              </p>
            </Reveal>

            <div className="grid gap-6">
              {methodNotes.map((note, index) => (
                <Reveal key={note.title} as="article" variant="up" delay={Math.min(index, 3) * 70}>
                  <h3 className="mb-1.5 font-serif text-lg font-bold text-navy">{note.title}</h3>
                  <p className="text-[#3c4757]">{note.body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Fechamento */}
        <section className="bg-ink texture-grain relative overflow-hidden py-20 text-center text-white">
          <div aria-hidden className="texture-weave-dark absolute inset-0" />
          <div
            aria-hidden
            className="aurora left-[calc(50%-190px)] top-0 h-[380px] w-[380px] bg-gold/20"
          />
          <div className="container-fw relative max-w-3xl">
            <Reveal variant="up">
              <h2 className="mb-5 font-serif text-[2rem] font-bold leading-[1.06] md:text-[2.75rem]">
                O relatório mostra onde dói. O curso mostra o que fazer.
              </h2>
            </Reveal>
            <Reveal variant="up" delay={90}>
              <p className="mb-9 text-slate-300">
                Cada tema deste mapa nasce de uma cláusula da CCT Sindpd-SP/SeproSP. O curso
                percorre a convenção cláusula por cláusula, com o “como fazer” de cada ponto e a
                conciliação com a CLT e a jurisprudência dos TRT-SP.
              </p>
            </Reveal>
            <Reveal variant="up" delay={160}>
              <Link href={COURSE_URL} className="btn-gold min-h-[54px] px-10 text-base">
                Conhecer o curso
              </Link>
              <p className="mt-5 text-xs text-slate-400">
                Manual da CCT incluso · Comunidade por 12 meses
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <BackToTop />
      <Footer data={data} locale={locale} />
    </>
  )
}
