import * as PIXI from 'pixi.js';
import definitions from './definitions.js';

const textures = [];
let anim = [];

function load() {
	return new Promise( (resolve) => {
		PIXI.loader
			.add('img/graphics@0.5x.json')
			.add("img/anim@0.75x.json")
			.load( () => {
				const loaded = PIXI.loader.resources["img/graphics@0.5x.json"].textures;
				textures[definitions.COLOUR.BLUE] = loaded["img/brick_blue.png"];
				textures[definitions.COLOUR.GREEN] = loaded["img/brick_green.png"];
				textures[definitions.COLOUR.GREY] = loaded["img/brick_grey.png"];
				textures[definitions.COLOUR.PURPLE] = loaded["img/brick_purple.png"];
				textures[definitions.COLOUR.RED] = loaded["img/brick_red.png"];
				textures[definitions.COLOUR.TORQ] = loaded["img/brick_torq.png"];
				textures[definitions.COLOUR.YELLOW] = loaded["img/brick_yellow.png"];
			
				const obj = PIXI.loader.resources["img/anim@0.75x.json"].textures;
				const names = Object.keys( obj ).sort();
				for ( const name of names ) {
					anim.push( obj[name] );
				}
				resolve();
			} );
	} );
}

function get( colour ) {
	return textures[colour];
}

function getAnim() {
	return anim;
}

export default {
	load,
	get,
	getAnim
};
