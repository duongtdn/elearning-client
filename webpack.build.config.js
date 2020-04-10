"use strict"

const path = require("path");

module.exports = {
  entry: {
    app: ["./src/scripts/app.js"]
  },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /(\.js?$)|(\.jsx?$)/,
        use: 'babel-loader',
      }
    ]
  },
  mode: 'production',
}
