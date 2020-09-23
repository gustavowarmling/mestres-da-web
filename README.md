# Processo seletivo Mestres da Web


Aplicação desenvolvida para participar do processo seletivo da empresa Mestres da Web, o desafio consiste na criação do back-end de uma aplicação de gerenciamento de estoque para lojas de varejo.

# Tecnologias utilizadas
  - Node.JS
  - Typescript
  - Express
  - PostgreSQL

# Como utilizar?

  - Instale as dependências 
    ```sh
    npm install
    ```
  - Configure o banco no arquivo ormconfig.json
  - Execute as migrations 
    ```sh
    yarn typeorm migration:run
    ```
  - Inicie o servidor
    ```sh
    yarn dev:server
    ```

# Rotas!

**GET** /products ou /products/:id
  - Pode passar sku no request.body para filtrar por sku e realizar contagem
  - ```sh
    {
	"sku":"",
    }
    ```

**POST** /products
```sh
{
    "name": "",
    "description": "",
    "size": ,
    "price": ,
    "quantity": ,
    "sku":"",
}
```
**PUT** /products/:id
```sh
{
    "name": "",
    "description": "",
    "size": ,
    "price": ,
    "sku":"",
}
```

**DEL** /products/:id

*Espero que gostem da aplicação, agradeço a oportunidade e o contato!*
