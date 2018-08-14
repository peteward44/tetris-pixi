import * as PIXI from 'pixi.js';

class TileMap {
	/**
	 * @param {PIXI.Point} dimensions
	 */
	constructor( container, app, dimensions ) {
		this._container = container;
		this._app = app;
		
		this._tiles = [];
		
		this._initSprites( dimensions );
	}
	
	_initSprites( dimensions ) {
		this._tiles.length = 0;
		for ( let x=0; x<dimensions.x; ++x ) {
			for ( let y=0; y<dimensions.y; ++y ) {
				this._tiles.push( new PIXI.Sprite( '' ) );
			}
		}
	}
}

export default TileMap;
