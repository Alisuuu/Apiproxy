const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const slug = req.query.slug;
  const url = `https://superflixapi.lat/serie/${slug}`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Erro ao carregar série.');
  }
};
