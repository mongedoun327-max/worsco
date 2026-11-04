/**
 * Modern Bestsellers & Influential Books Catalog
 * Provides contemporary, highly sought-after non-fiction and modern literary milestones
 * with comprehensive chapters, deep analyses, actionable frameworks, and authentic covers.
 */

export interface ModernChapter {
  id: string;
  book_id: string;
  position: number;
  title: string;
  content: string;
  is_free_preview: boolean;
}

export interface ModernBook {
  id: string; // e.g. "mod-habitos-atomicos"
  title: string;
  author: string;
  subtitle: string;
  description: string;
  cover_url: string;
  category: string;
  price_cents: 0;
  currency: string;
  published: boolean;
  featured: boolean;
  created_at: string;
  downloads: number;
  rating: number;
  rating_count: number;
  read_time: number;
  year: number;
  formats: string[];
  is_modern_bestseller: true;
  chapters: ModernChapter[];
}

export const MODERN_BOOKS: ModernBook[] = [
  {
    id: "mod-habitos-atomicos",
    title: "Hábitos Atômicos",
    author: "James Clear",
    subtitle: "Um Método Fácil e Comprovado de Criar Bons Hábitos e se Livrar dos Maus",
    description: "Fenômeno global com mais de 15 milhões de exemplares vendidos. James Clear apresenta um método prático e cientificamente embasado sobre como pequenas mudanças diárias de 1% geram resultados extraordinários a longo prazo através das Quatro Leis da Mudança de Comportamento.",
    cover_url: "https://covers.openlibrary.org/b/id/12539702-L.jpg",
    category: "Autoajuda e Motivacional",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-20T00:00:00Z",
    downloads: 48900,
    rating: 4.9,
    rating_count: 8420,
    read_time: 280,
    year: 2018,
    formats: ["Leitura Online", "Guia Integral", "Framework de Ação"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "hab-cap-1",
        book_id: "mod-habitos-atomicos",
        position: 1,
        title: "Capítulo 1: O Poder Surpreendente dos Hábitos Atômicos",
        is_free_preview: true,
        content: `### O Poder Surpreendente dos Hábitos Atômicos

A premissa central de *Hábitos Atômicos* reside em um princípio matemático simples, porém frequentemente negligenciado: pequenas melhorias contínuas, quando acumuladas ao longo do tempo, geram uma força transformadora exponencial.

Se você conseguir melhorar apenas **1% a cada dia** durante um ano inteiro, terminará trinta e sete vezes (37x) melhor ao final desse ciclo. Inversamente, se piorar 1% a cada dia, regredirá quase a zero.

> "Os hábitos são os juros compostos do autoaperfeiçoamento. Da mesma forma que o dinheiro se multiplica pelos juros compostos, os efeitos dos seus hábitos se multiplicam à medida que você os repete."

#### Por Que os Resultados Demoram a Aparecer?
Muitas pessoas abandonam novos comportamentos porque esperavam uma transformação imediata e linear. No entanto, o progresso nos hábitos segue o fenômeno que James Clear denomina **Platô do Potencial Latente**.

Durante as primeiras semanas ou meses de qualquer esforço disciplinado, parece que nada está acontecendo. Você vai à academia durante um mês e o espelho não reflete grandes alterações; estuda um novo idioma por 30 dias e ainda tropeça nas conjugações básicas. 

Isso não significa que o esforço foi desperdiçado — ele está sendo armazenado. Assim como o gelo não derrete entre -5°C e -1°C, mas sofre uma mudança de fase abrupta exatamente ao cruzar a marca de 0°C, os hábitos acumulam energia latente até romperem a barreira da visibilidade.

#### Esqueça os Objetivos, Foque nos Sistemas
Uma das distinções mais revolucionárias da obra é a diferença crucial entre **metas** e **sistemas**:
* **Metas** dizem respeito aos resultados que você deseja alcançar (ex: emagrecer 10 kg, faturar um milhão de reais, escrever um livro).
* **Sistemas** dizem respeito aos processos diários que conduzem a esses resultados (ex: a rotina alimentar diária, os rituais de prospecção de clientes, o hábito inegociável de redigir 500 palavras todas as manhãs).

Se você fosse um treinador de basquete e ignorasse completamente o placar da partida, focando unicamente naquilo que seu time faz em cada treino diário, ainda assim obteria resultados? A resposta de Clear é um enfático sim. Vencedores e perdedores compartilham exatamente as mesmas metas; o que os diferencia é unicamente a excelência e consistência de seus sistemas.`,
      },
      {
        id: "hab-cap-2",
        book_id: "mod-habitos-atomicos",
        position: 2,
        title: "Capítulo 2: Hábitos Baseados na Identidade",
        is_free_preview: true,
        content: `### Como Seus Hábitos Moldam Sua Identidade (e Vice-Versa)

A razão fundamental pela qual a maioria das pessoas falha em sustentar mudanças comportamentais duradouras é que tentam alterar as coisas no nível incorreto. Existem três camadas distintas de mudança de comportamento:

1. **Mudança de Resultados:** Focada em alterar o que você obtém (perder peso, publicar um artigo, ganhar um troféu).
2. **Mudança de Processos:** Focada em alterar o que você faz (adotar uma nova planilha de treinos, organizar a mesa de trabalho).
3. **Mudança de Identidade:** Focada em alterar aquilo em que você acredita (sua visão de mundo, sua autoimagem, seus julgamentos sobre si mesmo).

#### O Poder do "Eu Sou"
A abordagem tradicional foca no resultado: *"Quero correr uma maratona"* (baseada em resultados).
A abordagem de alto impacto inverte o vetor: *"Eu sou um corredor"* (baseada na identidade).

Considere duas pessoas recusando um cigarro oferecido em uma roda de amigos:
* A primeira pessoa responde: *"Não, obrigado. Estou tentando parar de fumar."* Embora pareça uma resposta razoável, ela ainda se enxerga como fumante que está travando uma batalha contra sua própria vontade.
* A segunda pessoa responde com convicção: *"Não, obrigado. Eu não sou fumante."* Essa minúscula distinção linguística sinaliza uma metamorfose na identidade. O cigarro já não pertence ao universo daquela pessoa.

> "Cada ação que você toma é um voto a favor da pessoa que você deseja se tornar. Nenhum voto isolado transformará sua vida, mas conforme os votos se acumulam, a evidência de sua nova identidade torna-se inegável."

#### O Processo de Dois Passos para Mudar de Identidade
1. Decida com clareza cristalina que tipo de pessoa você deseja ser.
2. Prove isso para si mesmo diariamente com pequenas vitórias acumuladas.`,
      },
      {
        id: "hab-cap-3",
        book_id: "mod-habitos-atomicos",
        position: 3,
        title: "Capítulo 3: As Quatro Leis da Mudança de Comportamento",
        is_free_preview: true,
        content: `### O Loop do Hábito e as Quatro Leis Práticas

Todo hábito humano é regido por um circuito neurológico composto por quatro fases universais: **Estímulo -> Desejo -> Resposta -> Recompensa**.

Para criar um novo hábito positivo de forma sustentável, aplique as **Quatro Leis da Mudança de Comportamento**:

| Fase do Hábito | Lei para Criar um Bom Hábito | Inversão para Quebrar um Mau Hábito |
| :--- | :--- | :--- |
| **1. Estímulo** | **Torne-o Claro** (visível no ambiente) | **Torne-o Invisível** (remova as pistas) |
| **2. Desejo** | **Torne-o Atraente** (associe ao prazer) | **Torne-o Desinteressante** (mude o enquadramento) |
| **3. Resposta** | **Torne-o Fácil** (reduza o atrito) | **Torne-o Difícil** (aumente a fricção) |
| **4. Recompensa** | **Torne-o Satisfatório** (recompensa imediata) | **Torne-o Insatisfatório** (consequências imediatas) |

#### Aplicações Práticas Imediatas:
* **A Regra dos Dois Minutos:** Ao iniciar qualquer novo hábito, diminua sua escala até que ele possa ser executado em menos de dois minutos. *"Ler 30 páginas por noite"* transforma-se em *"Abrir o livro e ler uma página"*. *"Correr 5 km"* transforma-se em *"Calçar os tênis de corrida"*. Torne o hábito tão fácil de iniciar que seja impossível dizer não.
* **Design de Ambiente:** O ambiente físico é a mão invisível que molda o comportamento humano. Não confie na força de vontade: posicione uma garrafa de água cheia bem no centro da sua mesa de trabalho para beber mais água; guarde o smartphone em outro cômodo enquanto trabalha focado.`,
      },
    ],
  },
  {
    id: "mod-psicologia-financeira",
    title: "A Psicologia Financeira",
    author: "Morgan Housel",
    subtitle: "Lições Intemporais Sobre Riqueza, Ganância e Felicidade",
    description: "Um dos livros de negócios e finanças mais aclamados do século XXI. Morgan Housel demonstra que ter sucesso com dinheiro tem pouco a ver com sua inteligência e muito a ver com a forma como você se comporta perante a ganância, o medo, a inveja e o tempo.",
    cover_url: "https://covers.openlibrary.org/b/id/6694177-L.jpg",
    category: "Finanças e Negócios",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-21T00:00:00Z",
    downloads: 41200,
    rating: 4.9,
    rating_count: 6730,
    read_time: 260,
    year: 2020,
    formats: ["Leitura Online", "Guia Integral", "Estudo de Caso"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "psi-cap-1",
        book_id: "mod-psicologia-financeira",
        position: 1,
        title: "Capítulo 1: Ninguém É Louco",
        is_free_preview: true,
        content: `### Ninguém É Louco: O Peso da Sua Experiência Pessoal

Sua experiência pessoal com dinheiro representa talvez 0,00000001% daquilo que aconteceu no mundo econômico, mas compõe provavelmente 80% do modo como você pensa que o mundo funciona.

Pessoas de diferentes gerações, criadas por pais com recursos distintos, em cantos diferentes do planeta e sob economias singulares, aprendem lições totalmente diversas sobre risco, poupança, investimento e valor.

> "A pessoa que cresceu durante a Grande Depressão pensa sobre risco e recompensa de uma maneira que o executivo de tecnologia dos anos 1990 jamais conseguirá conceber, por mais que leia livros de história."

#### Por Que Decisões Financeiras Parecem Estranhas aos Olhos dos Outros
Quando você vê alguém comprando bilhetes de loteria toda semana ou acumulando dinheiro vivo embaixo do colchão, seu impulso analítico é rotulá-los como irracionais. 

Contudo, ninguém toma decisões financeiras com base unicamente em planilhas frias de Excel. As pessoas tomam decisões na mesa do jantar, temperadas por suas carências emocionais, seu orgulho, suas inseguranças e as circunstâncias singulares em que suas vidas foram forjadas. Compreender isso é o primeiro passo para dominar a verdadeira psicologia da riqueza.`,
      },
      {
        id: "psi-cap-2",
        book_id: "mod-psicologia-financeira",
        position: 2,
        title: "Capítulo 2: Sorte & Risco",
        is_free_preview: true,
        content: `### Sorte e Risco: As Duas Faces da Mesma Moeda

Sorte e risco são irmãos siameses. Ambos representam a realidade incontornável de que cada resultado em sua vida é guiado por forças exteriores muito além do seu próprio esforço individual.

Housel ilustra esse princípio através da trajetória de **Bill Gates**. Gates frequentou uma das únicas escolas de ensino fundamental de todo o planeta que possuía um computador moderno em 1968 (a Lakeside School em Seattle). A probabilidade de um jovem daquela época estar exatamente naquela escola era de aproximadamente uma em um milhão. Sem essa fantástica maré de sorte contextual, teria existido a Microsoft? O próprio Gates admitiu publicamente que não.

Por outro lado, o melhor amigo de infância de Gates em Lakeside, Kent Evans, era igualmente brilhante, apaixonado por computação e dotado de ambição idêntica. Evans, no entanto, faleceu tragicamente em um acidente de montanhismo antes de concluir o ensino médio — uma probabilidade estatística de morte que também era de cerca de uma em um milhão. Um conheceu a sorte extraordinária; o outro, o risco devastador.

#### A Lição Crucial
* Nunca presuma que 100% dos seus sucessos decorrem exclusivamente da sua genialidade e trabalho duro.
* Nunca presuma que 100% dos seus fracassos derivam da sua preguiça ou incompetência.
* Seja humilde quando as coisas vão bem, e seja compassivo consigo mesmo quando as coisas dão errado.`,
      },
      {
        id: "psi-cap-3",
        book_id: "mod-psicologia-financeira",
        position: 3,
        title: "Capítulo 3: Rico vs. Próspero (Ser Rico vs. Ter Riqueza)",
        is_free_preview: true,
        content: `### Rico vs. Próspero: O Que Você Vê e o Que Permanece Oculto

Uma das distinções mais vitais e elegantes de Morgan Housel reside na diferença entre **Ser Rico (Being Rich)** e **Ter Riqueza (Being Wealthy)**:

* **Rico** está associado à sua renda corrente e aos seus gastos visíveis. Alguém que dirige um Porsche de 800 mil reais ou ostenta roupas de grife é, por definição aparente, rico. No entanto, a única coisa que você sabe com certeza sobre a conta bancária dessa pessoa é que ela tem 800 mil reais a menos do que tinha antes de comprar aquele veículo.
* **Ter Riqueza** é o oposto: riqueza é aquilo que você **não vê**. São os investimentos não resgatados, as ações intocadas na corretora, as propriedades quitadas e a flexibilidade financeira preservada. Riqueza é a opção silenciosa de poder comprar algo no futuro se você quiser, ou a liberdade inestimável de acordar amanhã e poder decidir o que fazer com seu próprio tempo.

> "Gastar dinheiro para mostrar às pessoas quanto dinheiro você tem é a maneira mais rápida de ter menos dinheiro."

#### O Valor da Independência
O mais alto dividendo que o dinheiro pode pagar é o controle total sobre a sua rotina diária. Poder acordar todas as manhãs e dizer *"Hoje eu posso fazer o que eu quiser, com quem eu quiser, pelo tempo que eu quiser"* proporciona um nível de bem-estar psicológico e felicidade sustentável que nenhum bem de consumo ou símbolo de status jamais conseguirá entregar.`,
      },
    ],
  },
  {
    id: "mod-pai-rico-pai-pobre",
    title: "Pai Rico, Pai Pobre",
    author: "Robert T. Kiyosaki",
    subtitle: "O Que os Ricos Ensinam a Seus Filhos Sobre Dinheiro",
    description: "O clássico divisor de águas da educação financeira mundial. Kiyosaki desconstrói o mito de que para ser rico é necessário ter um salário astronômico, ensinando a distinção essencial entre ativos e passivos e a fuga deliberada da infame 'Corrida dos Ratos'.",
    cover_url: "https://covers.openlibrary.org/b/id/8315603-L.jpg",
    category: "Finanças e Negócios",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-22T00:00:00Z",
    downloads: 53400,
    rating: 4.8,
    rating_count: 9120,
    read_time: 250,
    year: 1997,
    formats: ["Leitura Online", "Capítulos Completos"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "prp-cap-1",
        book_id: "mod-pai-rico-pai-pobre",
        position: 1,
        title: "Capítulo 1: A Lição dos Dois Pais",
        is_free_preview: true,
        content: `### A Lição dos Dois Pais: Mentalidades Conflitantes

Robert Kiyosaki cresceu observando a conduta de duas figuras paternas fundamentais que influenciaram radicalmente sua visão sobre a vida e a riqueza:

* **O Pai Pobre:** Seu pai biológico, um homem de alta erudição acadêmica, com doutorado e cargo público de prestígio no governo do Havaí, mas que vivia sob constante aperto financeiro e preocupação crônica com o pagamento das contas.
* **O Pai Rico:** O pai de seu melhor amigo Mike, que não havia concluído o ensino médio, mas construiu um império comercial, tornando-se um dos homens mais abastados de todo o estado.

#### As Frases Que Moldam o Destino
Ambos os pais trabalhavam incansavelmente, mas emitiam conselhos radicalmente opostos diante do mesmo estímulo:

* O Pai Pobre dizia resignado: *"Não posso comprar isso."*
* O Pai Rico proibia terminantemente essa frase e exigia uma pergunta ativa: *"Como eu posso comprar isso?"*

Segundo Kiyosaki, a primeira afirmação fecha as portas da mente e desliga o cérebro; a segunda abre possibilidades infinitas e obriga o cérebro a pensar, exercitando a musculatura mental da inteligência financeira.

> "Os pobres e a classe média trabalham pelo dinheiro. Os ricos fazem o dinheiro trabalhar para eles."`,
      },
      {
        id: "prp-cap-2",
        book_id: "mod-pai-rico-pai-pobre",
        position: 2,
        title: "Capítulo 2: A Definição Simples de Ativos e Passivos",
        is_free_preview: true,
        content: `### A Regra Fundamental: Conheça a Diferença Entre Ativos e Passivos

Se você deseja se tornar financeiramente independente, essa é a regra mais elementar e poderosa que você precisará dominar para o resto da sua vida: **compre ativos e limite os passivos**.

Muitos contadores complicam desnecessariamente o vocabulário, mas a definição prática de Kiyosaki é lapidar:

* **Ativo:** É tudo aquilo que coloca dinheiro no seu bolso, sem que você precise trabalhar ativamente por ele (ex: imóveis de aluguel, ações pagadoras de dividendos, fundos imobiliários, direitos autorais, negócios automatizados).
* **Passivo:** É tudo aquilo que tira dinheiro do seu bolso mês após mês (ex: financiamento do carro de luxo, faturas do cartão de crédito, assinaturas desnecessárias e a manutenção da casa própria).

#### A Polêmica da Casa Própria
Uma das teses mais controversas do livro é que a residência própria da família, na grande maioria dos casos, não funciona como um ativo, mas sim como um imenso passivo: ela exige pagamentos de hipoteca, impostos territoriais (IPTU), seguros e manutenção constante, drenando a liquidez que poderia estar sendo canalizada para ativos geradores de fluxo de caixa real.`,
      },
      {
        id: "prp-cap-3",
        book_id: "mod-pai-rico-pai-pobre",
        position: 3,
        title: "Capítulo 3: Como Escapar da Corrida dos Ratos",
        is_free_preview: true,
        content: `### Como Escapar da 'Corrida dos Ratos'

A maioria dos seres humanos cai em uma armadilha previsível chamada por Kiyosaki de **A Corrida dos Ratos**:
1. O jovem estuda com afinco, tira boas notas e consegue um emprego razoável.
2. Começa a receber seu salário e imediatamente eleva seu padrão de consumo (aluga um apartamento melhor, financia um carro novo, compra roupas de grife).
3. Conforme ganha uma promoção e seu salário aumenta, seus gastos e impostos sobem na mesma proporção (inflação do estilo de vida).
4. O medo de perder o emprego e não conseguir quitar as contas obriga-o a trabalhar cada vez mais horas, dependendo desesperadamente do próximo contracheque.

#### O Caminho da Libertação
A única saída da Corrida dos Ratos consiste em desviar deliberadamente o excedente de capital do salário para construir uma coluna sólida de ativos geradores de renda passiva. 

O momento mágico da independência financeira ocorre no exato dia em que o rendimento gerado pelos seus ativos supera o custo total do seu estilo de vida mensal. A partir desse ponto, o trabalho passa a ser uma escolha livre, e nunca mais uma imposição de sobrevivência.`,
      },
    ],
  },
  {
    id: "mod-1984-orwell",
    title: "1984",
    author: "George Orwell",
    subtitle: "A Distopia Máxima Sobre Vigilância, Poder e Manipulação da Verdade",
    description: "Uma das narrativas ficcionais mais influentes e proféticas da história contemporânea. Na superpotência totalitária da Oceania, o Grande Irmão (Big Brother) tudo vigia através das teletelas, enquanto o Ministério da Verdade reescreve o passado e a Novilíngua estreita o pensamento humano.",
    cover_url: "https://covers.openlibrary.org/b/id/853463-L.jpg",
    category: "Ficção Científica",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-23T00:00:00Z",
    downloads: 62100,
    rating: 4.9,
    rating_count: 12400,
    read_time: 340,
    year: 1949,
    formats: ["Leitura Online", "Texto Integral Analítico"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "1984-cap-1",
        book_id: "mod-1984-orwell",
        position: 1,
        title: "Parte I: O Olho Que Tudo Vê e o Diário Proibido",
        is_free_preview: true,
        content: `### O Olho Que Tudo Vê: "O Grande Irmão Está de Olho em Você"

*Era um dia frio e luminoso de abril, e os relógios batiam treze horas.*

Com essa frase icônica, George Orwell nos apresenta Winston Smith, um funcionário de trinta e nove anos que sobe as escadas desgastadas do Bloco de Apartamentos Vitória, em Londres — agora a cidade principal da Faixa Aérea Um, província do superestado totalitário da Oceania.

Em cada patamar da escada, fitando da parede em frente ao elevador quebrado, um enorme cartaz colorido retrata um rosto masculino imenso, de olhar hipnótico e bigodes pretos espessos, sob a legenda inescapável: **O GRANDE IRMÃO ESTÁ DE OLHO EM VOCÊ**.

#### A Teletela e o Fim da Privacidade
Dentro do apartamento minúsculo de Winston, um aparelho oblongo de metal semelhante a um espelho fosco — a infame **teletela** — transmite ininterruptamente boletins ufanistas sobre a produção de ferro-gusa e as glórias do Partido contra os inimigos da Eurásia e da Lestásia.

Mais aterrorizante do que o som incessante é o fato de que a teletela recebe e transmite simultaneamente. Qualquer sussurro emitido acima do tom de respiração normal, qualquer contração muscular involuntária ou olhar hesitante pode ser capturado pelo olhar onisciente da **Polícia do Pensamento (Thought Police)**. Não havia refúgio, nem sequer no sono.

#### O Ato Revolucionário da Escrita
Em um raro canto morto do quarto, oculto do ângulo de visão da teletela, Winston comete seu primeiro crime capital: retira da gaveta um diário de folhas amareladas e uma caneta de aparo antiga, e registra a data presente: *4 de abril de 1984*.

O simples ato de manter um diário não era explicitamente ilegal — visto que não existiam leis escritas na Oceania —, mas se descoberto, era punido com a morte sumária ou, na melhor das hipóteses, com vinte e cinco anos em um campo de trabalhos forçados. Winston escreve em transe febril com tinta borrada:

> "GUERRA É PAZ. LIBERDADE É ESCRAVIDÃO. IGNORÂNCIA É FORÇA."`,
      },
      {
        id: "1984-cap-2",
        book_id: "mod-1984-orwell",
        position: 2,
        title: "Parte II: O Duplipensar e o Ministério da Verdade",
        is_free_preview: true,
        content: `### O Ministério da Verdade e a Engenharia do Duplipensar

O trabalho cotidiano de Winston Smith no **Ministério da Verdade (Minitrue)** consiste em alterar, reescrever e falsificar registros históricos passados para mantê-los em perfeita consonância com as declarações atuais do Partido.

Se há três meses o Grande Irmão previu triunfante que a ração de chocolate não sofreria reduções e hoje ela é cortada para vinte gramas por semana, o dever de Winston é rastrear todos os exemplares de jornais antigos arquivados, retificar o texto original do discurso para que pareça que o Grande Irmão sempre previu a redução, e enviar as versões autênticas aos **buracos de memória**, onde são incineradas para sempre nas fornalhas subterrâneas.

> "Quem controla o passado controla o futuro; quem controla o presente controla o passado."

#### O Mecanismo do Duplipensar (Doublethink)
O *Duplipensar* é a faculdade psicológica deliberada de abrigar duas crenças mutuamente contraditórias na mente ao mesmo tempo, aceitando ambas como verdadeiras. 

Para a engrenagem do Partido funcionar, os cidadãos precisam saber que estão forjando uma mentira, esquecer que praticaram a mentira, e então acreditar plenamente na nova verdade oficial — tudo isso enquanto mantêm a convicção inabalável de que a realidade nunca foi diferente. Se o Partido diz que dois mais dois são cinco, a mente do indivíduo deve aceitar não apenas com submissão aparente, mas com genuíno júbilo mental.`,
      },
    ],
  },
  {
    id: "mod-homem-mais-rico-babilonia",
    title: "O Homem Mais Rico da Babilônia",
    author: "George S. Clason",
    subtitle: "Os Segredos dos Antigos Para a Riqueza e Prosperidade Financeira",
    description: "Um dos maiores clássicos da sabedoria financeira de todos os tempos. Através de parábolas ambientadas na lendária e suntuosa Babilônia antiga, o rico Arkad ensina as leis eternas para fazer o ouro se multiplicar e construir um patrimônio inabalável.",
    cover_url: "https://covers.openlibrary.org/b/id/10491331-L.jpg",
    category: "Finanças e Negócios",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-24T00:00:00Z",
    downloads: 39500,
    rating: 4.8,
    rating_count: 5900,
    read_time: 210,
    year: 1926,
    formats: ["Leitura Online", "Parábolas Integrais"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "bab-cap-1",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 1,
        title: "Capítulo 1: O Homem Que Desejava o Ouro",
        is_free_preview: true,
        content: `### O Homem Que Desejava o Ouro

Na antiga Babilônia, a metrópole mais próspera e cintilante do mundo antigo, vivia Bansir, um habilidoso construtor de carruagens. A despeito de décadas de trabalho árduo sob o sol inclemente da Mesopotâmia, seus bolsos continuavam vazios, e sua bolsa de couro continha apenas uma mísera moeda de cobre.

Sentado sobre a muralha inacabada de sua oficina, Bansir confidencia sua angústia ao amigo Kobbi, músico talentoso que também mal conseguia ganhar o sustento diário:

*"Trabalhamos como escravos desde a alvorada até o anoitecer, e contudo nossos filhos crescem sem nenhuma herança além da nossa pobreza. No entanto, nesta mesma cidade caminha Arkad, nosso antigo companheiro de infância, cujos cofres transbordam de ouro e cuja generosidade com os necessitados e o rei é célebre em todos os continentes. O que ele sabe que nós ignoramos?"*

#### A Decisão de Buscar a Sabedoria
Bansir e Kobbi compreendem que a riqueza não é fruto exclusivo do acaso ou dos caprichos dos deuses, mas sim de **leis e princípios imutáveis**. Decidem então procurar Arkad e implorar que lhes ensine o caminho da abundância.`,
      },
      {
        id: "bab-cap-2",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 2,
        title: "Capítulo 2: Os Sete Remédios Para a Bolsa Vazia",
        is_free_preview: true,
        content: `### Os Sete Remédios Para Curar a Bolsa Vazia

Diante dos cidadãos reunidos no Templo do Aprendizado, a pedido do próprio Rei da Babilônia, Arkad revelou as sete regras douradas que transformaram sua vida de humilde escriba no homem mais opulento de seu tempo:

1. **Comece a encher sua bolsa:** De cada dez moedas que você ganhar no seu trabalho, gaste apenas nove. Pague a si mesmo em primeiro lugar. Uma décima parte de tudo aquilo que você ganha pertence a você para ser guardada e investida.
2. **Controle seus gastos:** Não confunda despesas necessárias com desejos supérfluos. Os desejos humanos crescem espontaneamente para igualar qualquer aumento de receita, a menos que sejam firmemente contidos por um orçamento disciplinado.
3. **Faça seu ouro frutificar:** Cada moeda guardada deve ser colocada para trabalhar como um escravo leal, gerando filhos (juros) que, por sua vez, também trabalharão e gerarão netos para alimentar o seu patrimônio.
4. **Proteja seu tesouro contra a perda:** O primeiro princípio do investimento é a segurança do capital principal. Não confie suas economias em promessas mirabolantes ou nos conselhos de pessoas inexperientes no setor em que você investe.
5. **Faça de seu lar um investimento vantajoso:** Tenha uma residência própria e digna para abrigar sua família com honra e estabilidade.
6. **Assegure uma renda futura:** Prepare uma fonte de provisão contínua para sua velhice e para a segurança dos seus familiares quando você já não puder trabalhar.
7. **Aumente sua capacidade de ganhar:** Cultive suas habilidades técnicas, aprimore seu ofício diário e estude constantemente para se tornar mais valioso aos olhos de seus semelhantes.`,
      },
    ],
  },
  {
    id: "mod-essencialismo",
    title: "Essencialismo",
    author: "Greg McKeown",
    subtitle: "A Disciplina Consciente de Fazer Menos, Porém Muito Melhor",
    description: "O antídoto definitivo contra o esgotamento moderno e a sobrecarga de tarefas superficiais. McKeown ensina a arte radical de discernir o que é verdadeiramente vital e eliminar com coragem todo o resto, devolvendo o foco e o significado à sua vida.",
    cover_url: "https://covers.openlibrary.org/b/id/7285986-L.jpg",
    category: "Autoajuda e Motivacional",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: false,
    created_at: "2024-01-25T00:00:00Z",
    downloads: 33400,
    rating: 4.8,
    rating_count: 4890,
    read_time: 240,
    year: 2014,
    formats: ["Leitura Online", "Capítulos Essenciais"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "ess-cap-1",
        book_id: "mod-essencialismo",
        position: 1,
        title: "Capítulo 1: O Paradoxo do Sucesso",
        is_free_preview: true,
        content: `### O Essencialista vs. O Não Essencialista

O modo do não essencialista baseia-se na falsa premissa: *"Tenho que fazer tudo", "Tudo é igualmente importante"* e *"Como posso dar conta de tudo ao mesmo tempo?"*.

O caminho do essencialista é guiado por uma bússola oposta: *"Quase tudo é ruído; pouquíssimas coisas são extraordinariamente vitais"*, *"O que eu escolho priorizar com maestria?"* e *"Se não for um sim entusiasmado, então é um não definitivo"*.

#### O Paradoxo do Sucesso
Por que pessoas competentes e dedicadas tantas vezes estagnam ou sofrem de burnout severo? Greg McKeown descreve as quatro fases do **Paradoxo do Sucesso**:
1. Quando temos clareza de propósito, dedicamos energia concentrada a um objetivo e alcançamos o sucesso.
2. Esse sucesso nos rende a reputação de alguém confiável, e de repente passamos a receber uma avalanche de novas opções, pedidos e oportunidades.
3. Ao tentar abraçar todas as oportunidades simultâneas, dispersamos nossa energia em direções conflitantes (o clássico milímetro de progresso em um milhão de direções).
4. Essa sobrecarga nos afasta do foco vital que originou nosso sucesso inicial.

A solução exige a coragem de dizer "não" com elegância e firmeza às oportunidades secundárias para proteger o seu verdadeiro chamado.`,
      },
    ],
  },
  {
    id: "mod-como-fazer-amigos",
    title: "Como Fazer Amigos e Influenciar Pessoas",
    author: "Dale Carnegie",
    subtitle: "O Guia Clássico e Atemporal de Relações Humanas e Liderança",
    description: "Com mais de 30 milhões de cópias vendidas em todo o mundo, a obra-prima de Dale Carnegie continua sendo a bíblia definitiva sobre empatia, comunicação persuasiva, resolução pacífica de conflitos e conexão genuína entre seres humanos.",
    cover_url: "https://covers.openlibrary.org/b/id/13314878-L.jpg",
    category: "Autoajuda e Motivacional",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-26T00:00:00Z",
    downloads: 51200,
    rating: 4.9,
    rating_count: 9800,
    read_time: 290,
    year: 1936,
    formats: ["Leitura Online", "Princípios na Íntegra"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "car-cap-1",
        book_id: "mod-como-fazer-amigos",
        position: 1,
        title: "Parte 1: Técnicas Fundamentais Para Tratar Com as Pessoas",
        is_free_preview: true,
        content: `### Se Você Quer Colher Mel, Não Chute a Colmeia

Em 1931, a polícia de Nova York travou um cerco cinematográfico contra Francis "Two Gun" Crowley, um assassino frio que atirava em policiais à queima-roupa sem hesitar. Encurralado em seu esconderijo, Crowley redigiu uma carta com seu próprio sangue que dizia: *"Sob meu casaco bate um coração cansado, mas bondoso — um coração que não faria mal a ninguém."*

Mesmo os criminosos mais sanguinários justificam suas ações e se recusam a condenar a si mesmos. Se isso ocorre com assassinos notórios, o que dizer das pessoas comuns com quem você interage diariamente?

#### Princípio 1: Não Critique, Não Condene, Não Se Queixe
A crítica afiada é inútil porque coloca a outra pessoa imediatamente na defensiva e a força a buscar desculpas para salvar o próprio orgulho ferido. A crítica machuca a vaidade humana, corrói o senso de importância do indivíduo e gera ressentimentos que perduram por décadas.

> "Qualquer tolo pode criticar, condenar e queixar-se — e a maioria dos tolos faz exatamente isso. Mas é preciso ter caráter e autocontrole para ser compreensivo e saber perdoar."

#### Princípio 2: Faça Elogios Honestos e Sinceros
O anseio mais profundo da natureza humana, segundo o filósofo John Dewey, é o **desejo de ser importante**. As pessoas têm fome e sede de apreciação genuína. Diferencie com clareza o elogio autêntico da bajulação vazia: o elogio nasce do coração e reconhece qualidades reais; a bajulação nasce dos dentes para fora e visa apenas à manipulação egoísta.

#### Princípio 3: Desperte na Outra Pessoa um Forte Desejo
O único meio no mundo de influenciar alguém é falar sobre o que **ela** quer, e mostrar-lhe como consegui-lo.`,
      },
    ],
  },
  {
    id: "mod-arte-da-guerra",
    title: "A Arte da Guerra",
    author: "Sun Tzu",
    subtitle: "Tratado Clássico de Estratégia, Liderança e Negociação",
    description: "O tratado militar e estratégico mais reverenciado do Oriente. Os ensinamentos do lendário general chinês Sun Tzu transcendem o campo de batalha bélico e são aplicados universalmente em disputas corporativas, liderança de equipes e inteligência emocional.",
    cover_url: "https://covers.openlibrary.org/b/id/9054486-L.jpg",
    category: "Filosofia e Pensamento",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: false,
    created_at: "2024-01-27T00:00:00Z",
    downloads: 44100,
    rating: 4.8,
    rating_count: 7200,
    read_time: 190,
    year: -500,
    formats: ["Leitura Online", "Tratado Integral"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "art-cap-1",
        book_id: "mod-arte-da-guerra",
        position: 1,
        title: "Capítulo 1: Avaliações Estratégicas e o Conhecimento de Si Mesmo",
        is_free_preview: true,
        content: `### A Arte da Estratégia e da Vitória Sem Conflito

Sun Tzu ensina que a vitória suprema não consiste em vencer cem batalhas sangrentas, mas sim em **subjugar o inimigo sem precisar travar combate algum**.

> "Se você conhece o inimigo e conhece a si mesmo, não precisa temer o resultado de cem batalhas. Se você conhece a si mesmo, mas não conhece o inimigo, para cada vitória alcançada você também sofrerá uma derrota. Se você não conhece nem o inimigo nem a si mesmo, sucumbirá em todas as batalhas."

#### Os Cinco Fatores Fundamentais do Sucesso
Antes de qualquer empreendimento de vulto, avalie:
1. **O Caminho Moral (Harmonia):** O alinhamento autêntico entre o líder e sua equipe;
2. **O Céu (Tempo/Timing):** As condições ambientais, estações e o momento oportuno de agir;
3. **A Terra (Terreno):** O contexto de mercado, as distâncias e os recursos disponíveis;
4. **O Comando (Liderança):** A presença de sabedoria, sinceridade, benevolência, coragem e rigor;
5. **A Disciplina (Método):** A organização de papéis, logística e gestão orçamentária clara.`,
      },
    ],
  },
  {
    id: "mod-mindset",
    title: "Mindset: A Nova Psicologia do Sucesso",
    author: "Carol S. Dweck",
    subtitle: "Como Nossa Mente Pode Influenciar Nossa Capacidade de Crescimento e Realização",
    description: "Fruto de décadas de pesquisa pioneira na Universidade de Stanford, Carol Dweck demonstra a diferença transformadora entre a mentalidade fixa (acreditar que inteligência é inata) e a mentalidade de crescimento (compreender que esforço, resiliência e aprendizado expandem o cérebro).",
    cover_url: "https://covers.openlibrary.org/b/id/746414-L.jpg",
    category: "Autoajuda e Motivacional",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: false,
    created_at: "2024-01-28T00:00:00Z",
    downloads: 36700,
    rating: 4.8,
    rating_count: 5120,
    read_time: 250,
    year: 2006,
    formats: ["Leitura Online", "Capítulos de Estudo"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "min-cap-1",
        book_id: "mod-mindset",
        position: 1,
        title: "Capítulo 1: As Duas Mentalidades Que Regem a Vida",
        is_free_preview: true,
        content: `### Mentalidade Fixa vs. Mentalidade de Crescimento

Por que algumas pessoas abraçam desafios com entusiasmo e se recuperam de fracassos retumbantes, enquanto outras desmoronam diante da primeira crítica negativa ou evitam tarefas difíceis com medo de parecerem incompetentes?

A resposta reside no seu **Mindset** dominante:

* **Mentalidade Fixa (Fixed Mindset):** A crença profunda de que seus traços fundamentais — como QI, talento artístico, carisma ou capacidade matemática — são dons congênitos imutáveis. Pessoas com mentalidade fixa passam a vida tentando provar a cada instante que são espertas e talentosas, e enxergam o esforço como sinal de fraqueza (*"Se eu preciso me esforçar tanto, é porque não tenho talento natural"*).
* **Mentalidade de Crescimento (Growth Mindset):** A compreensão baseada na neurociência de que suas habilidades básicas podem ser cultivadas e expandidas através da dedicação, da prática deliberada e do aprendizado com os erros. O fracasso não é uma sentença sobre sua identidade (*"Eu sou um fracassado"*), mas sim um ponto de dados informativo sobre o processo (*"Ainda não aprendi essa habilidade"*).

> "O poder do 'Ainda': quando um estudante diz 'Não sei resolver essa equação', a resposta transformadora é 'Você não sabe resolver essa equação... AINDA'."`,
      },
    ],
  },
  {
    id: "mod-sapiens",
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    subtitle: "De Primatas Insignificantes a Mestres Indiscutíveis do Planeta Terra",
    description: "Um dos maiores triunfos intelectuais da literatura contemporânea. O historiador Yuval Noah Harari narra como uma espécie comum de primatas africanos conquistou o topo da cadeia alimentar graças à capacidade revolucionária de criar e compartilhar ficções coletivas (deuses, dinheiro, nações e corporações).",
    cover_url: "https://covers.openlibrary.org/b/id/8634250-L.jpg",
    category: "História e Sociedade",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: true,
    created_at: "2024-01-29T00:00:00Z",
    downloads: 58200,
    rating: 4.9,
    rating_count: 11200,
    read_time: 390,
    year: 2011,
    formats: ["Leitura Online", "Grandes Revoluções"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "sap-cap-1",
        book_id: "mod-sapiens",
        position: 1,
        title: "Capítulo 1: Um Animal de Pouca Importância",
        is_free_preview: true,
        content: `### Um Animal de Pouca Importância

Há cerca de 100 mil anos, pelo menos seis espécies humanas diferentes habitavam o planeta Terra simultaneamente: *Homo sapiens*, *Homo neanderthalensis*, *Homo erectus*, *Homo floresiensis*, *Homo denisova* e *Homo soloensis*.

O *Homo sapiens* daquela época era uma criatura marginal que vivia no leste da África, caçando pequenos animais, colhendo raízes e vivendo em pavor constante dos grandes predadores felinos. O que permitiu que esse primata insignificante não apenas sobrevivesse, mas subjugasse todas as demais espécies humanas e remodelasse toda a biosfera da Terra?

#### A Revolução Cognitiva e o Poder da Ficção
Há aproximadamente 70 mil anos, mutações genéticas desencadearam a **Revolução Cognitiva**, dotando o Sapiens de uma linguagem de complexidade inaudita. 

Diferente de qualquer outro animal, o Sapiens desenvolveu a habilidade mágica de falar sobre coisas que **não existem fisicamente no mundo real**: mitos, lendas, espíritos, leis e crenças compartilhadas.

> "Dois chimpanzés nunca conseguirão cooperar em massa porque não compartilham ficções. Você nunca convencerá um macaco a lhe dar uma banana prometendo que, depois de morrer, ele irá para o céu dos macacos e receberá bananas infinitas."

O dinheiro, os estados soberanos, as religiões organizadas e as corporações multinacionais de capital aberto (como o Google ou a Apple) são todas ficções intersubjetivas: elas só têm poder porque milhões de mentes humanas concordam coletivamente em acreditar na sua validade.`,
      },
    ],
  },
  {
    id: "mod-meditacoes-marco-aurelio",
    title: "Meditações",
    author: "Marco Aurélio",
    subtitle: "O Diário Pessoal do Imperador Filósofo de Roma Sobre Estoicismo e Serena Resiliência",
    description: "As notas particulares e reflexões diárias de Marco Aurélio, imperador de Roma e um dos maiores expoentes da filosofia estoica. Escrito em tendas militares durante as campanhas germânicas, a obra é um manual eterno sobre como manter a serenidade, a virtude e o autocontrole diante do caos exterior.",
    cover_url: "https://covers.openlibrary.org/b/id/12032600-L.jpg",
    category: "Filosofia e Pensamento",
    price_cents: 0,
    currency: "BRL",
    published: true,
    featured: false,
    created_at: "2024-01-30T00:00:00Z",
    downloads: 38100,
    rating: 4.9,
    rating_count: 6400,
    read_time: 210,
    year: 180,
    formats: ["Leitura Online", "Aforismos Integrais"],
    is_modern_bestseller: true,
    chapters: [
      {
        id: "med-cap-1",
        book_id: "mod-meditacoes-marco-aurelio",
        position: 1,
        title: "Livro II: Como Despertar Para a Vida Toda Manhã",
        is_free_preview: true,
        content: `### O Despertar Matinal do Imperador

*Ao despontar da aurora, diga a si mesmo com firmeza:*

> "Hoje encontrarei pessoas intrometidas, ingratas, insolentes, desleais, invejosas e egoístas. Elas agem dessa forma porque ignoram a diferença entre o bem e o mal. Eu, porém, compreendi a natureza do bem e a nobreza da virtude; sei que o homem que erra é meu irmão por natureza — não de sangue ou semente, mas porque partilha da mesma centelha divina da razão. Nenhum deles pode me causar dano moral, pois ninguém pode me forçar a praticar o mal."

#### A Dicotomia do Controle
O princípio fundacional do estoicismo, compartilhado com Epicteto e Sêneca, divide todo o universo em duas esferas irredutíveis:
1. **As Coisas Que Estão Sob Nosso Controle Direto:** Nossos pensamentos, julgamentos, impulsos de ação, virtudes e a forma como escolhemos reagir aos acontecimentos.
2. **As Coisas Que Não Estão Sob Nosso Controle:** A opinião alheia, as intempéries econômicas, o clima, as doenças, as decisões dos governantes e a morte física.

A paz de espírito inabalável (Ataraxia) surge quando você cessa imediatamente de desperdiçar energia emocional tentando controlar aquilo que pertence à segunda categoria, dedicando 100% da sua força interior àquilo que está genuinamente sob sua custódia.`,
      },
    ],
  },
];
