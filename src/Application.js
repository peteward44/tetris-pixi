import * as PIXI from 'pixi.js';
import { tweenManager } from './pixi-tween.js';
import textures from './textures.js';
import GameCycle from './GameCycle.js';
//import Animation from './Animation.js';

class Application {
	constructor() {
		this._app = new PIXI.Application( { resolution: 0.75 } );
		document.body.appendChild( this._app.view );
		this.start();
	}
	
	async start() {
		await textures.load();
		this._app.ticker.add( (delta) => {
			tweenManager.update();
		});
		this._gameCycle = new GameCycle( this._app.stage, this._app );
		//		this._animation = new Animation( this._app, this._app.stage, textures.getAnim() );
		
		//		this._animation.play();
	}
}

export default Application;
