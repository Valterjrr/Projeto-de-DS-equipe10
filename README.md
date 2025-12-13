# 📄 AId Curriculum

O AId Curriculum é projeto que utiliza **Inteligência Artificial** para auxiliar na criação de **currículos profissionais personalizados**, de forma prática, rápida e inteligente.

Com ele, o usuário fornece informações básicas sobre a vaga desejada, experiência, formação e habilidades e o sistema gera automaticamente um currículo estruturado, personalizado e extremamente competitivo para o mercado de trabalho!

## ✨ Funcionalidades

- 🧾 **Análise de currículos** já criados anteriormente  
- 🧑‍💼 **Personalização** de campos e seções (experiência, educação, habilidades, etc.) com IA
- 💾 **Exportação em PDF e DOCX** do currículo final  
- 🔍 **Sugestões de melhorias** para o texto do currículo
- 📊 **Score próprio** de adequação do currículo com os requisitos da vaga
- 📚 **Recomendações de aprendizado** e desenvolvimento de atributos


## 💻 Tecnologias Utilizadas

Este projeto é construído com as seguintes tecnologias, divididas em Front-end e Back-end:

### 🚀 Front-end

| Categoria | Tecnologia | Descrição |
| :--- | :--- | :--- |
| **Linguagem** | **TypeScript** | Superconjunto do JavaScript para segurança e escalabilidade do código. |
| **Framework UI** | **React** | Biblioteca principal para a construção da interface de usuário, baseada em componentes. |
| **Base** | **HTML5/CSS3** | A fundação padrão para a estrutura e o estilo de toda a aplicação web. |
| **Build Tool** | **Vite** | Ferramenta de build moderna e rápida, usada tanto para o desenvolvimento local quanto para o empacotamento em produção. |
| **Gerenciador** | **npm** | Utilizado para instalar e gerenciar todas as dependências e *scripts* do projeto. |

