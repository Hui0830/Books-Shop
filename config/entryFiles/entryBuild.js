/*const fs = require("fs");
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
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Index from '../client/views/${data.path}';
import AppLayout from '../client/views/layout/layout';
import Router from '../client/config/router';
import store from '../client/store/Store';
	
const root = document.getElementById("root");
ReactDOM.render(
	<BrowserRouter>
		<Provider store={store} >
			<AppLayout>
				<Router key='Index' />,
			</AppLayout>
		</Provider>
	</BrowserRouter>,
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
*/