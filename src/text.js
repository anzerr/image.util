
const {bitmap} = require('bdf.util');

const WHITE = {r: 255, g: 255, b: 255};

class Text {

	constructor(map, font) {
		this.map = map;
		this.font = font;
		this.char = null;
	}

	load() {
		if (this.char) {
			return Promise.resolve();
		}
		let p = bitmap(this.font);
		if (p instanceof Promise) {
			return p.then((char) => (this.char = char));
		}
		return (this.char = p);
	}

	drawChar(c, x, y, size, color) {
		if (!this.char) {
			throw new Error('missing char map try loading before draw');
		}
		let char = this.char[c], map = char.bitmap, offset = char.offset;
		for (let i = 0; i < map.length; i++) {
			for (let v = 0; v < map[i].length; v++) {
				if (map[i][v]) {
					if (size === 1) {
						this.map.set(x + (i * size) + offset.x, y + (v * size) + offset.y, color);
					} else {
						this.map.fill(x + (i * size) + offset.x, y + (v * size) + offset.y, color, size);
					}
				}
			}
		}
		return char.width;
	}

	draw(text, x, y, size = 1, color = WHITE) {
		if (!this.char) {
			throw new Error('missing char map try loading before draw');
		}
		let lines = text.split('\n'), s = 10 * size, max = 0;
		for (let v = 0; v < lines.length; v++) {
			let buff = Buffer.from(lines[v]), offset = 0;
			for (let i = 0; i < buff.length; i++) {
				if (buff[i] === 9) {
					offset += (s * 4);
				} else {
					offset += this.drawChar(buff[i], x + (v * s), y + offset, size, color) * size;
				}
			}
			max = Math.max(max, offset);
		}
		return [lines.length * s, max];
	}

}

module.exports = Text;
