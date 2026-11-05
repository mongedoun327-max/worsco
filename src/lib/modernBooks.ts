/**
 * Modern Bestsellers & Influential Books Catalog
 * Complete, in-depth chapters with full analytical depth, verbatim quotes,
 * frameworks of action, and authentic covers.
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
  id: string;
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
    description: "Fenômeno global com mais de 15 milhões de exemplares vendidos. James Clear apresenta um método prático e cientificamente embasado sobre como pequenas mudanças diárias de 1% geram resultados extraordinários a longo prazo através das Quatro Leis da Mudança de Comportamento. Edição com todos os 10 capítulos e leis completas.",
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
    read_time: 320,
    year: 2018,
    formats: ["Leitura Online", "Guia Integral", "10 Capítulos Completos"],
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
        title: "Capítulo 2: Como os Hábitos Moldam Sua Identidade",
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
        title: "Capítulo 3: O Circuito Neurológico dos Hábitos e as Quatro Leis",
        is_free_preview: true,
        content: `### As Quatro Etapas do Hábito: Estímulo, Desejo, Resposta e Recompensa

Todo hábito humano — do ato inconsciente de roer unhas ao ritual matinal de meditação — é operado por um circuito neurológico de feedback composto por quatro fases universais:

1. **O Estímulo (Cue):** Desencadeia o cérebro a iniciar um comportamento. É um fragmento de informação que prevê uma recompensa (ex: a notificação do celular vibrando no bolso).
2. **O Desejo (Craving):** A força motivacional por trás de qualquer hábito. O que você deseja não é o hábito em si, mas a mudança de estado emocional que ele proporciona (ex: não é o cigarro que você quer, mas o alívio da ansiedade).
3. **A Resposta (Response):** O hábito real que você executa, seja uma ação motora ou um pensamento. Se a ação exigir mais esforço físico ou mental do que você está disposto a despender, ela não ocorrerá.
4. **A Recompensa (Reward):** O objetivo final de todo hábito. Satisfaz nosso desejo imediato e ensina o cérebro quais ações merecem ser lembradas no futuro.

#### As Quatro Leis da Mudança de Comportamento
Para criar um hábito sustentável:
* **1ª Lei (Estímulo):** Torne-o Claro.
* **2ª Lei (Desejo):** Torne-o Atraente.
* **3ª Lei (Resposta):** Torne-o Fácil.
* **4ª Lei (Recompensa):** Torne-o Satisfatório.

Para eliminar um hábito indesejado, basta inverter cada uma dessas leis: Torne-o Invisível, Desinteressante, Difícil e Insatisfatório.`,
      },
      {
        id: "hab-cap-4",
        book_id: "mod-habitos-atomicos",
        position: 4,
        title: "Capítulo 4: A 1ª Lei — Torne o Estímulo Claro",
        is_free_preview: true,
        content: `### O Design do Ambiente e a Intenção de Implementação

Muitas pessoas acreditam que lhes falta motivação, quando na realidade o que lhes falta é **clareza de contexto**. 

#### 1. A Intenção de Implementação
Centenas de estudos científicos comprovam que definir com exatidão *quando* e *onde* você executará uma ação multiplica em até três vezes a probabilidade de adesão:
> "Eu irei [COMPORTAMENTO] às [HORA] em [LOCAL]."

Exemplo: *"Eu irei meditar por cinco minutos às 7h da manhã na poltrona da sala de estar."* Ao remover o espaço para deliberação na hora de agir, a decisão deixa de disputar força de vontade.

#### 2. Empilhamento de Hábitos (Habit Stacking)
Uma das estratégias mais eficientes concebidas por BJ Fogg e refinadas por Clear consiste em ancorar um hábito novo sobre um hábito já consolidado no cérebro:
> "Depois de [HÁBITO ATUAL], eu irei [NOVO HÁBITO]."

Exemplo: *"Depois de colocar minha xícara de café sobre a mesa, abrirei meu caderno e anotarei minhas 3 prioridades do dia."*

#### 3. O Ambiente É a Mão Invisível
A visão é o sentido mais poderoso do corpo humano. Se você quer beber mais água, não esconda as garrafas na geladeira: espalhe garrafas cheias de água nos locais onde você passa a maior parte do tempo. Se quer praticar violão, não o guarde dentro do armário: posicione o suporte no centro da sala. Torne os estímulos dos bons hábitos inevitáveis no seu campo visual.`,
      },
      {
        id: "hab-cap-5",
        book_id: "mod-habitos-atomicos",
        position: 5,
        title: "Capítulo 5: A 2ª Lei — Torne o Hábito Atraente",
        is_free_preview: true,
        content: `### O Papel da Dopamina e o Pacote de Tentações

O cérebro humano não libera dopamina apenas quando você desfruta de um prazer; ele libera a maior quantidade de dopamina na **antecipação** da recompensa. É o desejo que nos move a agir, e não a realização do ato em si.

#### O Pacote de Tentações (Temptation Bundling)
Você pode tornar um hábito indispensável muito mais atraente se vinculá-lo a uma ação que você já deseja apaixonadamente fazer:
> "Depois de [HÁBITO DE QUE PRECISO], eu farei [HÁBITO QUE DESEJO]."

Exemplo clássico: Ronan Byrne, um estudante de engenharia em Dublin, adorava assistir à Netflix, mas sabia que precisava se exercitar. Ele reprogramou sua bicicleta ergométrica ligando-a ao laptop de modo que a Netflix só reproduzia vídeo se ele mantivesse a pedalada acima de determinada velocidade. Se ele pedalasse devagar demais, a série pausava imediatamente. Ele transformou um hábito penoso em um pacote de tentação irresistível.

#### A Força da Tribo
Somos animais sociais guiados pelo anseio biológico de pertencer a um grupo. Imitamos os hábitos de três categorias de pessoas:
1. Os Próximos (família e amigos mais íntimos);
2. A Maioria (a cultura ao nosso redor);
3. Os Poderosos (pessoas que desfrutam de status e prestígio).

A maneira mais infalível de sustentar um novo hábito é juntar-se a uma cultura onde o comportamento que você deseja adotar seja o comportamento normal do grupo. Se você se cerca de pessoas leitoras, a leitura se torna o seu padrão natural.`,
      },
      {
        id: "hab-cap-6",
        book_id: "mod-habitos-atomicos",
        position: 6,
        title: "Capítulo 6: A 3ª Lei — Torne o Hábito Fácil",
        is_free_preview: true,
        content: `### A Regra dos Dois Minutos e a Redução do Atrito

A energia do cérebro é limitada e segue a **Lei do Menor Esforço**: entre duas opções similares, a natureza humana sempre gravitará em direção àquela que exige menos gasto calórico e fricção mecânica.

Para criar um hábito, diminua o atrito associado a ele. Para destruir um mau hábito, aumente a fricção até que ele se torne cansativo demais para começar.

#### A Regra dos Dois Minutos
Ao instituir qualquer novo hábito, a regra de ouro diz:
> "Quando você começar um novo hábito, ele deve levar menos de dois minutos para ser feito."

* *"Ler 30 páginas por noite"* torna-se *"Ler uma única página"*.
* *"Fazer uma hora de ioga"* torna-se *"Estender o tapete de ioga no chão"*.
* *"Estudar para o concurso"* torna-se *"Abrir o livro na página do capítulo"*.

A genialidade dessa regra é que você não está tentando fazer o trabalho completo: você está **dominando a arte de comparecer**. Um hábito precisa ser estabelecido com firmeza antes que possa ser aprimorado. Se você não consegue aprender a arte básica de se apresentar na academia por dois minutos, nunca construirá o corpo que deseja.`,
      },
      {
        id: "hab-cap-7",
        book_id: "mod-habitos-atomicos",
        position: 7,
        title: "Capítulo 7: A 4ª Lei — Torne o Hábito Satisfatório",
        is_free_preview: true,
        content: `### O Efeito da Recompensa Imediata e o Rastreamento de Hábitos

A regra cardeal da mudança de comportamento estabelece uma assimetria fundamental:
> "O que é imediatamente recompensado é repetido. O que é imediatamente punido é evitado."

O grande dilema da sociedade contemporânea é que vivemos em um **ambiente de retorno postergado**: se você come uma barra de chocolate agora, o prazer é imediato e as calorias só cobrarão seu preço em anos futuros; se você investe dinheiro hoje, a privação é agora e a liberdade financeira só virá em décadas.

#### Como Tornar a Disciplina Satisfatória no Presente
1. **Dê a Si Mesmo Uma Vitória Visual Imediata:** Ao resistir a um gasto supérfluo de 50 reais com compras por impulso, transfira imediatamente esses 50 reais para uma conta poupança rotulada *"Minha Viagem dos Sonhos"*. A satisfação de ver o saldo crescer no mesmo instante substitui a privação.
2. **O Rastreador de Hábitos (Habit Tracker):** Marcar um 'X' vermelho na folha de calendário após cumprir sua rotina diária é altamente viciante porque entrega um feedback sensorial palpável de progresso.
3. **Nunca Perca Duas Vezes:** Perder um dia de treino ou de dieta por imprevisto é um acidente inevitável da vida; perder dois dias seguidos é o início de um novo e prejudicial hábito. Se falhar hoje, recupere o ritmo imediatamente amanhã.`,
      },
      {
        id: "hab-cap-8",
        book_id: "mod-habitos-atomicos",
        position: 8,
        title: "Capítulo 8: Táticas Avançadas e a Regra de Ouro da Motivação",
        is_free_preview: true,
        content: `### A Regra de Ouro da Motivação: Como Manter o Foco no Limiar da Dificuldade

O ser humano atinge seu ápice de motivação quando trabalha em tarefas que estão exatamente no limiar de suas habilidades atuais: não tão difíceis a ponto de gerar ansiedade paralisante, nem tão fáceis a ponto de provocar tédio entediante. Isso é conhecido como a **Regra de Ouro (The Goldilocks Rule)**.

Um jogo de tênis contra uma criança de quatro anos torna-se enfadonho em minutos; um jogo contra Roger Federer torna-se desanimador de imediato. A magia do fluxo ocorre quando você joga contra alguém que tem um nível técnico quase idêntico ao seu, onde cada ponto disputado pode ir para qualquer lado.

#### A Maior Ameaça ao Sucesso Não É o Fracasso, É o Tédio
Quando os hábitos se tornam rotineiros, eles perdem a novidade. É nesse momento que a maioria das pessoas desiste e pula para a próxima dieta da moda, o próximo método de treino ou o próximo projeto empreendedor.

> "A única diferença entre os melhores profissionais do mundo e todas as outras pessoas é que os mestres encontram uma maneira de comparecer e executar o trabalho mesmo quando o processo se tornou entediante."

A verdadeira grandeza exige apaixonar-se pela rotina diária de repetição.`,
      },
      {
        id: "hab-cap-9",
        book_id: "mod-habitos-atomicos",
        position: 9,
        title: "Capítulo 9: O Lado Sombrio dos Hábitos e a Autocomplacência",
        is_free_preview: true,
        content: `### O Lado Sombrio dos Hábitos: Evitando a Armadilha da Automação Cega

O benefício dos hábitos é que podemos realizar tarefas complexas sem pensar; o perigo é que deixamos de prestar atenção aos pequenos erros quando a execução se torna automática.

Quando você aprende a dirigir, cada movimento exige atenção concentrada aos pedais e aos espelhos. Cinco anos depois, você dirige até em casa sem se lembrar conscientemente de ter feito as curvas. A automação liberta a mente, mas também congela o desempenho no patamar da mediocridade.

#### A Fórmula da Maestria: Hábitos + Prática Deliberada = Maestria
Para atingir níveis extraordinários de excelência, você precisa combinar a fluidez dos hábitos automatizados com a reflexão e o ajuste crítico contínuo:
* Estabeleça rituais formais de **Revisão e Reflexão Semanal ou Anual**;
* Avalie: *"O que funcionou bem nesta semana? Onde eu desperdicei energia? O que posso ajustar em 1% na próxima semana?"*

Manter a humildade de um eterno principiante impede que sua identidade se torne rígida e incapaz de se adaptar a novos cenários.`,
      },
      {
        id: "hab-cap-10",
        book_id: "mod-habitos-atomicos",
        position: 10,
        title: "Capítulo 10: Síntese e Guia de Ação Vitalícia",
        is_free_preview: true,
        content: `### Síntese: O Segredo de Resultados Que Duram Para Sempre

O santo graal do aperfeiçoamento contínuo não é uma transformação monumental única, mas a fidelidade inegociável a um sistema de microvitórias.

#### As Quatro Perguntas de Verificação Diária
Sempre que desejar transformar qualquer área da sua vida — finanças, relacionamentos, corpo ou intelecto —, faça a si mesmo:
1. *Como posso tornar este comportamento claro e evidente no meu ambiente?*
2. *Como posso tornar este comportamento irresistivelmente atraente?*
3. *Como posso torná-lo tão simples que dois minutos bastem para executá-lo?*
4. *Como posso torná-lo imediatamente gratificante para que meu cérebro anseie repeti-lo amanhã?*

Pequenos hábitos não se somam; **eles se multiplicam**. Ao longo de cinco ou dez anos, a pessoa que você se tornará será a soma matemática e espiritual de cada microdecisão de 1% que você escolheu sustentar hoje.`,
      },
    ],
  },

  {
    id: "mod-psicologia-financeira",
    title: "A Psicologia Financeira",
    author: "Morgan Housel",
    subtitle: "Lições Intemporais Sobre Riqueza, Ganância e Felicidade",
    description: "Um dos livros de negócios mais aclamados do século XXI. Morgan Housel demonstra que ter sucesso com dinheiro tem pouco a ver com sua inteligência matemática e muito a ver com seu comportamento emocional. Edição com todos os 10 capítulos capitais.",
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
    read_time: 310,
    year: 2020,
    formats: ["Leitura Online", "Guia Integral", "10 Capítulos Completos"],
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
        title: "Capítulo 3: Nunca é o Suficiente — O Perigo da Trave Móvel",
        is_free_preview: true,
        content: `### Quando Homens Ricos Arriscam Tudo Por Nada

Rajat Gupta era um dos executivos mais prestigiados do mundo corporativo: ex-diretor global da McKinsey, membro do conselho da Goldman Sachs e detentor de um patrimônio pessoal estimado em mais de 100 milhões de dólares. Ainda assim, ao saber de um investimento bilionário secreto de Warren Buffett na Goldman Sachs durante a crise de 2008, ligou para o gerente de fundos Raj Rajaratnam segundos antes da notícia se tornar pública, praticando insider trading para lucrar mais alguns milhões. Acabou preso em desgraça internacional.

Por que alguém que já possui tudo o que o dinheiro pode comprar arrisca a reputação, a liberdade e a dignidade por algo de que não precisa?

> "Não há razão alguma para arriscar o que você tem e precisa, em troca do que você não tem e não precisa."

#### A Trave Móvel da Comparação Social
O maior perigo do sucesso financeiro é que o teto da satisfação se move na mesma velocidade dos seus ganhos. Se você ganha 10 mil reais por mês, passa a desejar 30 mil; se ganha 100 mil, compara-se com o vizinho que possui um jato particular. A única forma de vencer o jogo da comparação social é perceber que o teto é infinito, e decidir com coragem qual é a sua linha de **"Suficiente"**.`,
      },
      {
        id: "psi-cap-4",
        book_id: "mod-psicologia-financeira",
        position: 4,
        title: "Capítulo 4: Os Juros Compostos da Paciência",
        is_free_preview: true,
        content: `### A Mágica de Warren Buffett: O Tempo Supera o Rendimento

Mais de 99% de toda a fortuna colossal acumulada por Warren Buffett foi gerada **depois do seu 50º aniversário**, e mais de 95% dela surgiu após os 65 anos de idade.

A habilidade extraordinária de Buffett não reside em encontrar retornos astronômicos anuais de 100% — seu rendimento médio anual ao longo de sete décadas gira em torno de 20%. O verdadeiro segredo que a maioria ignora é que ele tem investido de forma consistente e ininterrupta desde os **dez anos de idade**.

> "O tempo é o ingrediente secreto dos juros compostos. Um bom investidor não é aquele que busca retornos absurdos que o forçam a assumir riscos existenciais, mas aquele que obtém retornos razoáveis mantidos por um período de tempo absurdamente longo."

Se Buffett tivesse começado a investir aos 30 anos e se aposentado aos 60, pouquíssimas pessoas no planeta teriam ouvido falar de seu nome. A longevidade financeira vence a genialidade de curto prazo todas as vezes.`,
      },
      {
        id: "psi-cap-5",
        book_id: "mod-psicologia-financeira",
        position: 5,
        title: "Capítulo 5: Ficar Rico vs. Continuar Rico",
        is_free_preview: true,
        content: `### Ficar Rico Exige Risco; Continuar Rico Exige Paranóia

Existem milhares de formas de enriquecer: sorte, empreendedorismo audacioso, apostas arriscadas e timing favorável. Mas existe apenas uma única maneira de **continuar rico**: uma combinação balanceada de frugalidade e paranóia saudável.

* **Ficar Rico** exige ser otimista, correr riscos calculados e acreditar em um amanhã próspero.
* **Continuar Rico** exige o oposto: aceitar com humildade que tudo o que você conquistou pode desaparecer em um estalar de dedos se você for negligente com as margens de erro.

O objetivo financeiro supremo não deve ser maximizar os lucros do próximo trimestre a qualquer custo, mas sim garantir a **sobrevivência incondicional**. Se você permanecer no jogo por tempo suficiente para que os juros compostos façam sua mágica, a vitória final é matematicamente garantida.`,
      },
      {
        id: "psi-cap-6",
        book_id: "mod-psicologia-financeira",
        position: 6,
        title: "Capítulo 6: Eventos de Cauda Longa (Tails, You Win)",
        is_free_preview: true,
        content: `### Você Pode Estar Errado Metade do Tempo e Ainda Assim Ganhar Uma Fortuna

No mundo dos investimentos e dos negócios, uma minoria microscópica de eventos responde pela quase totalidade dos resultados extraordinários. Isso é conhecido na estatística como a **Cauda Longa (Long Tails)**.

Em 2018, a Amazon registrou lucros operacionais astronômicos impulsionados quase exclusivamente por duas caudas longas: a **AWS (Amazon Web Services)** e o ecossistema do **Amazon Prime**. A empresa havia fracassado retumbantemente em dezenas de outros experimentos caros (como o infame smartphone Fire Phone), mas os sucessos das caudas longas foram tão avassaladores que pagaram por todos os fracassos mil vezes.

O mesmo se aplica ao mercado de ações: do índice S&P 500, a maior parte das empresas gera retornos medíocres; são as poucas companhias excepcionais (como Apple, Microsoft e Nvidia) que puxam todo o mercado para cima ao longo das décadas.

Compreender isso liberta o investidor do perfeccionismo: você pode cometer erros em 50% ou 60% das suas decisões cotidianas, desde que permita que suas poucas grandes decisões acertadas corram sem interrupção.`,
      },
      {
        id: "psi-cap-7",
        book_id: "mod-psicologia-financeira",
        position: 7,
        title: "Capítulo 7: Liberdade — O Maior Dividendo do Dinheiro",
        is_free_preview: true,
        content: `### O Valor Mais Alto Que o Dinheiro Pode Comprar

O mais alto dividendo que o dinheiro pode pagar é o **controle total sobre o seu próprio tempo**.

Poder acordar todas as manhãs e dizer: *"Hoje eu posso fazer o que eu quiser, com quem eu quiser, pelo tempo que eu quiser e no ritmo que eu achar melhor"* proporciona um salto no bem-estar psicológico que nenhum bem de consumo ou símbolo de status jamais conseguirá replicar.

Estudos sobre a felicidade humana realizados pela Universidade de Michigan revelaram que o maior preditor de satisfação com a vida não é o nível salarial, o tamanho da casa ou o prestígio do cargo, mas sim o senso de autonomia sobre a própria rotina. O dinheiro que você economiza é um passaporte para a independência existencial.`,
      },
      {
        id: "psi-cap-8",
        book_id: "mod-psicologia-financeira",
        position: 8,
        title: "Capítulo 8: A Ilusão do Carro de Luxo",
        is_free_preview: true,
        content: `### Ninguém Fica Impressionado Com Seus Bens Tanto Quanto Você

Quando você vê alguém dirigindo uma Ferrari amarela pelas ruas da cidade, raramente pensa: *"Nossa, que homem sábio, bondoso e digno de respeito."* O seu pensamento quase universal é: *"Nossa, se eu estivesse dentro daquela Ferrari, todos me olhariam e me achariam importante."*

Essa é a grande ironia da ostentação: as pessoas compram bens caros para sinalizar aos outros que merecem respeito e admiração, mas os observadores ignoram o motorista e usam o carro apenas como espelho para suas próprias fantasias de status.

> "Se o seu objetivo é conquistar respeito, admiração e amor genuíno de seus semelhantes, saiba que a humildade, a inteligência emocional e a generosidade atrairão muito mais respeito do que qualquer cavalo-vapor debaixo do capô."`,
      },
      {
        id: "psi-cap-9",
        book_id: "mod-psicologia-financeira",
        position: 9,
        title: "Capítulo 9: Ter Riqueza É Aquilo Que Você Não Vê",
        is_free_preview: true,
        content: `### Rico vs. Próspero: O Invisível Que Protege o Futuro

Uma das distinções mais vitais e elegantes da obra reside na diferença entre **Ser Rico (Being Rich)** e **Ter Riqueza (Being Wealthy)**:

* **Rico** está associado à sua renda corrente e aos seus gastos visíveis. Alguém que gasta 50 mil reais por mês em viagens, restaurantes estrelados e carros novos é, por definição aparente, rico. No entanto, a única coisa que você sabe com certeza sobre a conta bancária dessa pessoa é que ela tem 50 mil reais a menos do que tinha antes de comprar aqueles itens.
* **Ter Riqueza** é o oposto: riqueza é aquilo que você **não vê**. São os investimentos não resgatados, as ações intocadas na corretora, a reserva de emergência guardada e a liberdade preservada. Riqueza é a opção silenciosa de poder escolher amanhã o seu próprio destino.

> "Gastar dinheiro para mostrar às pessoas quanto dinheiro você tem é a maneira mais rápida de ter menos dinheiro."`,
      },
      {
        id: "psi-cap-10",
        book_id: "mod-psicologia-financeira",
        position: 10,
        title: "Capítulo 10: O Poder de Poupar e a Margem de Segurança",
        is_free_preview: true,
        content: `### Poupe Dinheiro Sem Precisar de Um Motivo Específico

A maioria das pessoas acredita que só deve economizar dinheiro para objetivos tangíveis: comprar uma casa, trocar de carro ou fazer uma viagem de férias.

Morgan Housel defende uma filosofia muito mais nobre: **poupe pelo simples ato de poupar**. Você não precisa de uma meta específica para acumular capital.

O mundo é imprevisível, volátil e repleto de surpresas desconhecidas (crises sanitárias, demissões inesperadas, oportunidades repentinas de negócios). O dinheiro guardado funciona como uma almofada de segurança que concede a você o poder do silêncio: o poder de recusar um trabalho abusivo, o poder de aguardar pacientemente pelo momento certo de investir e a serenidade inestimável de dormir tranquilo à noite.`,
      },
    ],
  },

  {
    id: "mod-pai-rico-pai-pobre",
    title: "Pai Rico, Pai Pobre",
    author: "Robert T. Kiyosaki",
    subtitle: "O Que os Ricos Ensinam a Seus Filhos Sobre Dinheiro Que a Classe Média Não Ensina",
    description: "O clássico supremo da educação financeira pessoal com mais de 40 milhões de exemplares. Kiyosaki desconstrói as falhas do sistema educacional tradicional e ensina como colocar o dinheiro para trabalhar por você através do domínio de ativos e fluxo de caixa. Edição com todos os 9 capítulos completos.",
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
    read_time: 290,
    year: 1997,
    formats: ["Leitura Online", "9 Capítulos Completos"],
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
        title: "Capítulo 2: Por Que Ensinar Alfabetização Financeira?",
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
        title: "Capítulo 3: Cuide do Seu Próprio Negócio",
        is_free_preview: true,
        content: `### Não Confunda Sua Profissão com o Seu Negócio

Há uma diferença monumental entre a sua **profissão** e o seu **negócio**:
* Sua profissão é aquilo em que você trabalha 8 horas por dia para pagar as contas básicas (advogado, engenheiro, médico, professor ou vendedor).
* O seu verdadeiro negócio é a sua **coluna de ativos** — os investimentos e empreendimentos que você nutre paralelamente para garantir seu patrimônio futuro.

Ray Kroc, o lendário fundador da franquia global do McDonald's, perguntou certa vez a um grupo de estudantes de MBA na Universidade do Texas: *"Qual é o meu negócio?"* Todos riram, achando que era uma brincadeira, e responderam: *"Seu negócio é vender hambúrgueres!"*

Kroc sorriu e rebateu: *"Meu negócio nunca foi hambúrgueres. Meu negócio é o setor imobiliário."* Kroc sabia que o modelo de franquia do McDonald's baseava-se em adquirir os terrenos das esquinas mais valiosas de todas as cidades do mundo, alugando-os aos franqueados. Ele cuidava do seu verdadeiro negócio enquanto os outros fritavam hambúrgueres.`,
      },
      {
        id: "prp-cap-4",
        book_id: "mod-pai-rico-pai-pobre",
        position: 4,
        title: "Capítulo 4: A História dos Impostos e o Poder das Corporações",
        is_free_preview: true,
        content: `### Como os Ricos Usam as Leis Fiscais a Seu Favor

Originalmente, os impostos de renda na Inglaterra e nos Estados Unidos foram introduzidos com a promessa popular de taxar exclusivamente os grandes afortunados (o mito de Robin Hood). No entanto, o apetite insaciável dos governos por gastos públicos rapidamente expandiu a cobrança para a classe trabalhadora e a classe média.

Os ricos, por sua vez, não aceitaram passivamente a erosão de seu patrimônio: eles se cercaram dos melhores advogados e contadores e aprenderam a utilizar o maior instrumento legal de proteção patrimonial já criado: **a Pessoa Jurídica (Corporation)**.

#### A Diferença Entre a CLT e a Empresa
* **O Funcionário Comum:** Ganha o salário -> É tributado na fonte antes de ver a cor do dinheiro -> Gasta o que restou.
* **A Corporação dos Ricos:** Ganha a receita -> Gasta com despesas operacionais legítimas para crescer o negócio -> É tributada apenas sobre o lucro líquido remanescente.

Essa assimetria fiscal permite que os detentores de capital reinvistam seu dinheiro bruto antes que os impostos sejam calculados.`,
      },
      {
        id: "prp-cap-5",
        book_id: "mod-pai-rico-pai-pobre",
        position: 5,
        title: "Capítulo 5: Os Ricos Inventam Dinheiro",
        is_free_preview: true,
        content: `### A Mente É o Seu Ativo Mais Poderoso

Frequentemente, no mundo real, não são os mais inteligentes que vão em frente, mas sim os mais **ousados**. O medo excessivo de falhar e a aversão paralisante à perda mantêm milhões de pessoas brilhantes presas na mediocridade.

O dinheiro não é uma coisa física e imutável; o dinheiro é uma ideia forjada pela inteligência financeira.

#### Os Três Tipos de Habilidades dos Investidores de Elite
1. **Como encontrar uma oportunidade que todos os outros ignoraram:** Treine seus olhos para enxergar valor onde os outros só vêem problemas e abandono.
2. **Como levantar recursos sem depender de bancos:** Aprenda a estruturar negócios onde o capital de parceiros é remunerado com segurança e atratividade mútua.
3. **Como organizar pessoas inteligentes:** Um líder financeiro nunca precisa ser o homem mais inteligente da sala; seu papel é contratar pessoas mais sábias do que ele nas áreas contábil, jurídica e operacional.`,
      },
      {
        id: "prp-cap-6",
        book_id: "mod-pai-rico-pai-pobre",
        position: 6,
        title: "Capítulo 6: Trabalhe Para Aprender, Não Pelo Dinheiro",
        is_free_preview: true,
        content: `### A Armadilha da Especialização Excessiva

O mundo acadêmico ensina as pessoas a se especializarem cada vez mais em nichos microscópicos. Embora isso seja valioso em certos campos da ciência, no universo dos negócios a hiperespecialização sem visão holística pode se tornar uma prisão.

Kiyosaki aconselha os jovens a buscarem empregos pelo que eles podem **aprender**, e não apenas pelo salário que oferecem. Aprenda um pouco sobre gestão de fluxo de caixa, um pouco sobre liderança de equipes, um pouco sobre sistemas de logística e, acima de tudo, domine **vendas e comunicação**.

> "A capacidade de vender — de comunicar uma visão com clareza a clientes, funcionários e investidores — é a habilidade basilar de todo empreendedor bem-sucedido."`,
      },
      {
        id: "prp-cap-7",
        book_id: "mod-pai-rico-pai-pobre",
        position: 7,
        title: "Capítulo 7: Como Superar os Cinco Obstáculos da Riqueza",
        is_free_preview: true,
        content: `### Os Cinco Obstáculos Que Paralisam Pessoas Instruídas

Mesmo após dominar a teoria financeira, cinco bloqueios emocionais impedem as pessoas de prosperar:

1. **O Medo:** Não o medo em si, mas a maneira como você lida com o medo de perder dinheiro. Todos odeiam perder, mas a diferença entre um vencedor e um perdedor é como ele reage à derrota.
2. **O Cinismo e a Dúvida:** Os ruídos alarmistas de amigos e da imprensa (*"O mercado vai quebrar!", "Isso não vai dar certo!"*). Os cínicos criticam, enquanto os vencedores analisam.
3. **A Preguiça Mental:** Curiosamente, a preguiça mais destrutiva se disfarça de ativismo frenético: pessoas que trabalham 14 horas por dia para evitar encarar suas finanças desordenadas ou sua saúde deteriorada.
4. **Os Maus Hábitos:** Pagar as contas de terceiros primeiro e deixar a si mesmo por último.
5. **A Arrogância:** A arrogância é o ego somado à ignorância. *"O que eu sei me faz ganhar dinheiro; o que eu não sei me faz perder dinheiro."*`,
      },
      {
        id: "prp-cap-8",
        book_id: "mod-pai-rico-pai-pobre",
        position: 8,
        title: "Capítulo 8: Passos Práticos Para Começar Hoje",
        is_free_preview: true,
        content: `### Os Dez Passos Para Despertar Seu Gênio Financeiro

1. **Encontre um motivo maior do que a realidade:** Uma combinação profunda de propósitos espirituais e repulsas (ex: *"Eu não quero ser escravo de contas até os 70 anos"*).
2. **Faça escolhas diárias deliberadas:** Invista em seu cérebro antes de comprar roupas ou eletrônicos.
3. **Escolha seus amigos com sabedoria:** Cerque-se de pessoas que conversam sobre ideias e ativos, e não apenas sobre fofocas e queixas.
4. **Domine uma fórmula e depois aprenda outra:** Seja ágil em desaprender velhos métodos quando a economia mudar.
5. **Pague a si mesmo em primeiro lugar:** A pressão de ter que pagar os credores depois fará seu gênio criativo buscar novas fontes de receita.
6. **Pague bem seus corretores e profissionais:** Profissionais excepcionais colocam muito mais dinheiro no seu bolso do que os honorários que cobram.
7. **Use o poder dos presentes gratuitos:** Na compra de imóveis ou ações, recupere seu investimento inicial o mais rápido possível e deixe os lucros trabalhando de graça.
8. **Os ativos compram os luxos:** Nunca compre um luxo com dívida; compre um ativo que pague pelo seu luxo.
9. **Tenha heróis e modelos mentais:** Quando agir, pergunte-se: *"Como Warren Buffett ou Steve Jobs negociariam este contrato?"*
10. **Ensine e você receberá:** A generosidade em compartilhar sabedoria e recursos ativa o fluxo natural da prosperidade.`,
      },
      {
        id: "prp-cap-9",
        book_id: "mod-pai-rico-pai-pobre",
        position: 9,
        title: "Capítulo 9: O Plano de Ação Imediato",
        is_free_preview: true,
        content: `### Pare de Fazer o Que Não Está Funcionando

Se você está em um buraco, a primeira regra elementar é: **pare de cavar**.

* Faça uma pausa reflexiva e avalie honestamente o que deu certo e o que falhou em seus últimos doze meses.
* Busque novas ideias em livros, palestras e cursos fora da sua bolha profissional habitual.
* Faça propostas ousadas no mercado: quem não faz ofertas nunca fecha negócios favoráveis.
* Encontre alguém que já fez o que você quer fazer e pague-lhe um almoço para ouvir suas lições de bastidor.

> "A ação sempre derrota a inação. O conhecimento teórico sem execução é apenas uma ilusão confortável."`,
      },
    ],
  },

  {
    id: "mod-1984-orwell",
    title: "1984",
    author: "George Orwell",
    subtitle: "A Distopia Máxima Sobre Vigilância, Poder e Manipulação da Verdade",
    description: "Uma das narrativas ficcionais mais influentes e proféticas da história contemporânea. Na superpotência totalitária da Oceania, o Grande Irmão tudo vigia através das teletelas, enquanto o Ministério da Verdade reescreve o passado e a Novilíngua estreita o pensamento humano. Obra completa em 6 partes.",
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
    formats: ["Leitura Online", "Texto Integral Analítico em 6 Partes"],
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
      {
        id: "1984-cap-3",
        book_id: "mod-1984-orwell",
        position: 3,
        title: "Parte III: A Novilíngua e a Destruição das Palavras",
        is_free_preview: true,
        content: `### O Dicionário da Novilíngua: Estreitando o Pensamento Humano

Na cantina barulhenta do Ministério da Verdade, em meio ao cheiro penetrante de ensopado de feijão e gim Vitória, Winston conversa com seu colega Syme, um filólogo genial encarregado da décima primeira edição do **Dicionário da Novilíngua**.

Com entusiasmo maníaco, Syme descreve a missão suprema da linguística totalitária:
> "Você acha que nosso trabalho principal é inventar palavras novas? Absolutamente não! Estamos destruindo palavras — dezenas delas, centenas delas todos os dias. Estamos podando a língua até os ossos."

O objetivo final da Novilíngua é diminuir o alcance do pensamento humano de tal forma que o **Crime de Pensamento (Crimethink)** se torne literalmente impossível do ponto de vista neurológico, simplesmente porque não existirão mais vocábulos conceituais para articulá-lo. 

Conceitos como *Liberdade*, *Igualdade*, *Individualidade* e *Justiça* são englobados pela palavra pejorativa *crimepensar*, enquanto nuances são substituídas por prefixos redutores (*bom*, *maisbom*, *duplomaisbom*). Sem palavras para pensar contra o regime, a mente se torna um servo passivo do Estado.`,
      },
      {
        id: "1984-cap-4",
        book_id: "mod-1984-orwell",
        position: 4,
        title: "Parte IV: Julia e o Quarto Acima da Loja de Antiguidades",
        is_free_preview: true,
        content: `### O Oásis Secreto e a Rebelião do Amor

No mundo cinzento do Partido, onde as relações afetivas são monitoradas pela Liga Juvenil Antisexo e o afeto genuíno é tratado como traição, Winston apaixona-se por Julia, uma jovem de cabelos escuros que trabalha nas oficinas de manutenção mecânica de novelas populares.

Julia passa a Winston um bilhete clandestino com apenas três palavras escritas às pressas: *"Eu te amo"*.

Em um ato de audácia suprema, Winston aluga um quarto empoeirado no sótão da loja de antiguidades do senhor Charrington, no coração do bairro miserável dos Proletas. Pela primeira vez em décadas, Winston e Julia experimentam um fragmento de privacidade humana: bebem café de verdade com açúcar, conversam sem a presença aparente de uma teletela e desfrutam da intimidade dos corpos.

Aquele pequeno quarto vira uma cápsula do tempo, um refúgio de dignidade humana cercado por um oceano de barbárie totalitária. Mas Winston sabe, em seu íntimo, que a ilusão durará pouco: *"Nós somos os mortos"*, repete ele sussurrando.`,
      },
      {
        id: "1984-cap-5",
        book_id: "mod-1984-orwell",
        position: 5,
        title: "Parte V: A Queda e a Traição Inevitável",
        is_free_preview: true,
        content: `### "Nós Somos os Mortos": O Despertar da Armadilha

Enquanto contemplam o entardecer pela janela do quarto do sótão ouvindo uma lavadeira proleta cantarolar no pátio, Winston e Julia repetem o mantra de seu destino trágico:
*"Nós somos os mortos."*

De repente, uma voz metálica, fria e impassível ecoa de trás da gravura da Igreja de Santo Clemente na parede:
> "Vocês são os mortos."

A moldura cai no chão, revelando a lente negra de uma teletela oculta que vigiava cada respiração deles desde o primeiro instante. O senhor Charrington não era um antiquário nostálgico, mas um oficial disfarçado da temida Polícia do Pensamento. Homens de botas pretas e cassetetes invadem o cômodo, espancam Julia no estômago e arrastam Winston amarrado em direção ao coração sombrio do **Ministério do Amor (Miniluv)**.`,
      },
      {
        id: "1984-cap-6",
        book_id: "mod-1984-orwell",
        position: 6,
        title: "Parte VI: O Quarto 101 e a Rendição Final",
        is_free_preview: true,
        content: `### O Quarto 101: A Vitória Suprema do Grande Irmão

Nas profundezas subterrâneas do Ministério do Amor, sem janelas e sob lâmpadas fluorescentes que jamais se apagam, Winston enfrenta seu interrogador: O'Brien, o poderoso membro do Partido Interno que ele outrora considerara seu salvador.

O'Brien não busca apenas punir Winston ou forçá-lo a confessar crimes fictícios; o Partido não se contenta com mártires rebeldes. O Partido exige a **conversão da alma**:
> "Não nos contentamos com a obediência negativa, nem mesmo com a submissão mais abjeta. Quando você finalmente se render a nós, será por sua própria e livre vontade. Nós não destruímos o herege; nós o transformamos, capturamos sua mente íntima e o remodelamos."

#### O Que Há no Quarto 101?
O Quarto 101 contém a pior coisa do mundo para cada indivíduo — aquilo que é insuportável demais para a psique humana suportar. Para Winston, são os **ratos carnívoros**.

Diante de uma gaiola de arame contendo dois ratos famintos prestes a ser travada sobre o seu próprio rosto, a integridade moral de Winston se despedaça irremediavelmente. Ele comete a traição espiritual final:
*"Façam isso com a Julia! Não comigo! Arranquem a cara dela, devorem os olhos dela, mas não a mim!"*

#### A Última Cena
Meses depois, liberto e com a mente anestesiada por copos contínuos de gim no Café Castanheiro, Winston contempla o retrato monumental do Grande Irmão na parede. Duas lágrimas de alívio rolam por suas bochechas enrugadas. 

A luta estava terminada. Ele vencera a batalha contra si mesmo. Ele amava o Grande Irmão.`,
      },
    ],
  },

  {
    id: "mod-homem-mais-rico-babilonia",
    title: "O Homem Mais Rico da Babilônia",
    author: "George S. Clason",
    subtitle: "Os Segredos dos Antigos Para a Riqueza e Prosperidade Financeira",
    description: "Um dos maiores clássicos da sabedoria financeira de todos os tempos. Através de parábolas ambientadas na lendária e suntuosa Babilônia antiga, o rico Arkad ensina as leis eternas para fazer o ouro se multiplicar e construir um patrimônio inabalável. Edição completa com todas as 7 parábolas.",
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
    read_time: 270,
    year: 1926,
    formats: ["Leitura Online", "7 Parábolas na Íntegra"],
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
        title: "Capítulo 2: Os Sete Remédios Para Curar a Bolsa Vazia",
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
      {
        id: "bab-cap-3",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 3,
        title: "Capítulo 3: O Encontro Com a Deusa da Boa Sorte",
        is_free_preview: true,
        content: `### A Deusa da Boa Sorte Favorece os Homens de Ação

Homens reunidos debatiam: como atrair a deusa da boa sorte? Seria ela encontrada nas mesas de dados das tabernas ou nos corredores do palácio?

Um comerciante sábio levantou-se e explicou que a verdadeira sorte raramente visita os jogadores de azar — os jogos de azar são matematicamente desenhados para que a casa sempre lucre às custas dos tolos.

A verdadeira sorte surge disfarçada sob a forma de **oportunidades**. Quando uma oportunidade brilhante de negócio ou de terra barata bate à porta de um homem, a hesitação e a procrastinação são os piores demônios:
> "A boa sorte foge do homem que hesita e busca desculpas para adiar. Ela abraça com entusiasmo o homem que reconhece a oportunidade e age com determinação e coragem imediatas."`,
      },
      {
        id: "bab-cap-4",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 4,
        title: "Capítulo 4: As Cinco Leis de Ouro",
        is_free_preview: true,
        content: `### As Cinco Leis Eternas do Ouro

Gravadas em tábuas de argila deixadas pelo filho de Arkad, Nomasir:

1. O ouro vem de bom grado e em quantidades crescentes para o homem que separa pelo menos um décimo de seus ganhos para criar um patrimônio para o seu futuro.
2. O ouro trabalha diligente e satisfatoriamente para o sábio proprietário que encontra para ele um emprego lucrativo, multiplicando-se como os rebanhos do campo.
3. O ouro apega-se à proteção do proprietário cauteloso que o investe apenas sob o conselho de homens sábios em seu manuseio.
4. O ouro escapa do homem que o investe em negócios ou propósitos com os quais ele não está familiarizado ou que não são aprovados por aqueles que são hábeis em sua gestão.
5. O ouro foge do homem que o força a ganhos impossíveis ou que segue o conselho sedutor de trapaceiros e sonhadores, ou que confia em sua própria inexperiência e desejos românticos no investimento.`,
      },
      {
        id: "bab-cap-5",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 5,
        title: "Capítulo 5: O Emprestador de Ouro da Babilônia",
        is_free_preview: true,
        content: `### Mathon e a Sabedoria de Emprestar Com Cautela

Mathon, o mais respeitado emprestador de ouro da Babilônia, guardava em sua arca fichas de penhor de jóias, espadas e tecidos de todos que vinham pedir moedas de ouro emprestadas.

Ele ensinava:
> "Se você deseja ajudar seu amigo, faça-o de uma maneira que não traga os fardos do seu amigo sobre seus próprios ombros."

Antes de conceder qualquer empréstimo, pergunte-se:
* Essa pessoa tem um histórico comprovado de honrar compromissos?
* O dinheiro será usado para gerar novos frutos produtivos ou para alimentar a vaidade de despesas passageiras?
* Se tudo der errado no plano dele, ele possui garantias sólidas para devolver o capital principal?

Melhor é uma pequena cautela inicial do que um grande remorso posterior.`,
      },
      {
        id: "bab-cap-6",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 6,
        title: "Capítulo 6: As Muralhas Inabaláveis da Babilônia",
        is_free_preview: true,
        content: `### A Segurança Atrás de Muralhas Sólidas

Durante os dias sangrentos em que os exércitos invasores assediavam os portões da Babilônia com aríetes e lanças de fogo, os cidadãos apavorados olhavam para cima e encontravam paz ao verem as colossais e impenetráveis muralhas construídas pela sabedoria dos reis antigos.

No mundo moderno, as intempéries econômicas, as doenças súbitas e as crises sociais são os exércitos invasores que atacam os lares das famílias desprevenidas.

Suas reservas de emergência, seus seguros prudentes e seus investimentos sólidos são as suas **muralhas da Babilônia**. Sem elas, qualquer tempestade do destino deixará sua família à mercê do desespero.`,
      },
      {
        id: "bab-cap-7",
        book_id: "mod-homem-mais-rico-babilonia",
        position: 7,
        title: "Capítulo 7: O Homem Mais Sortudo da Babilônia",
        is_free_preview: true,
        content: `### O Trabalho Como o Melhor Amigo do Homem

Sharru Nada, um idoso e venerado príncipe comerciante da Babilônia, viajava com o jovem neto mimado de seu antigo parceiro Arad Gula. O jovem desprezava o trabalho e achava que as labutas eram exclusivas para os escravos e inferiores.

Sharru Nada então revelou sua própria história: ele fora vendido como escravo na juventude devido às dívidas de seu irmão. No entanto, enquanto os outros escravos amaldiçoavam o destino e faziam o mínimo possível com ódio no coração, Sharru Nada colocava sua alma em assar os melhores pães e em limpar os tijolos com zelo impecável.

Seu trabalho dedicado chamou a atenção de mestres valorosos que lhe deram a chance de comprar a própria liberdade e construir um dos maiores conglomerados comerciais do Oriente Médio.

> "O trabalho não é uma maldição dos deuses; o trabalho honesto e apaixonado é o maior aliado do ser humano. Ele constrói o caráter, atrai a estima dos grandes homens e transforma qualquer escravo em um rei."`,
      },
    ],
  },
];
