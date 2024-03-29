const allowedCors = [
  'https://praktikum.tk',
  'http://praktikum.tk',
  'http://enquence.students.nomoredomainsmonster.ru',
  'https://enquence.students.nomoredomainsmonster.ru',
  'http://localhost:3000',
];

module.exports = function (req, res, next) {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  const { method } = req;
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
