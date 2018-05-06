const entryBuild = require('../entryFiles/entry');

let entry = {};

entryBuild.map((data) => {
	entry[data.name] = ['./entryBuild/' + data.name + '.js', data.title]
});

module.exports = entry;