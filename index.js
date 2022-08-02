const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliadorGK funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  return res.status(200).json(data);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync('./talker.json', 'utf8'));
  const filteredTalker = data.find((talker) => Number(talker.id) === Number(id));

  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(filteredTalker);
});

app.post('/login', (_req, res) => {
  // const { email, password } = req.body;
  const tokenValue = crypto.randomBytes(8).toString('hex');
  return res.status(200).json({ token: tokenValue });
});

app.listen(PORT, () => {
  console.log('Online');
});
