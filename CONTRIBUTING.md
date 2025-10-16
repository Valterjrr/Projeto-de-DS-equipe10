# 🧭 Diretrizes de Contribuição

Bem-vindo(a) ao repositório da AId Curriculum!

Este documento descreve como contribuir de forma organizada e padronizada com o projeto.

Ao contribuir para este repositório, discuta primeiro a alteração que deseja fazer por meio de uma issue ou qualquer outro método com os proprietários deste repositório antes de fazer a alteração.


## 🧩 Fluxo de Colaboração

Este projeto segue o **Git Flow**, modelo de ramificação que organiza o desenvolvimento em etapas bem divididas.

### 🔹 Estrutura de branches

- `main`: contém o código em produção.  
- `develop`: branch principal de desenvolvimento.  
- `feature/*`: para novas funcionalidades.  
- `bugfix/*`: para correções pontuais.  
- `release/*`: preparação de versões.  
- `hotfix/*`: correções urgentes em produção.

### 🔹 Como contribuir

1. **Crie uma issue** descrevendo o problema, melhoria ou funcionalidade desejada.
2. **Associe a issue** a uma branch (exemplo: `feature/login-page`).
3. **Implemente as alterações** seguindo as convenções abaixo.
4. **Abra um Pull Request (PR)** direcionado à branch `develop`.
5. **Espere a revisão** de outro membro do grupo antes do merge.



## 🧱 Convenções de Nomes

### 🔸 Branches
Padrão: `tipo/nome-descritivo`

### 🔸 Commits

Usamos [**Conventional Commits**](https://www.conventionalcommits.org/en/v1.0.0/), para manter o histórico limpo e semântico.

Formato: `<tipo>(escopo): descrição breve`


Tipos comuns:
- `feat`: nova funcionalidade  
- `fix`: correção de bug  
- `docs`: alterações na documentação  
- `style`: formatação, identação, espaços etc.  
- `refactor`: refatoração sem alterar funcionalidade  
- `test`: adição ou correção de testes  
- `chore`: mudanças em tarefas de build ou dependências  


## ✅ Checklist Antes de Submeter o Código

Antes de abrir um PR, verifique:

### ⚙️ Configuração e Ambiente
- Eu **li e entendi** as Diretrizes de Contribuição.
- Minha branch está atualizada com a branch `develop`.
- Eu instalei todas as dependências do projeto.

### 📝 Código
- Meu código segue as **convenções de estilo** do projeto (ex: padrões de formatação, nomes de variáveis, etc.).
- Meu código foi **testado localmente** e funciona como esperado.
- Se houver testes de unidade/integração, eu os **executei e eles passaram** (ou adicionei novos testes, se aplicável).
- Se adicionei novos recursos, eu **adicionei ou atualizei a documentação** relevante (código, READMEs, etc.).
- Eu **removi qualquer código de depuração** (ex: `console.log()`, `print()`, `debugger`) que não deveria estar na submissão final.

### 💬 Pull Request (PR)
- O título do meu PR é **claro, conciso e descritivo**.
- A descrição do meu PR **explica o problema que está resolvendo ou o recurso que está adicionando**.
- Eu **preenchi o template de Pull Request** (se o projeto utiliza um).
- Minhas *commits* estão **bem formatadas** e seguem as [Convenções de Commit](https://www.conventionalcommits.org/en/v1.0.0/) (ajuste o link conforme necessário).


## ⚙️ Configuração do Projeto Localmente

1.  **Instalar Dependências:**
    Execute o comando abaixo para instalar todas as dependências do projeto definidas no `package.json`:

    ```bash
    npm install
    # se usar yarn: yarn install
    ```

2.  **Iniciar o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    ```

Além disso, também recomendamos a criação e o uso de um ambiente virtual para evitar conflitos de versões de pacotes em seu sistema operacional:

1.  **Criação do Ambiente Virtual (`venv`):**

    ```bash
    python -m venv venv
    ```

2.  **Ativação do Ambiente Virtual:**

    | Sistema Operacional | Comando de Ativação |
    | :--- | :--- |
    | **Windows (PowerShell)** | `.\venv\Scripts\activate` |
    | **Windows (CMD)** | `.\venv\Scripts\activate.bat` |
    | **MacOS / Linux** | `source venv/bin/activate` |

3.  **Instalação de Dependências:**
    Com o ambiente virtual ativado, instale as dependências listadas no arquivo `requirements.txt`:

    ```bash
    pip install -r ./requirements.txt
    ```

4.  **Desativação do Ambiente Virtual:**
    Quando terminar de trabalhar no projeto, você pode desativar o ambiente virtual a qualquer momento:

    ```bash
    deactivate
    ```