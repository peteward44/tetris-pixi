import * as PIXI from 'pixi.js';
import _ from 'lodash';
import definitions from './definitions.js';
import textures from './textures.js';

class Shape {
	constructor( container ) {
		this._container = container;
		this._type = 0;
		this._colour = 0;
		this._sprites = [];
		this._rotation = 0;
		this._x = 0;
		this._y = 0;
		this._speed = 0.05;
	}
	
	get x() {
		return this._x;
	}
	
	get y() {
		return this._y;
	}
	
	get colour() {
		return this._colour;
	}
	
	get rotation() {
		return this._rotation;
	}
	
	get nextRotation() {
		return ( this._rotation + 1 ) % 4;
	}
	
	get type() {
		return this._type;
	}
	
	get blocks() {
		return definitions.ROTATIONS[this._type][this._rotation];
	}
	
	reset( type, colour ) {
		this._rotation = 0;
		this._x = Math.floor( definitions.PLAY_AREA_WIDTH / 2 );
		this._speed = 0.05;
		this._type = type;
		this._colour = colour;
		this._y = -_.maxBy( this.blocks, block => block.y ).y - 1;
		for ( const sprite of this._sprites ) {
			sprite.visible = false;
		}
		const definition = definitions.ROTATIONS[type][0];
		let sprite = null;
		for ( let index=0; index<definition.length; ++index ) {
			if ( this._sprites.length <= index ) {
				sprite = new PIXI.Sprite( textures.get( colour ) );
				this._sprites.push( sprite );
				this._container.addChild( sprite );
			} else {
				sprite = this._sprites[index];
				sprite.texture = textures.get( colour );
			}
			sprite.visible = true;
		}
		this._refreshPosition();		
	}
	
	rotate( rotation ) {
		if ( rotation === undefined ) {
			rotation = this.nextRotation;
		}
		this._rotation = rotation;
		this._refreshPosition();
	}
	
	left() {
		this._x -= 1;
	}
	
	right() {
		this._x += 1;
	}
	
	drop( delta ) {
		this._y += delta * this._speed;
		this._refreshPosition();
	}
	
	fastDrop( down ) {
		this._speed = down ? 0.8 : 0.05;
	}
	
	landed( newY ) {
		this._y = newY;
	}
	
	_refreshPosition() {
		const definition = definitions.ROTATIONS[this._type][this._rotation];
		for ( let index=0; index<definition.length; ++index ) {
			const sprite = this._sprites[index];
			const block = definition[index];
			sprite.position.x = ( this._x + block.x ) * definitions.BLOCK_WIDTH;
			sprite.position.y = ( this._y + block.y ) * definitions.BLOCK_HEIGHT;
		}
	}
}

export default Shape;
