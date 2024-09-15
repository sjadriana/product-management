# ProdutosApp

Esse projeto é um sistema de gerenciamento de produtos desenvolvido com Angular, versão 18.2.4, utilizando as mais recentes funcionalidades da framework, incluindo componentes standalone e Angular Material para criar uma interface moderna e eficiente. O sistema permite que os usuários façam operações CRUD (criar, ler, atualizar e deletar) em uma tabela de produtos, com recursos como filtros dinâmicos, validação de campos, paginação e ordenação de dados.

A tabela exibe informações sobre os produtos, como código, nome e categoria (atacado, varejo, internacional), e oferece opções de edição e exclusão através de ícones de ação intuitivos. O sistema possui um formulário para adicionar e editar produtos, implementando validação assíncrona para evitar a duplicação de códigos de produtos.

A interface é estilizada com SCSS personalizado, seguindo as diretrizes visuais do Itaú Personalité Asset Management, priorizando usabilidade e aparência limpa. Além disso, o projeto inclui um filtro de categorias e uma funcionalidade de expansão de linhas para visualizar descrições de produtos, tudo mantendo uma experiência fluida e intuitiva para o usuário. .

## Development server
 
Se o Angular CLI ainda não estiver instalado, instale-o globalmente com o comando  `npm install -g @angular/cli`, e em segida `npm install` se o Angular CLI  já estiver instalado, ignore e execute apenas  `npm install`.


Execute `ng serve` para iniciar o servidor de desenvolvimento. Navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Execute `ng` build para compilar o projeto. Os artefatos de compilação serão armazenados no diretório `dist/`

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests - Ainda não implementado 

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
