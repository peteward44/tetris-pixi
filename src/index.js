import 'babel-polyfill';
import Application from './Application.js';

function onLoad() {
	const app = new Application();
	return app;
}

window.onload = onLoad;
