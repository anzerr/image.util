
### `Intro`
Interface to interact with a rgb object instead of a buffer

#### `Install`
``` bash
npm install --save git+ssh://git@github.com/anzerr/image.util.git
```

### `Example`
``` javascript
const bmp = require('bmp.util'),
	Map = require('image.util'),
	fs = require('fs');

let data = fs.readFileSync('image.bmp'), decode = bmp.decode(data);
let image = new Map({
	width: decode.width,
	height: decode.height,
	channel: decode.channel, // 4
	mask: decode.mask, // {r: 0, g: 1, b: 2, a: 3}
	data: decode.data
});

for (let x in image.data) {
	for (let y in image.data[x]) {
		if (image.data[x][y].r === 255 || (x % 2 == 0 && y % 2 === 0)) {
			image.data[x][y].r = 0;
		}
	}
}

fs.writeFileSync('copy.bmp', bmp.encode(image.toBuffer()).data);
```