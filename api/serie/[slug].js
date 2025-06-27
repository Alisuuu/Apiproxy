const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const slug = req.query.slug;
  const url = `https://embed.warezcdn.com/serie/${slug}`;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    let html = await response.text();

    html = html
      .replace(/<meta[^>]*http-equiv=["']?refresh["'][^>]*>/gi, '')
      .replace(/window(\.top)?\.location\s*=\s*["'][^"']+["'];?/gi, '// bloqueado')
      .replace(/location\.href\s*=\s*["'][^"']+["'];?/gi, '// bloqueado');

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Security-Policy', "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;");
    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Erro ao carregar conteúdo do série.');
  }
};
