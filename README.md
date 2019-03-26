
### `Intro`
Interface to interact with a rgb object instead of a buffer

### `Example`
``` javascript
const bmp = require('bmp.util'),
	Map = require('image.util'),
	fs = require('fs');

let data = fs.readFileSync('image.bmp');
let image = new Map(bmp.decode(data));

for (let x in image.data) {
	for (let y in image.data[x]) {
		if (image.data[x][y].r === 255 || (x % 2 == 0 && y % 2 === 0)) {
			image.data[x][y].r = 0;
		}
	}
}

fs.writeFileSync('copy.bmp', bmp.encode(image.toBuffer()).data);
```