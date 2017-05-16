var path = require('path');


module.exports = {
  entery: './main.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'dist')
  }
};