const path = require('path');

const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

module.exports = {
  entry: "./app/assets/scripts/App.js", // source of the

  // customize the filename of the output and the location
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "app")
  },

  devServer: {
      
    before: function( app, server ){
        server._watch('./app/**/*.html'); // watch and reload when HTML files changes
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000, // port used
    host: '0.0.0.0' // allow mobile device with same network to be access on phone
  },

  mode: "development", // or production, minified if production
//   watch : true, // devServer takes the job

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
          { loader: "postcss-loader", options: { plugins: postCSSPlugins } }
        ]
      }
    ]
  }
};