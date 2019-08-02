class Line {

	constructor(map) {
		this.map = map;
	}

	generate(x0, y0, x1, y1, cd) {
		let dx = x1 - x0, dy = y1 - y0;
		let adx = Math.abs(dx), ady = Math.abs(dy);
		let eps = 0, sx = dx > 0 ? 1 : -1, sy = dy > 0 ? 1 : -1;
		if (adx > ady) {
			for (let x = x0, y = y0; sx < 0 ? x >= x1 : x <= x1; x += sx) {
				cd(x, y);
				eps += ady;
				if ((eps << 1) >= adx) {
					y += sy;
					eps -= adx;
				}
			}
		} else {
			for (let x = x0, y = y0; sy < 0 ? y >= y1 : y <= y1; y += sy) {
				cd(x, y);
				eps += adx;
				if ((eps << 1) >= ady) {
					x += sx;
					eps -= ady;
				}
			}
		}
	}

	draw(x0, y0, x1, y1, color, width = 1) {
		this.generate(x0, y0, x1, y1, (x, y) => {
			return (width === 1) ? this.map.set(x, y, color) : this.map.fill(x, y, color, width);
		});
	}

}

module.exports = Line;
