/*-------生产环境代码编译配置------------*/
/*
	特点：
		1、文件要求体积小，使用压缩插件；
		2、浏览器缓存，如果修改，如何让浏览器从新拉取；
		3、请求数量要求尽量少。
*/
const path = require('path');
const merge = require('webpack-merge');

// 自动生成html模板文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 清除文件
const cleanWebpackPlugin = require('clean-webpack-plugin');

// webpack复制插件
const copyWebpackPlugin = require('copy-webpack-plugin');

// optimizeCssPlugin CSS文件压缩插件
const optimizeCssPlugin = require('optimize-css-assets-webpack-plugin');

// css 代码提取到独立.css文件
const extractTextPlugin = require('extract-text-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const webpackFiles = require('./webpack.file.config');
// const entry = require('./webpack.entry.config');
// const webpackCom = require('./webpack.com.config');

let config = merge(baseWebpackConfig, {
	/*设置生产环境*/
	mode: 'production',

	output: {
		path: path.resolve(webpackFiles.proDirectory),
		filename: "js/[name].[chunkhash:8].js",
		chunkFilename: "js/[name]-[id].[chunkhash:8].js",
	},

	plugins: [
		// 提取CSS文件
		new extractTextPlugin('css/[name].[md5:contenthash:hex:8].css'),

		// css文件压缩
		new optimizeCssPlugin({
			assetNameRegExp: /\.css$/g,
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				},
				safe: true
			},
			canPrint: true
		}),
	],

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: [
					'babel-loader',
				],
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: '/node_modules/',
			},
			{
				test: /\.(css|pcss)$/,
				use: extractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader!postcss-loader!sass-loaderS"
				}),
				include:path.join(__dirname, '/node_modules/antd'),
			},
			{
				test: /\.(png|jpg|jpeg|png|gif|woff|svg|eot|ttf)/,
				loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=' + webpackFiles.resourcePrefix + '&outputPath='+webpackFiles.resource+'/'
			},
			{
				test: /\.swf$/,
				loader: 'file?name=js/[name].[ext]'
			}
		]
	}

});

/*生成html文件*/
	let cof = {
		filename:  'index.html',
		template: 'index.html',
		inject: true,
		title: "校园旧书街",
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAtrributeQuotes: true
		},
		chunks: ['manifest', 'vendor',],
		hash: false,
		chunksSortMode: 'dependency'
	};
	config.plugins.push(new HtmlWebpackPlugin(cof))

/*清除dist文件夹*/
config.plugins.push(new cleanWebpackPlugin([webpackFiles.proDirectory],{
	root: path.resolve(__dirname, '../../'),
	verbose: true,
	dry: false
}));

/*不需要编译的静态文件拷贝*/
let copyObj = [
	/*// 一些不需要走webpack编译的插件
	{
		from: './client/public/plugin',
		to: './plugin'
	}，

	// 固定不变的浏览器版本提示文件
	{
		from: './client/public/versionTips/',
		to: './versionTips'
	},

	// 一些固定文件，如下载文件
	{
		from: './client/public/resource',
		to: './resource'
	},*/

	// 网站favicon.ico
	{
		from: './client/public/images/favicon.ico',
		to: './'
	}
];
let copyArr = [];
copyObj.map((data) => {
	copyArr.push(
		new copyWebpackPlugin([
			{
				from: data.from,
				to: data.to,
				ignore: ['.*']
			}
		])
	)
});

/*拷贝静态文件*/
copyArr.map(function (data) {
	return config.plugins.push(data)
})

module.exports = config;