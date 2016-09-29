"use strict"

// let webpack = require ("webpack");
// let path =  require ("path");

module.exports = {
    //entry: "./src/js/main.js",
    output: {
        filename: "bundle.js"
    },
    module: {
      loaders: [
        //{ test: /\.handlebars$/, loader: "handlebars-loader" },
        { test: /\.js$/, loader: "babel" }
      ]
    },
    node: {
        fs: "empty" // avoids error messages
    }
};