# Boas vindas ao repositório do projeto <b>Talker Manager</b>!

Esse projeto foi desenvolvido durante o módulo de Backend na Trybe! #vqv 

Aqui você vai encontrar os detalhes de como foi o desenvolvimento do projeto e quais foram os requisitos técnicos necessários para a entrega do desafio.

---

# Habilidades desenvolvidas

Neste projeto, fui capaz de:

- Desenvolver uma API de um CRUD (Create, Read, Update e Delete) de palestrantes (talkers) e;
- Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo fs.

---

# CRUD

CRUD é um acrônimo para **C**reate, **R**ead, **U**pdate and **D**elete. Em português seria **Criar**, **Ler**, **Atualizar** e **Deletar** registros. Nesse projeto ainda não trabalhamos diretamente com um banco de dados para realizar estas operações do CRUD, mas utilizamos um arquivo JSON através da manipulação com o módulo fs do Node.js, para consolidar melhor os conhecimentos.

---

# Funcionamento da aplicação

Para iniciar o projeto, é necessário possuir o [Docker](https://docs.docker.com/engine/install/ubuntu/) instalado.

Antes de iniciar o projeto, é necessário instalar as dependências dele com o comando
```
npm install
```

Para rodar o projeto, é necessário executar o comando
```
docker-compose up -d
```
na raíz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível. Esse comando deve ser executado via terminal dentro do diretório onde está o arquivo **docker-compose.yml**. Após os containers estarem funcionando, você pode realizar as requisições do CRUD através de algum cliente HTTP, como o Insomnia, o Postman, o HTTPie ou até mesmo extensões como o Thunder Client, do VS Code).

O projeto trata-se de um desafio para consolidar o aprendizado inicial em Node.js e Express, com o desenvolvimento de uma API utilizando os conceitos de CRUD para leitura, cadastro, atualização e remoção de dados de palestrantes. Para isso, foram desenvolvidos alguns endpoints utilizando o módulo fs do Node.js. A validação das requisições é realizada através de um token **gerado pelo módulo Crypto**. Nos projetos futuros aprenderemos a utilizar a biblioteca JWT para criação e validação de requisições via Token.

Também foi utilizado o conceito de middlewares para validação das requisições; ao tentar submeter uma requisição com dados inválidos, token inválido ou qualquer informação que possa gerar um erro, essa submissão é levada até o middleware que retorna um sinal de erro para o usuário, informando-o o tipo de erro para que ele corrija e realize a requisição novamente.

---

# Histórico de Commits

É possível verificar todo o histórico de commits do projeto, de modo a visualizar passo-a-passo como foi desenvolvido o meu raciocínio até a finalização do projeto.

---

# Requisitos técnicos do desafio:

- ✅ 1. Crie o endpoint GET /talker.

- ✅ 2. Crie o endpoint GET /talker/:id.

- ✅ 3. Crie o endpoint POST /login.

- ✅ 4. Adicione as validações para o endpoint /login.

- ✅ 5. Crie o endpoint POST /talker.

- ✅ 6. Crie o endpoint PUT /talker/:id.

- ✅ 7. Crie o endpoint DELETE /talker/:id.

- ✅ 8. Crie o endpoint GET /talker/search?q=searchTerm.