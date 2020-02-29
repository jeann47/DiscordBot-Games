const request = require('request');
const fs = require('fs');

function saveFile(url, path) {
  request
    .get(url)
    .on('error', console.error)
    .pipe(fs.createWriteStream(path));
}

module.exports = saveFile;
