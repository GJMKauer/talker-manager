function nameMiddleware(req, res, next) {
  const nullName = 'O campo "name" é obrigatório';
  const shortName = 'O "name" deve ter pelo menos 3 caracteres';
  
  const { name } = req.body;

  if (!name || name.length === 0) return res.status(400).json({ message: nullName });
  if (name.length < 3) return res.status(400).json({ message: shortName });

  next();
}

function ageMiddleware(req, res, next) {
  const nullAge = 'O campo "age" é obrigatório';
  const lowAge = 'A pessoa palestrante deve ser maior de idade';
  
  const { age } = req.body;

  if (!age || age.length === 0) return res.status(400).json({ message: nullAge });
  if (Number(age) < 18) return res.status(400).json({ message: lowAge });

  next();
}

function talkMiddleware(req, res, next) {
  const nullTalk = 'O campo "talk" é obrigatório';

  const { talk } = req.body;

  if (!talk) return res.status(400).json({ message: nullTalk });

  next();
}

function watchedMiddleware(req, res, next) {
  const dateValidator = /^\d{2}\/\d{2}\/\d{4}$/;

  const nullWatchedAt = 'O campo "watchedAt" é obrigatório';
  const invalidWatchedAt = 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"';

  const { talk: { watchedAt } } = req.body;

  if (!watchedAt) return res.status(400).json({ message: nullWatchedAt });
  if (!dateValidator.test(watchedAt)) return res.status(400).json({ message: invalidWatchedAt });

  next();
}

function rateMiddleware(req, res, next) {
  const nullRate = 'O campo "rate" é obrigatório';
  const invalidRate = 'O campo "rate" deve ser um inteiro de 1 à 5';

  const { talk: { rate } } = req.body;

  if (!rate || rate.length === 0) return res.status(400).json({ message: nullRate });
  if (Number(rate) < 1 || Number(rate) > 5) return res.status(400).json({ message: invalidRate });

  next();
}

module.exports = {
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  watchedMiddleware,
  rateMiddleware,
};
