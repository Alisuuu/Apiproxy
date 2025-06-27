const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const slug = req.query.slug;
  const url = `https://superflixapi.lat/filme/${slug}`;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    const html = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader(
      'Content-Security-Policy',
      "default-src * data: blob: filesystem: about: 'unsafe-inline' 'unsafe-eval'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; style-src * 'unsafe-inline'; connect-src *; media-src *; img-src * data: blob:; frame-src *;"
    );

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Erro ao carregar conteúdo do filme.');
  }
};
