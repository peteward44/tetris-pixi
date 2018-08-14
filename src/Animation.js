import * as PIXI from 'pixi.js';

class Animation {
	constructor( app, container, frames ) {
		this._msPerFrame = 0;
		this._taken = 0;
		this._playing = false;
		this._app = app;
		this._container = container;
		this._frames = frames;
		
		this._sprite = new PIXI.Sprite( this._frames[0] );
		this._sprite.position.x = 100;//-1500;
		this._sprite.position.y = 100;//-500;
		this._sprite.visible = true;
		this._container.addChild( this._sprite );

		this._app.ticker.add( delta => this._update( delta ) );
	}
	
	reset() {
	}
	
	play( fps = 30 ) {
		this._playing = true;
		this._msPerFrame = 1000.0 / fps;
		this._taken = 0;
	}
	
	_update( delta ) {
		if ( this._playing ) {
			this._taken += this._app.ticker.elapsedMS;
			const frameIndex = Math.floor( this._taken / this._msPerFrame );
			if ( frameIndex >= this._frames.length ) {
				this.play();
			} else {
				//				console.log( `frameIndex=${frameIndex}` );
				this._sprite.texture = this._frames[frameIndex];
			}
		}
	}
}

export default Animation;
