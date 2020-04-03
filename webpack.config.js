const currentTask = process.env.npm_lifecycle_event; // "dev" or "build"
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra'); 



const postCSSPlugins = [
  require("postcss-import"),
  require("postcss-mixins"),
  require("postcss-simple-vars"),
  require("postcss-nested"),
  require("postcss-hexrgba"),
  require("autoprefixer")
];

//custom plugins , copy images assets file to dist/build
class RunAfterCompile{

  apply(compiler){
    compiler.hooks.done.tap("Copy images" , function () {
      fse.copySync('./app/assets/images', './docs/assets/images') // or './dist/assets/images'
    });
  }

}

let cssConfig = {
  
  test: /\.css$/i,
  use: [
    
    "css-loader",
    { loader: "postcss-loader", options: { plugins: postCSSPlugins } }
  ]
};


//loop all the html files in ./app location for building process
let pages = fse.readdirSync('./app').filter( function (file) {
  return file.endsWith('.html');
}).map( function(page) {
  return new HtmlWebpackPlugin({
      filename: page,
      template: `./app/${page}`
  })
})

// Generic config for dev and build
let config = {
  entry: "./app/assets/scripts/App.js", // source of the
  plugins : pages,
  module: {
    rules: [
      cssConfig
    ]
  }
};

//=============   DEVELOPMENT ADDITIONAL CONFIG   ===============

if (currentTask === "dev") {

  cssConfig.use.unshift("style-loader");

  config.output = {
    filename: "bundle.js",
    path: path.resolve(__dirname, "app")
  },

  config.devServer = {
    before: function (app, server) {
      server._watch('./app/**/*.html'); // watch and reload when HTML files changes
    },
    contentBase: path.join(__dirname, "app"),
    hot: true,
    port: 3000, // port used
    host: '0.0.0.0' // allow mobile device with same network to be access on phone
  },

  config.mode = "development"; // or production, minified if production

}

//=============   PRODUCTION/BUILD ADDITIONAL CONFIG   ===============

if (currentTask === "build") {

  //make javascript code work on wider variety of browser/compatibility
  config.module.rules.push({
    test: /\.js$/, // apply for js file only
    exclude: /(node_modules)/ , //ignore the node module folder
    use :{
      loader : 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  })

  cssConfig.use.unshift( MiniCssExtractPlugin.loader );
  postCSSPlugins.push( require('cssnano') );

  config.output = {
    // filename: "bundle.js", // default way

    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',

    path: path.resolve(__dirname, "docs") // or "dist"
  },

  config.mode = "production"; // or production, minified if production

  config.optimization = {
    splitChunks : { chunks : 'all'}
  }

  config.plugins.push(
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles.[chunkhash].css' }),
    new RunAfterCompile(), // our own plugin!
  );


}



module.exports = config;