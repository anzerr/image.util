
declare interface Color {
	r: number;
	g: number;
	b: number;
}

declare interface Mask {
	r: number;
	g: number;
	b: number;
	a: number;
}

declare interface Option {
	width: number;
	height: number;
	data?: Buffer;
	channel?: number;
	mask?: Mask;
}

declare class Text {
	constructor(map: any, font: string);
	load(): Promise<any> | any;
	drawChar(char: number, x: number, y: number, size: number, color: Color);
	draw(text: string, x: number, y: number, size?: number, color?: Color);
}

declare class Line {
	constructor(map: any);
	generate(x0: number, y0: number, x1: number, y1: number, cd: (x: number, y: number) => any);
	draw(x0: number, y0: number, x1: number, y1: number, color: Color, width?: number);
}

declare interface FontMap {
   [key: string]: Text;
}

export default class Map {
	data: any;
	width: number;
	height: number;
	channel: number;
	mask: Mask;
	line: Line;
	text: FontMap;

	constructor(option: Option);

	addFont(key: string, font: Buffer | String): Promise<any> | any;
	set(x: number, y: number, color: Color): Map;
	fill(x: number, y: number, color: Color, oY?: number, oX?: number): Map;
	toBuffer(): Buffer;

}
