const fs = require('fs');
const path = require('path');

const i18nPath = path.join(__dirname, 'src/assets/i18n');
const files = fs.readdirSync(i18nPath);

const fileNames = files.map((file: any) => path.parse(file).name);

module.exports = fileNames;
