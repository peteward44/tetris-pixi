import * as PIXI from 'pixi.js';
import tween from './pixi-tween.js';

class ScoreMeter {
	constructor( container, app ) {
		this._container = container;
		this._score = 0;
		this._text = new PIXI.Text( '', { fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center' } );
		this._text.position.x = 100;
		this._text.position.y = 100;
		this._container.addChild( this._text );
		this._refresh();
	}
	
	reset() {
		this._score = 0;
		this._refresh();
	}
	
	add( points ) {
		this._score += points;
		this._refresh();
	}
	
	_refresh() {
		this._text.text = this._score.toString();
	}
}

export default ScoreMeter;
