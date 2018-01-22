import * as PIXI from 'pixi.js';
import definitions from './definitions.js';

const textures = [];

function load() {
	return new Promise( resolve => {
		PIXI.loader
		.add('img/graphics.json')
		.load( () => {
			const loaded = PIXI.loader.resources["img/graphics.json"].textures;
			textures[definitions.COLOUR.BLUE] = loaded["img/brick_blue.png"];
			textures[definitions.COLOUR.GREEN] = loaded["img/brick_green.png"];
			textures[definitions.COLOUR.GREY] = loaded["img/brick_grey.png"];
			textures[definitions.COLOUR.PURPLE] = loaded["img/brick_purple.png"];
			textures[definitions.COLOUR.RED] = loaded["img/brick_red.png"];
			textures[definitions.COLOUR.TORQ] = loaded["img/brick_torq.png"];
			textures[definitions.COLOUR.YELLOW] = loaded["img/brick_yellow.png"];
			resolve();
		} );
	} );
}

function get( colour ) {
	return textures[colour];
}

export default {
	load,
	get
};
