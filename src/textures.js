import * as PIXI from 'pixi.js';
import { Loader } from '@pixi/loaders';
import definitions from './definitions.js';

const textures = [];
let anim = [];

async function loadSpritesheet(atlasData) {
	const spritesheet = new PIXI.Spritesheet(
		PIXI.BaseTexture.from("img/" + atlasData.meta.image),
		atlasData
	);
	await spritesheet.parse();
	const frames = spritesheet.textures;
	textures[definitions.COLOUR.BLUE] = frames["img/brick_blue.png"];
	textures[definitions.COLOUR.GREEN] = frames["img/brick_green.png"];
	textures[definitions.COLOUR.GREY] = frames["img/brick_grey.png"];
	textures[definitions.COLOUR.PURPLE] = frames["img/brick_purple.png"];
	textures[definitions.COLOUR.RED] = frames["img/brick_red.png"];
	textures[definitions.COLOUR.TORQ] = frames["img/brick_torq.png"];
	textures[definitions.COLOUR.YELLOW] = frames["img/brick_yellow.png"];
}

function load() {
	return new Promise((resolve) => {
		const instance = Loader.shared;
		instance.add('graphics', 'img/graphics@0.5x.json');
		
		instance.load(async (loader, resources) => {
			await loadSpritesheet(resources.graphics.data);
			resolve();
		});
	});
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
