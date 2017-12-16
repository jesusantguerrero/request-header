const express = require('express');
const app = express();

app.use(express.static('public'));

app.get("/", function (req, res) {
  const data = getClientInfo(req)
  res.json(data)
});


const listener = app.listen(process.env.PORT || 5000,  () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

function getClientInfo(req) {
  const header = req.headers
  const ua = header['user-agent']
  const ip = header['x-forwarded-for'].split(',')[0]
  const language = header['accept-language'].split(',')[0]
  const start = ua.indexOf('(') + 1
  const end = ua.indexOf(')')
  const os = ua.slice(start, end)
  return {
    ip,
    os,
    language,
  }
}


