# Expansão Integral de Capítulos de Livros e Índice Numerado com Busca Rápida

Plano para expandir todos os livros do catálogo com capítulos e módulos completos e profundos, além de introduzir navegação por índice numerado, busca em tempo real de capítulos e atalhos de salto direto no leitor.

---

## Revisão do Usuário e Decisões Críticas

> [!IMPORTANT]
> Decisões confirmadas a partir das respostas do usuário:
> 1. **Escopo dos Capítulos**: Expandir todos os capítulos e módulos dos livros modernos para uma experiência completa e robusta (em vez de apenas resumos de 3 ou 4 tópicos), estruturando análises aprofundadas, conceitos práticos, passos acionáveis e estudos de caso capítulo a capítulo.
> 2. **Navegação de Capítulos**: Implementar um índice numerado elegante com barra de busca rápida em tempo real e saltos diretos entre partes/capítulos, tanto na tela de detalhes do livro quanto no leitor web.
> 3. **Conformidade de Direitos Autorais**: Livros contemporâneos recebem módulos e capítulos analíticos completos e detalhados com conceitos originais explicados e sintetizados; livros clássicos de domínio público (Machado de Assis, Camões, Eça de Queirós, Verne) mantêm o texto integral com todos os 100+ capítulos originais.

---

## 1. Visão Geral e Conceito Central

- **O que faz**: Transforma a aba "Livros" (`/livros`) em uma biblioteca densa, satisfatória e completa. Cada livro moderno passa a ter entre 8 a 18 capítulos/módulos detalhados, com textos substanciais, subtítulos, reflexões aplicadas e lições centrais.
- **Público-alvo**: Leitores e estudantes que desejam estudar livros modernos de negócios, finanças, hábitos, produtividade e psicologia sem encontrar livros "vazios" ou incompletos.
- **Valor agregado**: Elimina a sensação de catálogo superficial, oferecendo uma esteira completa de leitura onde cada capítulo possui conteúdo enriquecido, tempo estimado de leitura e busca instantânea no sumário.

---

## 2. Experiência do Usuário e Design Visual

### Fluxos Principais
1. **Exploração no Catálogo (`/livros`)**:
   - Cada card exibe a contagem real de capítulos (ex: `16 Capítulos Completos`, `148 Capítulos`).
   - Usuário sabe imediatamente a densidade do livro antes de abrir.
2. **Página de Detalhes do Livro (`/livros/:id`)**:
   - Campo de busca instantânea no índice ("Buscar por nome ou número do capítulo...").
   - Barra de atalhos rápidos para saltos (ex: `Cap. 1-5`, `Cap. 6-10`, `Cap. 11-15`, `Cap. 16+`).
   - Lista numerada com título claro, tempo de leitura estimado de cada capítulo e botão direto "Ler".
3. **Leitor Digital (`/ler/:id`)**:
   - Gaveta/modal do índice com busca instantânea e indicador do capítulo atual.
   - Navegação inferior com botões "Capítulo Anterior" e "Próximo Capítulo" em destaque.
   - Porcentagem de leitura sincronizada e persistida no navegador.

### Identidade Visual e Tipografia
- **Tipografia**: `DM Sans` para controles de navegação e metadados; fontes serifadas clássicas (`Lora` / `Georgia`) e sans modernas configuráveis no leitor para conforto visual.
- **Paleta de Cores**: Respeita os 4 temas de leitura existentes (Claro, Sépia, Escuro, Noturno OLED).
- **Sem Pílulas Estáticas**: Metadados limpos com separadores tipográficos (`·` e `/`), mantendo botões funcionais para filtros e saltos.

---

## 3. Decisões do Produto e Trade-offs

- **Decisão 1: Expansão Massiva em `src/lib/modernBooks.ts`**
  - *Abordagem*: Substituir as versões de 3 capítulos por estruturas completas de 8 a 18 capítulos por obra para todos os 11 livros modernos (*Hábitos Atômicos*, *Pai Rico Pai Pobre*, *A Psicologia Financeira*, *O Homem Mais Rico da Babilônia*, *O Poder do Hábito*, *Comece Pelo Porquê*, *Essencialismo*, *Roube Como um Artista*, *As Leis da Natureza Humana*, *Os Segredos da Mente Milionária*, *Antifrágil*).
  - *Motivo*: Atende diretamente a queixa do usuário de que os livros estão "meio vazios" e faltam muitos capítulos.
- **Decisão 2: Busca Rápida e Saltos Diretos no Leitor e Detalhes**
  - *Abordagem*: Um input de filtro em tempo real acoplado a botões de salto por blocos numéricos.
  - *Motivo*: Facilita encontrar e reler capítulos específicos em livros com mais de 15 capítulos sem precisar de rolagem exaustiva.

---

## 4. Arquitetura Técnica e Estratégia de Dados

```
┌─────────────────────────────────────────────────────────────┐
│                       CATÁLOGO WORCOI                       │
│      modernBooks.ts (8 a 18 capítulos completos/livro)      │
│      gutenbergBooks.ts (Obras clássicas integrais 100+ cap) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────┴──────────────────────────────┐
│                    HOOKS DE DADOS & BUSCA                   │
│         useBook(id)  ·  useChapters(id)  ·  useContents()   │
└──────────────────────────────┬──────────────────────────────┘
                               │
            ┌──────────────────┴──────────────────┐
            ▼                                     ▼
┌──────────────────────────────┐    ┌──────────────────────────────┐
│       BookDetail.tsx         │    │          Reader.tsx          │
│ • Busca em tempo real        │    │ • Modal de índice com filtro │
│ • Atalhos de salto (1-5, ...)│    │ • Saltos diretos numéricos   │
│ • Lista completa numerada    │    │ • Próximo/Anterior com toast │
└──────────────────────────────┘    └──────────────────────────────┘
```

### Arquivos a Modificar
1. `src/lib/modernBooks.ts`:
   - Expandir todos os 11 livros para conter todos os seus capítulos estruturais autênticos com textos substanciais, conceitos chave, metodologias e exercícios.
2. `src/pages/BookDetail.tsx`:
   - Adicionar campo de busca rápida de capítulos.
   - Adicionar botões de salto numérico direto.
   - Exibir tempo de leitura individual e resumo de cada capítulo.
3. `src/pages/Reader.tsx`:
   - Enriquecer o modal de capítulos com busca e atalhos diretos.
   - Melhorar os rodapés de transição de capítulo.
4. `src/components/books/BookGridCard.tsx`:
   - Destacar com precisão o número de capítulos completos do livro.

---

## Próximos Passos
Após a aprovação deste plano, iniciaremos a expansão do catálogo de capítulos e a implementação da interface de busca e salto direto.
