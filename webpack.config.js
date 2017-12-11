const path = require('path');

module.exports = {
  entry: ['./src/app.ts'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['.d.ts','.ts', '.tsx','.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be 
      // handled by `ts-loader`
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
};