import * as PIXI from 'pixi.js';
import Shape from './Shape.js';
import textures from './textures.js';
import Keys from './Keys.js';
import definitions from './definitions.js';

function pickRandom( object ) {
	const keys = Object.keys( object );
	const key = keys[Math.floor( Math.random() * keys.length )];
	return object[key];
}

class PlayArea {	
	constructor( container, app ) {
		this._container = container;
		this._droppingShape = null;
		this._keys = new Keys();
		app.ticker.add( delta => this._tick( delta ) );
		this._droppingShape = new Shape( this._container );

		this._landedBlocks = new Array( definitions.PLAY_AREA_WIDTH );
		for ( let i=0; i<definitions.PLAY_AREA_WIDTH; ++i ) {
			this._landedBlocks[i] = new Array( definitions.PLAY_AREA_HEIGHT );
		}
	}
	
	start() {
		this._newShape();
	}
	
	reset() {
		for ( let x=0; x<this._landedBlocks.length; ++x ) {
			for ( let y=0; y<this._landedBlocks[x].length; ++y ) {
				const sprite = this._landedBlocks[x][y];
				if ( sprite ) {
					sprite.visible = false;
					this._container.removeChild( sprite );
					this._landedBlocks[x][y] = null;
				}
			}
		}
	}
	
	_newShape() {
		const type = pickRandom( definitions.TYPE );
		const colour = pickRandom( definitions.COLOUR );
		this._droppingShape.reset( type, colour );
	}
	
	_testSidewaysMovement( diff ) {
		for ( const block of this._droppingShape.blocks ) {
			const bx = this._droppingShape.x + block.x + diff;
			const by1 = Math.floor( this._droppingShape.y ) + block.y;
			const by2 = Math.floor( this._droppingShape.y + 1 ) + block.y;
			if ( bx < 0 || bx >= definitions.PLAY_AREA_WIDTH || this._landedBlocks[bx][by1] || this._landedBlocks[bx][by2] ) {
				return false;
			}
		}
		return true;
	}
	
	_tick( delta ) {
		if ( this._droppingShape ) {
			if ( this._keys.checkKey( definitions.KEYS.LEFT ) ) {
				if ( this._testSidewaysMovement( -1 ) ) {
					this._droppingShape.left();
					this._keys.confirmKey( definitions.KEYS.LEFT );
				}
			} else if ( this._keys.checkKey( definitions.KEYS.RIGHT ) ) {
				if ( this._testSidewaysMovement( 1 ) ) {
					this._droppingShape.right();
					this._keys.confirmKey( definitions.KEYS.RIGHT );
				}
			} else if ( this._keys.checkKey( definitions.KEYS.UP ) ) {
				this._droppingShape.rotate();
				this._keys.confirmKey( definitions.KEYS.UP );
			} else {
				this._droppingShape.fastDrop( this._keys.checkKey( definitions.KEYS.DOWN ) );
			}
			this._moveDroppingShapeDownwards( delta );
		}
	}

	_moveDroppingShapeDownwards( delta ) {
		const oldY = Math.floor( this._droppingShape.y );
		this._droppingShape.drop( delta );
		const newY = Math.floor( this._droppingShape.y );
		if ( oldY !== newY ) {
			const hitY = this._collidedWithLandedBlocks( oldY, newY );
			if ( hitY >= 0 ) {
				this._droppingShape.landed( hitY );
				const x = this._droppingShape.x;
				for ( const block of this._droppingShape.blocks ) {
					const bx = x + block.x;
					const by = hitY + block.y;
					if ( !this._landedBlocks[bx][by] ) {
						const sprite = new PIXI.Sprite( textures.get( this._droppingShape.colour ) );
						
						sprite.position.x = bx * definitions.BLOCK_WIDTH;
						sprite.position.y = by * definitions.BLOCK_HEIGHT;

						this._container.addChild( sprite );
						this._landedBlocks[bx][by] = sprite;
					}
				}
				if ( !this._gameFinished() ) {
					this._newShape();
				} else {
					this.reset();
					this._newShape();
				}
			}
		}
	}

	_collidedWithLandedBlocks( oldY, newY ) {
		const x = this._droppingShape.x;
		for ( const block of this._droppingShape.blocks ) {
			const bx = x + block.x;
			const by1 = Math.ceil( oldY ) + block.y;
			const by2 = Math.ceil( newY ) + block.y;
			// check if we passed through a block between traveling between by1 and by2 (in case we traveled more than 1 block's worth in a single frame)
			for ( let i=by1; i<=by2; ++i ) {
				const test = i + 1;
				if ( test >= definitions.PLAY_AREA_HEIGHT || this._landedBlocks[bx][test] ) {
					return i - block.y;
				}
			}
		}
		return -1;
	}

	_gameFinished() {
		// if any blocks in the top row are filled, game over
		for ( let x=0; x<this._landedBlocks.length; ++x ) {
			if ( this._landedBlocks[x][0] ) {
				return true;
			}
		}
		return false;
	}
}

export default PlayArea;
