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
				if ( this._canRotate() ) {
					this._droppingShape.rotate();
					this._keys.confirmKey( definitions.KEYS.UP );
				}
			} else {
				this._droppingShape.fastDrop( this._keys.checkKey( definitions.KEYS.DOWN ) );
			}
			this._moveDroppingShapeDownwards( delta );
		}
	}
	
	_canRotate() {
		const nextRotationBlocks = definitions.ROTATIONS[this._droppingShape.type][this._droppingShape.nextRotation];
		// make sure all blocks are within playarea and not in occupied spaces
		for ( const block of nextRotationBlocks ) {
			const bx = this._droppingShape.x + block.x;
			const by = Math.floor( this._droppingShape.y + block.y );
			if ( bx < 0 || bx >= definitions.PLAY_AREA_WIDTH || by < 0 || by >= definitions.PLAY_AREA_HEIGHT ) {
				return false;
			}
			if ( this._landedBlocks[bx][by] ) {
				return false;
			}
		}
		return true;
	}

	_moveDroppingShapeDownwards( delta ) {
		const oldY = Math.floor( this._droppingShape.y );
		this._droppingShape.drop( delta );
		const newY = Math.floor( this._droppingShape.y );
		if ( oldY !== newY ) {
			const hitY = this._collidedWithLandedBlocks( oldY, newY );
			if ( hitY !== null ) {
				if ( hitY <= 0 ) {
					// shape has finished landing outside the playarea - game over
					this.reset();
					this._newShape();
				} else {
					this._droppingShape.landed( hitY );
					const { x } = this._droppingShape;
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
					this._newShape();
				}
			}
		}
	}

	_collidedWithLandedBlocks( oldY, newY ) {
		let hitValues = [];
		const { x } = this._droppingShape;
		for ( const block of this._droppingShape.blocks ) {
			const bx = x + block.x;
			const by1 = ( oldY >= 0 ? Math.ceil( oldY ) : Math.floor( oldY ) ) + block.y;
			const by2 = ( newY >= 0 ? Math.ceil( newY ) : Math.floor( newY ) ) + block.y;
			// check if we passed through a block between traveling between by1 and by2 (in case we traveled more than 1 block's worth in a single frame)
			for ( let i=by1; i<=by2; ++i ) {
				const test = i + 1;
				if ( test >= 0 && ( test >= definitions.PLAY_AREA_HEIGHT || this._landedBlocks[bx][test] ) ) {
					hitValues.push( i - block.y );
				}
			}
		}
		if ( hitValues.length > 0 ) {
			hitValues.sort( ( lhs, rhs ) => lhs - rhs );
			return hitValues[0];
		} else {
			return null;
		}
	}
}

export default PlayArea;
