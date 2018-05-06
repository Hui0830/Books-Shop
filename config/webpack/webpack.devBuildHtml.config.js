/*------------------自动创建页面HTML配置文件-------------------*/
const fs = require("fs");

const rimraf = require("rimraf")

const webpackFile = require('./webpack.file.config');

const entryBuild = require('../entryFiles/entry');

const webpackComConf = require('./webpack.com.config');

/*删除开发目录*/
rimraf.sync(webpackFile.devDirectory);

/*创建开发目录*/
fs.mkdirSync(webpackFile.devDirectory);

/*生成HTML*/
let htmlContent = fs.readFileSync('index.html', 'utf-8');
let scriptInsert = `
<script src="js/manifest.js"></script>
<script src="js/common.js"></script>
<script src="js/vendor.js"></script>
<script src="js/key.js"></script>
`;
htmlContent = htmlContent.replace('</body>', scriptInsert + '</body>');

entryBuild.map((data) => {
	fs.writeFile(webpackFile.devDirectory + '/' + data.name + '.html',
	htmlContent.replace('js/key.js','js/' + data.name + '.js').replace('<%= htmlWebpackPlugin.options.title %>',webpackComConf.titleFun(data.name,data.title)),
	'utf8',
	function (err) {
		if (err) {
			return console.log(err)
		}
	});
});