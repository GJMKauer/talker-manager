const fs = require('fs');
const fsPromise = require('fs').promises;
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const { tokenMiddleware } = require('./middlewares/tokenMiddleware');
const {
  nameMiddleware, ageMiddleware, watchedMiddleware, talkMiddleware, rateMiddleware,
} = require('./middlewares/talkerMiddlewares');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';
const talkerJson = './talker.json';

// não remova esse endpoint, e para o avaliadorGK funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', (_req, res) => {
  const data = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));
  return res.status(200).json(data);
});

app.get('/talker/search', tokenMiddleware, (req, res) => {
  const { q } = req.query;
  const talkers = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));

  if (!q || q.length === 0) return res.status(200).json(talkers);

  const filteredTalkers = talkers.filter((talker) => talker.name.includes(q));

  if (filteredTalkers.length === 0) return res.status(200).send('');

  return res.status(200).json(filteredTalkers);
});

app.get('/talker/:id', (req, res) => {
  const { id } = req.params;
  const data = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));
  const filteredTalker = data.find((talker) => Number(talker.id) === Number(id));

  if (!filteredTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).send(filteredTalker);
});

app.post('/login', (req, res) => {
  const tokenValue = crypto.randomBytes(8).toString('hex');

  const mailValidator = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  const nullEmail = 'O campo "email" é obrigatório';
  const wrongEmail = 'O "email" deve ter o formato "email@email.com"';
  const nullPassword = 'O campo "password" é obrigatório';
  const wrongPassword = 'O "password" deve ter pelo menos 6 caracteres';

  const { email, password } = req.body;

  if (!email) return res.status(400).json({ message: nullEmail });
  if (!mailValidator.test(email)) return res.status(400).json({ message: wrongEmail });
  if (!password) return res.status(400).json({ message: nullPassword });
  if (password.length < 6) return res.status(400).json({ message: wrongPassword });

  return res.status(200).json({ token: tokenValue });
});

app.post('/talker', tokenMiddleware, nameMiddleware, ageMiddleware, talkMiddleware,
watchedMiddleware, rateMiddleware, async (req, res) => {
  const { name, age, talk } = req.body;
  const { watchedAt, rate } = talk;
  
  const talkers = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));
  const id = talkers.length + 1;

  const newTalker = { id, name, age, talk: { watchedAt, rate } };

  talkers.push(newTalker);
  await fsPromise.writeFile(talkerJson, JSON.stringify(talkers));

  return res.status(201).json(newTalker);
});

app.delete('/talker/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;

  const talkers = JSON.parse(fs.readFileSync(talkerJson, 'utf8'));
  const returnedTalkers = talkers.filter((talker) => Number(talker.id) !== Number(id));
  await fsPromise.writeFile(talkerJson, JSON.stringify(returnedTalkers));

  return res.status(204).send('');
});

app.listen(PORT, () => {
  console.log('Online');
});
