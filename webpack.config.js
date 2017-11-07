const fs = require('fs');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function getExternals() {
	return fs.readdirSync('node_modules')
		.concat(['react-dom/server'])
		.filter((mod) => mod !== '.bin')
		.reduce((externals, mod) => {
			externals[mod] = `commonjs ${mod}`;
			return externals;
		}, {});
}

module.exports = [
	{
		devtool: 'source-map',
		entry: {
			index: './source/views/index.src.js'
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: 'css-loader'
					})
				}
			]
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'public'),
			publicPath: '/'
		},
		plugins: [
			new ExtractTextPlugin('[name].css'),
			new CopyWebpackPlugin([
				'./source/client/service-worker/sw.js',
				'./source/client/service-worker/sw-cache-polyfill.js'
			])
		]
	},
	{
		entry: {
			index: './source/views/index.server.src.js'
		},
		target: 'node',
		externals: getExternals(),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.css$/,
					loader: 'ignore-loader'
				}
			]
		},
		output: {
			filename: '[name].server.js',
			path: path.resolve(__dirname, 'source/views'),
			libraryTarget: 'umd'
		}
	}
];
