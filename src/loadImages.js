const fs = require("fs");

const normalizedPath = require("path").join(__dirname, "../public/waifus");

const waifus = fs.readdirSync(normalizedPath).map((file, k) => {
  const extension = file.split('.')[1];
  const name = file.split('.')[0];

  return {
    code: `#${k}`,
    name,
    extension,
    location: `waifus/${file}`
  }
}).filter(waifu => (waifu.extension === 'gif' || waifu.extension === 'mp4'));

fs.writeFileSync('./src/waifus.json', JSON.stringify(waifus, null, 2), 'utf-8'); 
