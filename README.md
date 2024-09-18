# ProdutosApp

O **ProdutosApp** é uma aplicação SPA desenvolvida com Angular (versão 18.2.4) para gerenciamento de produtos. Utiliza as funcionalidades mais recentes do framework, incluindo componentes standalone e Angular Material, oferecendo uma interface moderna e eficiente.

## Acesse a Aplicação

Você pode acessar a aplicação online através deste link:

🔗 [ProdutosApp - Demo](https://producs-test.netlify.app)


## Funcionalidades

- **Consulta de Produtos**
  - Tela principal que exibe uma lista de produtos cadastrados.
  - Permite pesquisa por código e/ou categoria (opções: atacado, varejo, internacional, todos).
  - Tabela com colunas para código, nome e categoria dos produtos.
  - Filtros dinâmicos e ordenação dos dados.

- **Inclusão de Produtos**
  - Tela para adicionar um novo produto com campos para código (único), nome e categoria (pré-definida).
  - Opções para salvar o produto ou voltar para a tela de consulta.

- **Alteração de Produtos**
  - Tela para editar um produto existente, com opções para atualizar nome e categoria.
  - Opções para salvar as alterações ou voltar para a tela de consulta.

- **Exclusão de Produtos**
  - Funcionalidade para remover um produto da lista com confirmação de exclusão.

## Características Adicionais

- **Validação Assíncrona**
  - Implementação para evitar a duplicação de códigos de produtos.

- **Estilo e Experiência do Usuário**
  - Interface estilizada com SCSS personalizado.
  - Foco em usabilidade e aparência limpa e intuitiva.
  - Experiência inclusiva para todos os usuários, incluindo aqueles com deficiências, implementando práticas de acessibilidade.

- **Paginação e Ordenação**
  - Tabela de produtos com funcionalidades de paginação e ordenação.

- **Filtros Dinâmicos**
  - Aplicação de filtros dinâmicos e possibilidade de expansão de linhas para visualização de descrições adicionais.

## Passo a Passo para Rodar a Aplicação

1. **Clone o Repositório**
    ```bash
    git clone git@github.com:sjadriana/product-management.git
    cd product-management
    ```

2. **Instale as Dependências**
    Se o Angular CLI ainda não estiver instalado, instale-o globalmente com o comando:
    ```bash
    npm install -g @angular/cli
    ```
    Em seguida, instale as dependências do projeto:
    ```bash
    npm install
    ```

3. **Inicie o Servidor de Desenvolvimento**
    Execute o servidor de desenvolvimento:
    ```bash
    ng serve
    ```
    Navegue até [http://localhost:4200/](http://localhost:4200/) para visualizar a aplicação em execução. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## Construção do Projeto

    Compile o projeto com:
    ```bash
    ng build
    ```
    Os artefatos de compilação serão armazenados no diretório dist/

4. **Execução de Testes**
    Testes Unitários Execute os testes unitários com:
    ```bash
    ng test
    ```
    Isso executará os testes unitários via Karma.

5. **Configuração de Linting e Pre-Commit**
    - ESLint O projeto utiliza ESLint para garantir a qualidade do código. Verifique as regras e faça o linting com:

    ```bash
    npx eslint .
    ```
     Husky O Husky está configurado para executar linting e testes antes dos commits e dos pushes. Certifique-se de que as verificações passam antes de fazer um commit ou um push.

    - Pre-Commit: Linting e testes unitários são executados antes de cada commit.
    - Pre-Push: Linting e testes unitários são executados antes de cada push.

##   Pendências Temporárias
  **Pendências Temporárias**
  - Persistência Temporária: As informações estão sendo mockadas e persistidas temporariamente.
  
   **Testes End-to-End**: A funcionalidade de testes end-to-end ainda não foi implementada. Será necessário adicionar um pacote de teste end-to-end quando essa funcionalidade for necessária.

   **Notas Adicionais**
  - Node.js: Este projeto requer Node.js versão 20 ou superior.
  - Angular CLI: Certifique-se de usar a versão 18.2.4 do Angular CLI.

   **Contribuição**
  - Se você deseja contribuir para o projeto, sinta-se à vontade para abrir uma issue ou enviar um pull request. Sua ajuda é sempre bem-vinda!



