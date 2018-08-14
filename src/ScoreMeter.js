import * as PIXI from 'pixi.js';

class ScoreMeter {
	constructor( container, app ) {
		this._container = container;
		this._score = 0;
		this._text = new PIXI.Text( '', {
			fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' 
		} );
		this._text.position.x = 100;
		this._text.position.y = 100;
		this._text.anchor.x = 0.5;
		this._text.anchor.y = 0.5;
		this._container.addChild( this._text );
		this._refresh();
	}
	
	reset() {
		this._score = 0;
		this._refresh();
	}
	
	add( points ) {
		this._score += points;
		const tween = PIXI.tweenManager.createTween( this._text );
		tween.from( { scale: { x: 1, y: 1 } } );
		tween.to( { scale: { x: 3, y: 3 } } );
		tween.time = 1000;
		tween.easing = PIXI.tween.Easing.linear();//PIXI.tween.Easing.outBounce();
		tween.start();
		this._refresh();
	}
	
	_refresh() {
		this._text.text = this._score.toString();
	}
}

export default ScoreMeter;
