# Documento de Design System: Editorial de Alto Padrão

## 1. Visão Geral e Norte Criativo
**Norte Criativo: "O Gastrônomo Sensorial"**

Este design system vai além das restrições funcionais de um blog padrão para criar um "atelier digital" de crítica culinária. Estamos nos distanciando da estética de "template" ao adotar a **Assimetria Editorial**. O layout deve transmitir a sensação de uma revista física de luxo, onde o espaço em branco é um privilégio e a tipografia carrega o peso da autoridade.

Ao utilizar o bordô rico e o bege quente, evocamos a atmosfera de uma adega à luz de velas e linho fino. O design quebra a grade rígida através de elementos sobrepostos, escala tipográfica intencional e uma abordagem de "Camadas Tonais" que substitui as linhas tradicionais por profundidade e luz.

---

## 2. Cores e Filosofia de Superfície
A paleta está enraizada na herança do crítico gastronômico brasileiro — sofisticada, acolhedora e perspicaz.

### A Regra do "Sem Linhas"
**Mandato Estrito:** Designers estão proibidos de usar bordas sólidas de 1px para definir seções. Os limites do layout devem ser estabelecidos através de:
1. **Mudanças de Cor de Fundo:** Transição de `surface` (#fff9ec) para `surface-container-low` (#fcf3da).
2. **Padding Generoso:** Uso da Escala de Espaçamento para criar "ilhas" de conteúdo.
3. **Transições Tonais:** Mudanças sutis de matiz para separar a barra lateral do feed editorial principal.

### Hierarquia de Superfície e Aninhamento
Trate a interface como camadas físicas de papelaria fina.
* **Base:** `surface` (#fff9ec) é a tela principal.
* **Camada 1:** `surface-container` (#f6eed5) para blocos de conteúdo secundário.
* **Camada 2 (O Destaque):** Use `surface-container-lowest` (#ffffff) para cards em destaque para criar um efeito de "brilho iluminado" contra o fundo bege.

### A Regra de Vidro e Gradiente
Para evitar um visual digital "plano":
* **Glassmorphism:** Use valores semi-transparentes de `surface-container` com um `backdrop-blur` (12px–20px) para barras de navegação e elementos de ação flutuantes.
* **Texturas de Assinatura:** Aplique um gradiente linear sutil de `primary` (#63042c) para `primary-container` (#812042) em CTAs de alto impacto para adicionar uma profundidade "aveludada".

---

## 3. Tipografia
A tipografia é um diálogo entre a autoridade tradicional do crítico e o ritmo moderno das mídias digitais.

* **Display & Headline (Newsreader):** Esta serifada é a nossa "Voz do Crítico". Use-a para títulos de artigos e citações (pull-quotes). Deve parecer cara e deliberada. Use `display-lg` para títulos principais que dominam o viewport.
* **Corpo & Etiquetas (Manrope):** Esta sans-serif traz a "Clareza Moderna". Ela garante que críticas longas sejam altamente legíveis.
* **Dica de Hierarquia:** Combine um título `display-md` (Newsreader) com uma etiqueta de categoria `label-md` (Manrope) em caixa alta com espaçamento entre letras de 0.1em para alcançar um cabeçalho no estilo "Vogue".

---

## 4. Elevação e Profundidade
Evitamos sombras projetadas tradicionais em favor do **Camadeamento Tonal**.

* **O Princípio de Camadas:** A profundidade é alcançada pelo empilhamento. Um card em `surface-container-lowest` colocado sobre uma seção `surface-container-low` cria uma elevação natural sem um único pixel de sombra preta.
* **Sombras Ambientes:** Se um elemento flutuante (como um pop-over de newsletter) exigir uma sombra, ele deve usar o estilo "Ambiente":
    * **Cor:** Uma versão com 10% de opacidade de `on-surface-variant` (#554246).
    * **Desfoque (Blur):** 40px–60px.
    * **Difusão (Spread):** -5px para mantê-la suave e natural.
* **A Alternativa de Borda Fantasma:** Para estados interativos (como um input focado), use uma "Borda Fantasma": `outline-variant` com 20% de opacidade.

---

## 5. Componentes

### Botões
* **Primário:** Fundo `primary`, texto `on-primary`. Formato: `xl` (0.75rem). Sem borda. Use um gradiente sutil de brilho interno para uma sensação tátil.
* **Terciário (Link Editorial):** Texto `primary` com sublinhado de 2px em `primary-fixed-dim`, deslocado em 4px. Sem fundo.

### Cards e Listas
* **Proibição de Divisores:** Nunca use uma linha horizontal para separar posts do blog. Em vez disso, use uma mudança de fundo para `surface-container-high` ou simplesmente aumente o preenchimento vertical para 64px entre os itens.
* **Tratamento de Imagem:** A fotografia gastronômica deve usar cantos arredondados `md` e, onde possível, quebrar a borda do container (sobreposição assimétrica) para parecer "curadoria".

### Campos de Entrada (Inputs)
* **Estilização:** Use `surface-container-highest` para o fundo do campo. O rótulo (label) deve ser `label-md` em `on-surface-variant`.
* **Estado de Foco:** Mude o fundo para `surface-container-lowest` e aplique uma "Borda Fantasma" de 1px.

### Componente de Assinatura: A "Nota do Crítico"
Um box de destaque especializado para resumos.
* **Estilo:** Fundo `surface-variant`, apenas borda esquerda (4px de largura) em `secondary` (#006b59). Tipografia: `title-md` (Manrope).

---

## 6. O que Fazer e o que Não Fazer

### Fazer (Do)
* **Use** espaços em branco extremos (80px–120px) entre as seções principais para deixar a fotografia gastronômica respirar.
* **Use** a cor `secondary` (#006b59) com moderação como um detalhe "orgânico" — reservado para avaliações, notas relacionadas a ervas ou ingredientes frescos.
* **Privilegie** layouts assimétricos (ex: uma grade de 2 colunas onde a coluna da esquerda tem 60% de largura e a direita tem 30% com um intervalo de 10%).

### Não Fazer (Don't)
* **Não use** preto puro (#000000) para o texto. Use sempre `on-surface` (#1f1c0c) para manter o calor da paleta bege.
* **Não use** os cards "elevados" padrão do Material Design com sombras pesadas. Eles parecem "tecnológicos", não "elegantes".
* **Não use** o verde-azulado `secondary` para fundos grandes. Ele deve permanecer como uma "guarnição" para o "prato principal" bordô.