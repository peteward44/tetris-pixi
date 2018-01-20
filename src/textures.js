import * as PIXI from 'pixi.js';
import definitions from './definitions.js';

const textures = [];

function load() {
	textures[definitions.COLOUR.BLUE] = PIXI.Texture.fromImage( 'img/brick_blue.png' );
	textures[definitions.COLOUR.GREEN] = PIXI.Texture.fromImage( 'img/brick_green.png' );
	textures[definitions.COLOUR.GREY] = PIXI.Texture.fromImage( 'img/brick_grey.png' );
	textures[definitions.COLOUR.PURPLE] = PIXI.Texture.fromImage( 'img/brick_purple.png' );
	textures[definitions.COLOUR.RED] = PIXI.Texture.fromImage( 'img/brick_red.png' );
	textures[definitions.COLOUR.TORQ] = PIXI.Texture.fromImage( 'img/brick_torq.png' );
	textures[definitions.COLOUR.YELLOW] = PIXI.Texture.fromImage( 'img/brick_yellow.png' );	
}

function get( colour ) {
	return textures[colour];
}

export default {
	load,
	get
};
