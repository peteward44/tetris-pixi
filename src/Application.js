import * as PIXI from 'pixi.js';
import tweenManager from 'pixi-tween';
import textures from './textures.js';
import GameCycle from './GameCycle.js';

class Application {
	constructor() {
		this._app = new PIXI.Application();
		document.body.appendChild( this._app.view );
		app.ticker.add( (delta) => {
			PIXI.tweenManager.update();
		});
		textures.load();

		this._gameCycle = new GameCycle( this._app.stage, this._app );
	}
}

export default Application;
