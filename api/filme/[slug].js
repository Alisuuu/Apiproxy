const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const slug = req.query.slug;
  const url = `https://superflixapi.lat/filme/${slug}`;

  try {
    const response = await fetch(url, { redirect: 'follow' });
    let html = await response.text();

    // Remove meta refresh
    html = html.replace(/<meta[^>]*http-equiv=["']?refresh["'][^>]*>/gi, '');

    // Bloqueia redirecionamentos JS
    html = html.replace(/window(\.top)?\.location\s*=\s*["'][^"']+["'];?/gi, '// bloqueado');
    html = html.replace(/location\.href\s*=\s*["'][^"']+["'];?/gi, '// bloqueado');

    // Bloqueia detecção de sandbox/iframe
    html = html.replace(/window\.top\s*!==\s*window\.self/g, 'false');
    html = html.replace(/window\.self\s*!==\s*window\.top/g, 'false');
    html = html.replace(/self\s*!==\s*top/g, 'false');
    html = html.replace(/top\s*!==\s*self/g, 'false');
    html = html.replace(/window\.frameElement\s*!==\s*null/g, 'false');
    html = html.replace(/window\.frameElement/g, 'null');

    // CSP e permissões máximas
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'text/html');
    res.setHeader(
      'Content-Security-Policy',
      "default-src * data: blob: 'unsafe-inline' 'unsafe-eval'; script-src * data: blob: 'unsafe-inline' 'unsafe-eval'; connect-src *; img-src * data: blob:; media-src *; frame-src *;"
    );

    res.status(200).send(html);
  } catch (error) {
    res.status(500).send('Erro ao carregar conteúdo do filme.');
  }
};
