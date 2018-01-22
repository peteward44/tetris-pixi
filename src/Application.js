import * as PIXI from 'pixi.js';
import './pixi-tween.js';
import './fetch.js';
import textures from './textures.js';
import GameCycle from './GameCycle.js';

class Application {
	constructor() {
		this._app = new PIXI.Application();
		document.body.appendChild( this._app.view );
		this.start();
	}
	
	async start() {
		await textures.load();
		this._app.ticker.add( (delta) => {
			PIXI.tweenManager.update();
		});
		this._gameCycle = new GameCycle( this._app.stage, this._app );
	}
}

export default Application;
