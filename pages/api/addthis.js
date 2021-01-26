const url =
  'https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-600cc1344dfb424f';

export default async (req, res) => {
  const response = await fetch(url);
  const content = await response.text();
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/javascript');
  res.end(content);
};
