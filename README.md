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

Após clonar o projeto em seu computador, para iniciá-lo é necessário executar o comando
```
docker-compose up -d && docker exec -it talker_manager bash
```
e na sequência
```
npm install && npm run dev
```
na pasta raíz do projeto. Isso fará com que os containers docker sejam orquestrados e a aplicação esteja disponível.

Após isso, você pode realizar as requisições de CRUD através de algum cliente HTTP, como o `Insomnia`, o `Postman`, o `HTTPie` ou até mesmo extensões do VSCode como o `Thunder Client` através dos enpoints listados abaixo.

O projeto trata-se de um desafio para consolidar o aprendizado inicial em Node.js e Express, com o desenvolvimento de uma API utilizando os conceitos de CRUD para leitura, cadastro, atualização e remoção de dados de palestrantes. Para isso, foram desenvolvidos alguns endpoints utilizando o módulo fs do Node.js. A validação das requisições é realizada através de um token **gerado pelo módulo Crypto**. Nos projetos futuros aprenderemos a utilizar a biblioteca JWT para criação e validação de requisições via Token.

Também foi utilizado o conceito de middlewares para validação das requisições; ao tentar submeter uma requisição com dados inválidos, token inválido ou qualquer informação que possa gerar um erro, essa submissão é levada até o middleware que retorna um sinal de erro para o usuário, informando-o o tipo de erro para que ele corrija e realize a requisição novamente.

---

## 📚 Documentação (endpoints)

