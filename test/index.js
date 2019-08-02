
const Map = require('../index.js'),
	bmp = require('bmp.util'),
	fs = require('fs.promisify');

const map = new Map({
	width: 500,
	height: 500,
	mask: {r: 3, g: 2, b: 1, a: 0}
});

const COLOR = {
	RED: {r: 255, g: 0, b: 0},
	BLUE: {r: 0, g: 0, b: 255},
	WHITE: {r: 255, g: 255, b: 255},
};

map.addFont('cherry', './node_modules/bdf.util/test/cherry-10-b.bdf').then(() => {
	map.fill(0, 0, COLOR.RED, 5);
	map.text.cherry.draw('cat', 10, 10);
	map.text.cherry.draw('dog', 50, 10, 2, COLOR.BLUE);
	map.text.cherry.draw('foo', 200, 100, 5, COLOR.RED);
	map.line.draw(0, 0, 500, 500, COLOR.RED, 1);
	map.line.draw(200, 0, 500, 500, COLOR.RED, 2);
	map.line.draw(500, 0, 0, 500, COLOR.BLUE, 3);
}).then(() => {
	return fs.writeFile('./test/example.bmp', bmp.encode({
		width: map.width,
		height: map.height,
		endian: true,
		data: map.toBuffer()
	}).data);
}).catch(console.log);
