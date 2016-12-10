var fs = require('fs');
var app = require('./app')

var fileName = process.argv[2];

if (!fileName) {
  console.error('Please enter the file name.');
  process.exit(1);
}

fs.readFile(fileName, 'utf8', function(err, data) {
  if (err) {
    console.error('Something went wrong reading the file');
    process.exit(1);
  }

  console.log(app(data));
});
