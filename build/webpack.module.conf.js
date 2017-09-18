const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
//			{
//				test: /\.scss$/,
//				use: [{
////						loader: "style-loader" // creates style nodes from JS strings
////				}, {
////						loader: "css-loader" // translates CSS into CommonJS
////				}, {
//						loader: "sass-loader", // compiles Sass to CSS
//						options: {
//							includePaths: ["../src/assets/scss"]
//						}
//				}]
//			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
//					fallback: "style-loader",
					use: "css-loader!sass-loader",
				})
			}
    ]
  },
	externals: {
		'vee-validate': 'vee-validate'
	},
  plugins: [
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    })
  ]
};

module.exports = [

  // Config 1: For browser environment
//  merge(commonConfig, {
//		
//  }),

  // Config 2: For Node-based development environments
  merge(commonConfig, {
		entry: path.resolve(__dirname + '/../src/gooey-ui.js'),
		output: {
			path: path.resolve(__dirname + '/../dist/'),
			filename: 'gooey-ui.min.js',
      libraryTarget: 'umd',

      // These options are useful if the user wants to load the module with AMD
      library: 'gooey-ui',
      umdNamedDefine: true
    },
		plugins: [
			new ExtractTextPlugin('gooey-ui.css')
		]
  })
];