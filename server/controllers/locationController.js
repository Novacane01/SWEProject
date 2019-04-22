const fs = require('fs');
const path = require('path');

var contents = fs.readFileSync(path.resolve('./Resources/locations.json'));
// Define to JSON type
var jsonContent = JSON.parse(contents);
module.exports = jsonContent;


