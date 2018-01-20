import PlayArea from './PlayArea.js';
import ScoreMeter from './ScoreMeter.js';

class GameCycle {	
	constructor( container, app ) {
		this._container = container;
		this._playArea = new PlayArea( this._container, app );
		this._scoreMeter = new ScoreMeter( this._container, app );
		app.ticker.add( delta => this._tick( delta ) );
		
		this._playArea.start();
		
		setInterval( () => {
			this._scoreMeter.add( 100 );
		}, 10000 );
	}
	
	_tick( delta ) {
	}
}

export default GameCycle;
