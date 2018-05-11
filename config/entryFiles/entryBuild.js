const fs = require("fs");
const path = require("path");

const rimraf = require("rimraf")

const entry = require("./entry");

// 定义entryBuild
const entryBuildPath = path.resolve(__dirname, '../../entryBuild');

// 删除entryBuild目录
rimraf.sync(entryBuildPath);

// 创建创建新的entryBuild目录
fs.mkdirSync(entryBuildPath);

// 定义入口文件通用内容模板
const entryContent = (data) => (
`import React from 'react';
import ReactDOM from 'react-dom';

import Index from '../client/views/${data.path}';
import AppLayout from '../client/views/layout/Layout';
	
const root = document.getElementById("root");
ReactDOM.render(
	<AppLayout>
		<Index key='Index' />,
	</AppLayout>,
	root
)
`
)

// 生成webpack entry 入口文件
entry.map((data) => {
	fs.writeFile(entryBuildPath + '/' + data.name + '.js', entryContent(data), 'utf-8', function(err){
		if (err) {
			return console.log(err)
		}
	})
})
