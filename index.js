
class Map {

	constructor(option) {
		this.data = {};
		this.width = option.width;
		this.height = option.height;
		this.channel = 4 || option.channel;
		this.mask = option.mask || {r: 0, g: 1, b: 2, a: 3};
		if (option.data) {
			this.load(option.data);
		} else {
			for (let y = 0; y < this.height; y++) {
				this.data[y] = {};
				for (let x = 0; x < this.width; x++) {
					this.data[y][x] = {r: 0, g: 0, b: 0, a: 0};
				}
			}
		}
	}

	load(data) {
		for (let y = 0; y < this.height; y++) {
			this.data[y] = {};
			for (let x = 0; x < this.width; x++) {
				let pos = ((y * this.width) + x) * this.channel;
				this.data[y][x] = {
					r: data[pos + this.mask.r],
					g: data[pos + this.mask.g],
					b: data[pos + this.mask.b]
				};
				if (this.channel === 4) {
					this.data[y][x].a = data[pos + this.mask.a];
				}
			}
		}
		return this;
	}

	set(y, x, color) {
		if (this.data[y] && this.data[y][x]) {
			for (let i in color) {
				this.data[y][x][i] = color[i];
			}
		}
		return this;
	}

	fill(y, x, color, oY = 1, oX) {
		oX = oX || oY;
		for (let y1 = 0; y1 < oY; y1++) {
			for (let x1 = 0; x1 < oX; x1++) {
				this.set(y + y1, x + x1, color);
			}
		}
		return this;
	}

	toBuffer() {
		let d = Buffer.alloc(this.width * this.height * this.channel);
		for (let y in this.data) {
			for (let x in this.data[y]) {
				let pos = ((Number(y) * this.width) + Number(x)) * this.channel;
				d[pos + this.mask.r] = this.data[y][x].r;
				d[pos + this.mask.g] = this.data[y][x].g;
				d[pos + this.mask.b] = this.data[y][x].b;
				if (this.channel === 4) {
					d[pos + this.mask.a] = this.data[y][x].a;
				}
			}
		}
		return d;
	}

}

module.exports = Map;
