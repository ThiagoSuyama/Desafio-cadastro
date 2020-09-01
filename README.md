# Desafio de Cadastro e Login

Criação de uma API em NodeJS, utilizado *Express* e *Sequelize*.  
Com email e senha para Autenticar.  
Autenticação via token com validade 1 hora.    
Disparado email após criar o usuário.   
Usuário tem nível de hierarquia, ao buscar os usuário irá trazer quem é o subordinante do cargo.

**Ao clonar o repositório**    
<br>
*Foi utilizado o Yarn*
1. Executar o comando no seu terminal para instalar todas as dependências. 
```
yarn
``` 
2. Executar as Migrations
```
yarn sequelize db:migrate
```
3.  no diretorio *src/database/*, importar no banco de dados os arquivos, para popular a base
```
office_database.sql
users_database.sql
```  
4. Iniciar o Servidor (*localhost:3333*)
```
yarn dev
```
<br>

**Rotas**  
*Office*  
- GET:  */office* - Listar todos os Cargos
- POST:  */office* - Criar um Cargo 
  - Exemplo (json):
  ```
  {
    "name":"Desenvolvedor backend",
    "area":"TI"
  }
  ```
- PUT:  */office/:id*
   - id: informar o id do cargo que deseja alterar.
   - Exemplo (json):
     - hierarchy_level : Informar o nível de hierarquia (1-sendo o mais baixo , 2..3..4 - sendo o mais alto)
     - subordinate_user: Informar o id do usuario subordnante do cargo (Gerente , Supervisor, CEO..)
   
  ```
  {
    "hierarchy_level": 1,
    "subordinate_user":8 
  }
  ```
- DELETE:  */office/:id*
    - id: informar o id do cargo que deseja Excluir.  
 

*Sessions*
- POST:  */sessions* - Iniciar uma sessão 
  - Exemplo (json):
    ```
    {
      "email": "teste@gmail.com",
      "password": "123456"
    }

    ```

*Users*
- GET:  */users* - Listar todos os Usuários
- POST  */users* - Criar um Usuário
  - Exemplo (json):
   ```
   {
  	"name": "nome",
  	"email": "email@gmail.com",
  	"password": "123456",
  	"telephone": "123456",
  	"area_interest": "Adm, Comercial, Financeiro"
  }
  ```
- PUT:  */users* 
  - Alterado o usuário que estiver logado(necessario o token).
  - Exemplo (json):
    - outros campos: nome, email, password, area_interest
  ```
  {
    "office_id": 10
  }  

- DELETE: */users/:id*  
    - id: informar o id do cargo que deseja Excluir.  