### 👨🏻‍💼 Talkers
| Método | Funcionalidade                               | URL                          |
| ------ | -------------------------------------------- | ---------------------------- |
| `GET`  | Retorna uma lista de palestrante cadastrados | http://localhost:3000/talker |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
[
  {
    "name": "Henrique Albuquerque",
    "age": 62,
    "id": 1,
    "talk": {
      "watchedAt": "23/10/2020",
      "rate": 5
    }
  },
  {
    "name": "Heloísa Albuquerque",
    "age": 67,
    "id": 2,
    "talk": {
      "watchedAt": "23/10/2020",
      "rate": 5
    }
  },
  {
    "name": "Ricardo Xavier Filho",
    "age": 33,
    "id": 3,
    "talk": {
        "watchedAt": "23/10/2020",
        "rate": 5
    }
  },
  {
    "name": "Marcos Costa",
    "age": 24,
    "id": 4,
    "talk": {
      "watchedAt": "23/10/2020",
      "rate": 5
    }
  }
]
```

</details>
<br>
<br>

| Método | Funcionalidade                                                        | URL                              |
| ------ | --------------------------------------------------------------------- | -------------------------------- |
| `GET`  | Retorna um palestrante através do id (substituir `:id` por um número) | http://localhost:3000/talker/:id |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
{
  "name": "Henrique Albuquerque",
  "age": 62,
  "id": 1,
  "talk": {
    "watchedAt": "23/10/2020",
    "rate": 5
  }
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>Pessoa palestrante não encontrada</code> caso o id seja inválido;
</details>
<br>
<br>

| Método | Funcionalidade             | URL                         |
| ------ | -------------------------- | --------------------------- |
| `POST` | Realiza o login no Backend | http://localhost:3000/login |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  
```json
{
  "email": "email@email.com",
  "password": "123456"
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>
  
```json
{
  "token": "36ff25cbe01d68e7"
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "email" é obrigatório</code> caso nenhum e-mail seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O "email" deve ter o formato "email@email.com"</code> caso seja informado algo diferente de um e-mail no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "password" é obrigatório</code> caso nenhuma senha seja passada no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O "password" deve ter pelo menos 6 caracteres</code> caso uma senha pequena seja passada no body da requisição.
</details>
<br>
<br>

| Método | Funcionalidade                               | URL                          |
| ------ | -------------------------------------------- | ---------------------------- |
| `POST` | Insere um novo palestrante no banco de dados | http://localhost:3000/talker |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  
```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

Essa requisição deve, obrigatoriamente, ter um `token de autenticação` nos headers, no campo `authorization` (obtido após realizar o login).

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 201:</summary>
  
```json
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token não encontrado</code> caso não seja informado um token de autorização;<br>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token inválido</code> caso o token de autorização passado não seja válido;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "name" é obrigatório</code> caso nenhum nome seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O "name" deve ter pelo menos 3 caracteres</code> caso um nome muito curto seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "age" é obrigatório</code> caso nenhuma idade seja informada no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>A pessoa palestrante deve ser maior de idade</code> caso seja informada uma idade abaixo de 18 anos no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "talk" é obrigatório</code> caso o campo talk não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "watchedAt" é obrigatório</code> caso o campo watchedAt não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "watchedAt" deve ter o formato "dd/mm/aaaa\</code> caso seja informado uma data inválida no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "rate" é obrigatório</code> caso o campo rate não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "rate" é obrigatório</code> caso o campo rate informado no body da requisição seja um número abaixo de 1 ou acima de 5.
</details>
<br>
<br>

| Método | Funcionalidade                                                                           | URL                              |
| ------ | ---------------------------------------------------------------------------------------- | -------------------------------- |
| `PUT`  | Atualiza um palestrante no banco de dados através do id (substituir `:id` por um número) | http://localhost:3000/talker/:id |

<details>
  <summary>A estrutura do <code>body</code> da requisição deverá seguir o padrão abaixo:</summary>
  
```json
{
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 5
  }
}
```

</details>

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
{
  "id": 1,
  "name": "Danielle Santos",
  "age": 56,
  "talk": {
    "watchedAt": "22/10/2019",
    "rate": 4
  }
}
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token não encontrado</code> caso não seja informado um token de autorização;<br>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token inválido</code> caso o token de autorização passado não seja válido;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "name" é obrigatório</code> caso nenhum nome seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O "name" deve ter pelo menos 3 caracteres</code> caso um nome muito curto seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "age" é obrigatório</code> caso nenhuma idade seja informada no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>A pessoa palestrante deve ser maior de idade</code> caso seja informada uma idade abaixo de 18 anos no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "talk" é obrigatório</code> caso o campo talk não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "watchedAt" é obrigatório</code> caso o campo watchedAt não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "watchedAt" deve ter o formato "dd/mm/aaaa\</code> caso seja informado uma data inválida no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "rate" é obrigatório</code> caso o campo rate não seja informado no body da requisição;<br>
  - A rota retorna o código <code>400</code>, com a mensagem <code>O campo "rate" é obrigatório</code> caso o campo rate informado no body da requisição seja um número abaixo de 1 ou acima de 5.
</details>
<br>
<br>

| Método   | Funcionalidade                          | URL                              |
| -------- | --------------------------------------- | -------------------------------- |
| `DELETE` | Remove um palestrante do banco de dados | http://localhost:3000/talker/:id |

Essa rota retorna o status 204, <code>sem resposta</code>.

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token não encontrado</code> caso não seja informado um token de autorização;<br>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token inválido</code> caso o token de autorização passado não seja válido.
</details>
<br>
<br>

| Método | Funcionalidade                                                                                                         | URL                                              |
| ------ | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| `GET`  | Realiza a consulta de palestrantes com base em um filtro (substituir <code>searchTerm</code> pelo nome do palestrante) | http://localhost:3000/talker/search?q=searchTerm |

<details>
  <summary>A resposta da requisição é a seguinte, com status 200:</summary>
  
```json
[
  {
    "id": 1,
    "name": "Danielle Santos",
    "age": 56,
    "talk": {
      "watchedAt": "22/10/2019",
      "rate": 5,
    },
  }
]
```

</details>

<details>
  <summary>A requisição irá falhar nos seguintes casos:</summary>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token não encontrado</code> caso não seja informado um token de autorização;<br>
  - A rota retorna o código <code>401</code>, com a mensagem <code>Token inválido</code> caso o token de autorização passado não seja válido.
</details>

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