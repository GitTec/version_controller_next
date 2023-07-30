# Controlador de versões front

## Bibliotecas
- yarn add axios
- yarn add react-bootstrap bootstrap
- yarn add react-icons
- yarn add sweetalert2
- yarn add react-hook-form

## Sequencia de passos
- Consertar o arquivo de global.css no styles
- Configurar o index inicial
- Configuração da api com axios, nos services
- Configuração do cabeçalho padrão da página
- Configuração do componente Header, que é chamado no cabeçalho da página
- Chamar o Cabeçalho nas páginas que vão aparecer (index)
- Criando a tela de usuarios

```js
    "dev": "ts-node-dev --transpile-only --ignore-watch node_modules index.ts"
```
`esse scrpit irá executar o arquivo index.ts com o "compilador" ts-node-dev pedindo que somente traduza para JS(transpile-only) e que ignore mudanças na pasta node_modules`

## Typeorm commands

```bash

# create a new migration
$ yarn typeorm migration:create ./src/shared/migrations/NOME

# run migrations
$ yarn typeorm migration:run -d ./datasource.ts

# revert last migration
$ yarn typeorm migration:revert -d ./datasource.ts

```



