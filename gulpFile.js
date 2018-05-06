const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const vsftp = require('gulp-vsftp');
const zip = require('gulp-zip');
const moment = require('moment-kirk');

const webpackFile = require('./config/webpack/webpack.file.config');
const packageInfo = require('./package.json');

/*生成构建时间，存放在生产目录中*/
gulp.task('buildTime', () => {
	fs.writeFile(
		path.resolve(webpackFile.proDirectory) + "/buildTime.txt",
		moment(new Date()).format('YYYY-MM-DD HH:mm:ss') + ' ' + packageInfo.version, 
		function(err) {
			if (err) {
				return console.log(err)
			}else{
				console.log("The file was saved!",path.resolve());
			}
		}
	)
});

/*打包生产目录*/
gulp.task('zip', () => 
	gulp.src(path.resolve(webpackFile.proDirectory + '/**'))
	.pipe(zip('pc-[' + packageInfo.version + ']-[' + moment(new Date()).format('YYYY-MM-DD HH-mm-ss')+'].zip'))
	.pipe(gulp.dest('backup'))
	)

/*上传生产目录到测试环境*/
gulp.task('test', () => {
	return gulp.src(webpackFile.proDirectory + '/**')
		.pipe(vsftp({
			host:'0.0.0.0',
			port: 3333,
			user: 'developer',
			pass: 'XXXXXXX',
			cleanFiles: true,
			remotePath: '/docker-developer-test/moudules/www/static/pc/',
		}));
});

/*上传生产目录到预生产环境*/
gulp.task('pre', () => {
	return gulp.src(webpackFile.proDirectory + '/**')
		.pipe(vsftp({
			host:'0.0.0.0',
			port: 3333,
			user: 'developer',
			pass: 'XXXXXXX',
			cleanFiles: ture,
			remotePath: 'data1/docker-developer-test/moudules/web/pc/',
		}));
})