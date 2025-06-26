const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { slug } = req.query;
  const url = `https://superflixapi.lat/filme/${slug}`;

  try {
    const response = await fetch(url);
    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send('Erro ao buscar filme.');
  }
};
