const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const slug = req.query.slug;
  const url = `https://embed.warezcdn.com/filme/${slug}`;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    let html = await response.text();

    // Bloqueia apenas detecção de sandbox/iframe
    html = html
      .replace(/window\.top\s*!==\s*window\.self/g, 'false')
      .replace(/window\.self\s*!==\s*window\.top/g, 'false')
      .replace(/self\s*!==\s*top/g, 'false')
      .replace(/top\s*!==\s*self/g, 'false')
      .replace(/window\.frameElement\s*!==\s*null/g, 'false')
      .replace(/window\.frameElement/g, 'null');

    // Cabeçalhos para permissões máximas
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader(
      'Content-Security-Policy',
      ""
    );

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Erro ao carregar conteúdo do filme.');
  }
};
