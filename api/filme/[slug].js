module.exports = async (req, res) => {
  const slug = req.query.slug;
  const playerUrl = `https://superflixapi.lat/filme/${slug}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Player - ${slug}</title>
        <style>
          html, body, iframe {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            border: none;
            background: black;
            overflow: hidden;
          }
        </style>
      </head>
      <body>
        <iframe
          src="${playerUrl}"
          allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowfullscreen
          style="width: 100%; height: 100%; border: none;"
        ></iframe>
      </body>
    </html>
  `;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
};
