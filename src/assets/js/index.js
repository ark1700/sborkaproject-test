import { gsap } from 'gsap';
import initBasket, { removeCloseBtnListners } from './modules/basket';
import initCounters, { removeCounterBtnsListners } from './modules/counter';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

global.gsap = gsap;

gsap.defaults({
	overwrite: 'auto',
});

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			initBasket();
			initCounters();
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept(() => {
		removeCloseBtnListners();
		removeCounterBtnsListners();
	});
}
