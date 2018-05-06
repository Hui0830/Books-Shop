const webpack = require('webpack');//引入webpack

const opn = require('opn');//打开浏览器

const merge = require('webpack-merge');//webpack合并插件

const path = require('path');

const eslintFormatter = require('react-dev-utils/eslintFormatter');

const baseWebpackConfig = require('./webpack.base.config.js');//引入webpack基础通用配置

const webpackFile = require('./webpack.file.config.js');//引入一些webpack路径配置

let config = merge(baseWebpackConfig,{

	/*设置开发环境，默认为product*/
	mode: 'development',

	output: {

		path: path.resolve(webpackFile.devDirectory),

		filename: 'js/[name].js',

		chunkFilename: 'js/[name].js',

		publicPath: ''
	},

	/*
	optimization: {
		
		runtimeChunk: {
			name: 'manifest'
		},

		
		splitChunks: {
			cacheGroups: {
				//项目公共组件提取
				common: {
					chunks: "initial",
					name: "common",
					minChunks: 2,
					maxInitialRequests: 5,
					minSize: 0
				},
				//第三方组件提取
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	},*/

	plugins: [
		/*设置热更新*/
		new webpack.HotModuleReplacementPlugin()
	],

	module: {
		rules: [
			{
				test: /\.js|\.jsx$/,
				use: [
					'cache-loader',//设置缓存
					'babel-loader',				
					],
				include: [
					path.resolve(__dirname,'../../client'),
					path.resolve(__dirname,'../../devBuild'),
					path.resolve(__dirname,'../../entryBuild')
				],
				exclude: [
					path.resolve(__dirname,'../../node_modules')
				],
			},
			{
				test: /\.(js|jsx)$/,
				enforce: 'pre',
				use: [
					{
						options: {
							formatter: eslintFormatter,
							eslintPath: require.resolve('eslint'),
							baseConfig: {
								extends: [require.resolve('eslint-config-react-app')],
							},
							useEslintrc: false,
						},
						loader: require.resolve('eslint-loader'),
					},
				],
				include: [
					path.resolve(__dirname,' ../../client')
				],
				exclude: [path.resolve(__dirname, '../../node_modules')]
			},
			{
				test: /\.(css|pcss)$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				],/*
				exclude: /node_modules/,
				include:path.join(__dirname, '/node_modules/antd'),*/

			},
			{
				test: /\.(png|jpg|jpeg|gif|ttf|eot|woff|svg|woff2|swf)$/i,
				use: [
					{
						loader: 'file-loader',
						query: {
							name:'[path][name].[ext]'
						}
					},
					/*{
						loader: 'url-loader',
						query: {
							name: '[name].[ext]',
							outputPath: webpackFile.resource
						}
					},*/
				]
			}
		]
	},

	/*设置API转发*/
	devServer: {
		host:'0.0.0.0',
		port: 8080,
		hot: true,
		inline: true,
		contentBase: path.resolve(webpackFile.devDirectory),
		historyApiFallback: true,
		disableHostCheck: true,
		/*proxy: [
			{
				context: ['/**'],
				target: 'http://127.0.0.1:3333',
				secure: false
			}
		],*/
		/*打开浏览器并打开本项目网址*/
		after() {
			opn('http:localhost:'+this.port)
		}
	}
});

module.exports = config;