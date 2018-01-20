import definitions from './definitions.js';

const repeatInterval = {
	[definitions.KEYS.UP]: 250,
	[definitions.KEYS.DOWN]: 0,
	[definitions.KEYS.LEFT]: 50,
	[definitions.KEYS.RIGHT]: 50
};

const keyMap = {
	[definitions.KEYS.UP]: [38],
	[definitions.KEYS.DOWN]: [40],
	[definitions.KEYS.LEFT]: [37],
	[definitions.KEYS.RIGHT]: [39]
};

class Keys {
	constructor( container, app ) {
		this._keys = new Map();
		window.addEventListener( "keydown", event => this._processKeyPress( event, true ), false );
		window.addEventListener( "keyup", event => this._processKeyPress( event, false ), false );
	}
	
	checkKey( key ) {
		if ( this._keys.get( key ) ) {
			const threshold = Date.now() - ( repeatInterval.hasOwnProperty( key ) ? repeatInterval[key] : 0 );
			const time = this._keys.get( key );
			if ( time > 0 && time <= threshold ) {
				return true;
			}
		}
		return false;
	}
	
	confirmKey( key ) {
		this._keys.set( key, Date.now() );
	}
	
	_mapKeyCodeToKey( keyCode ) {
		for ( const key of Object.keys( keyMap ) ) {
			if ( keyMap[key].includes( keyCode ) ) {
				return key;
			}
		}
		return null;
	}

	_processKeyPress( event, down ) {
		const key = this._mapKeyCodeToKey( event.keyCode );
		if ( key ) {
			const alreadyPressed = this._keys.get( key ) && down;
			if ( !alreadyPressed ) {
				this._keys.set( key, down ? 1 : 0 );
			}
		}
	}
}

export default Keys;
