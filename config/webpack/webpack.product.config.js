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
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 代码提取到独立.css文件
// const extractTextPlugin = require('extract-text-webpack-plugin');

const baseWebpackConfig = require('./webpack.base.config');
const webpackFiles = require('./webpack.file.config');

// const extractCSS = new MiniCssExtractPlugin({
//       filename: "css/[name].[md5:contenthash:hex:8].css'",
//       chunkFilename: '[id].[name].[md5:contenthash:hex:8].css'
//     })
const extractSCSS = new MiniCssExtractPlugin({
			filename: 'css/[name].[md5:contenthash:hex:8].css',
			chunkFilename: 'css/[id].css'
		});

let config = merge(baseWebpackConfig, {
	/*设置生产环境*/
	mode: 'production',

	output: {
		path: path.resolve(webpackFiles.proDirectory),
		publicPath: '/'+webpackFiles.resourcePrefix + '/',
		filename: "js/[name].[chunkhash:8].js",
		chunkFilename: "js/[name]-[id].[chunkhash:8].js",
	},
	resolve: {
		extensions: [".js",".jsx"],
		alias: {
			'redux': path.resolve(__dirname,'../../node_modules/redux/dist/redux.min.js'),
			'react-redux': path.resolve(__dirname,'../../node_modules/react-redux/dist/react-redux.min.js'),
			'react': path.resolve(__dirname,'../../node_modules/react/cjs/react.production.min.js'),
			'components': path.resolve(__dirname,'../../client/views/components'),
			'actions': path.resolve(__dirname,'../../client/action')
		}
	},
	plugins: [
		// 提取CSS文件
		// extractCSS,
		extractSCSS,

		// css文件压缩
		new optimizeCssPlugin({
			assetNameRegExp: /\.css$/g,
	        cssProcessor: require('cssnano'),
	        cssProcessorOptions: { discardComments: { removeAll: true } },
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
				exclude: path.resolve(__dirname,' ../../node_modules'),
			},
			{
			    test: /\.scss$/,
			    use: [
			    	MiniCssExtractPlugin.loader,
			    	'css-loader',
			    	'sass-loader',
			    ],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader,'css-loader'],
				include:[
					path.resolve(__dirname,' ../../client'),
					path.join(__dirname, '../../node_modules/antd')
				]
			},
			{
				test: /\.(png|jpg|jpeg|png|gif|woff|svg|eot|ttf)/,
				loader: 'url-loader?limit=8192&name=[name].[hash:8].[ext]&publicPath=' + webpackFiles.resourcePrefix + '&outputPath='+webpackFiles.resource+'/'
			},
			{
				test: /\.swf$/,
				loader: 'file?name=js/[name].[ext]'
			},
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
		chunks: ['manifest', 'vendor','index'],
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