### 🧠 Back-end
Estamos organizando nosso Back-end em um repositório a parte! Confira o nosso progresso [nesse link](https://github.com/LugiaKB/aid_curriculum_backend).

## Arquitetura do Projeto

```
├── 📁 .github
│   └── 📁 workflows
│       └── ⚙️ ci.yml                   // Configuração do ambiente de testes automatizados
├── 📁 src
│   ├── 📁 pages                        // Páginas da aplicação
│   │   ├── 📁 CVBuilderWizard
│   │   ├── 📁 CompatibilityPage
│   │   ├── 📁 FinalReviewPage
│   │   ├── 📁 HomePage
│   │   ├── 📁 NewCVTypePage
│   │   └── 📁 StartPage
│   ├── 📁 routes                       // Define todas as rotas da aplicação
│   ├── 📁 services                     // Lógica de comunicação e interação com a API
│   ├── 📁 shared_components            // Componentes reutilizáveis
│   │   ├── 📁 BackButton
│   │   ├── 📁 FormActions
│   │   ├── 📁 Header
│   │   ├── 📁 Modal
│   │   ├── 📁 OptionCard
│   │   ├── 📁 PageCardLayout
│   │   ├── 📁 RouteTransitionWrapper
│   │   └── 📁 Title
│   ├── 📁 store
│   ├── 📁 styles
│   ├── 📁 types
│   ├── 📁 utils
│   ├── 📄 App.tsx                      // Contém o layout global da aplicação
│   ├── 🎨 index.css
│   ├── 📄 main.tsx                     // Renderiza o componente principal App
│   └── 📄 setupTests.ts
├── ⚙️ .eslintrc.cjs
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 CONTRIBUTING.md
├── 📄 LICENSE
├── 📝 README.md
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ tsconfig.json
├── ⚙️ vercel.json
└── 📄 vite.config.ts
```

## Fluxo da Aplicação

1.  O usuário acede à `HomePage` (rota `/`).
2.  Ao clicar em "Criar meu currículo grátis", é navegado para a `StartPage` (rota `/start`).
3.  Na `StartPage`, o usuário escolhe "Comece do zero", que navega para `/new-cv`.
4.  O usuário é levado para a `NewCVTypePage` (rota `/new-cv`).
5.  Nesta página, ele decide entre:
    * **"Currículo Genérico"**: Navega para `/new-cv/builder` com o estado `state: { isOptimized: false }`.
    * **"Currículo Personalizado"**: Navega para `/new-cv/builder` com o estado `state: { isOptimized: true }`.
6.  A `CVBuilderWizard` (rota `/new-cv/builder`) é renderizada.
7.  O Wizard filtra os passos a exibir com base no estado `isOptimized`. Se `isOptimized: true`, o primeiro passo é `JobDescriptionStep`. Caso contrário, começa com `PersonalInfoStep`.
8.  O usuário preenche os formulários de cada etapa (Informações Pessoais, Experiência, Habilidades, Educação). A cada "Próximo", o estado `cvRequest` é atualizado.
9.  Na última etapa, o botão "Gerar Currículo" chama `handleNext`, que por sua vez chama `submitCVRequest(newCvRequest)`.
10. O `resumeService` envia os dados para o back-end e recebe um `CVResponse`.
11. Com a resposta, o `CVBuilderWizard` decide para onde navegar:
    * Se `isOptimized: true`, navega para a `CompatibilityPage` (`/analysis`), passando os dados da análise.
    * Se `isOptimized: false`, navega diretamente para a `FinalReviewPage` (`/final-review`).
12. Na `CompatibilityPage` (`/analysis`), o usuário vê o *score* e pode navegar pelas abas (Habilidades, Sugestões, Aprendizado). Ao clicar em "Revisar Currículo", é levado para a `FinalReviewPage`.
13. Na `FinalReviewPage` (`/final-review`), o usuário pode alternar entre "Edição" e "Prévia". Na aba "Edição", ele pode selecionar seções específicas (Resumo, Experiência, etc.) para refinar o texto gerado pela IA.
14. O usuário clica em "Gerar PDF para Download".


## Testes automatizados

O front-end utiliza **Vitest** para testes unitários e de componentes, integrado com **React Testing Library**.

* **Configuração**: O arquivo `vite.config.ts` define o ambiente de teste e `src/setupTests.ts` importa matchers como `@testing-library/jest-dom`.
* O workflow em `.github/workflows/ci.yml` executa `npm test` (que roda `vitest`) automaticamente em pushes e pull requests para as branches `main` e `develop`, promovendo uma Integração Contínua (CI) do projeto.


## ⚙️ Como Executar o Projeto

Todas as instruções detalhadas para configurar o ambiente de desenvolvimento, incluindo a instalação de dependências (tanto Node.js quanto Python) e a criação/ativação do ambiente virtual (`venv`), estão localizadas em nosso arquivo de [**Diretrizes de Contribuição (CONTRIBUTING.md)**](./CONTRIBUTING.md).

## 🚀 Deploy

O projeto possui configuração predefinida para o **Vercel** no arquivo \`vercel.json\`.

### Para realizar o deploy automático
1. Crie uma conta no [Vercel](https://vercel.com).
2. Importe este repositório do GitHub.
3. As configurações de build serão detectadas automaticamente.
4. O deploy será atualizado automaticamente a cada push na branch \`main\`.

### Para realizar o deploy manual:
Se preferir usar a CLI do Vercel:
\`\`\`bash
npm i -g vercel
vercel
\`\`\`

## 🤝 Como Contribuir

Contribuições são muito bem-vindas!  
Siga o guia de contribuição disponível em [CONTRIBUTING.md](./CONTRIBUTING.md).


---
Desenvolvido por [ado](ado@cin.ufpe.br), [gtcb](gtcb@cin.ufpe.br), [gls8](gls8@cin.ufpe.br), [hnb](hnb@cin.ufpe.br), [lecs2](lecs2@cin.ufpe.br), [mlba](mlba@cin.ufpe.br) e [vbrj](vbrj@cin.ufpe.br).