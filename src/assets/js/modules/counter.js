import { updateBasket } from './basket';

const countersBtnHandlers = [];
const countersArray = [];

const initCounters = () => {
	const counters = document.querySelectorAll('[data-counter]');

	if (!counters.length) {
		return;
	}

	const initCounter = counter => {
		const minusBtn = counter.querySelector('[data-counter-btn="minus"]');
		const plusBtn = counter.querySelector('[data-counter-btn="plus"]');
		const input = counter.querySelector('input');

		const increaseCounter = () => {
			input.value = Number(input.value) + 1;
		};

		const decreaseCounter = () => {
			if (input.value <= 1) {
				input.value = 1;
				return;
			}

			input.value = Number(input.value) - 1;
		};

		const minusBtnHnadler = () => {
			decreaseCounter();
			updateBasket.total();
		};

		const plusBtnHnadler = () => {
			increaseCounter();
			updateBasket.total();
		};

		minusBtn.addEventListener('click', minusBtnHnadler);
		plusBtn.addEventListener('click', plusBtnHnadler);
		countersArray.push(counter);
		countersBtnHandlers.push({
			minusBtnHnadler,
			plusBtnHnadler,
		});
	};

	counters.forEach(counter => {
		initCounter(counter);
	});
};

export const removeCounterBtnsListners = () => {
	countersArray.forEach((counter, i) => {
		const minusBtn = counter.querySelector('[data-counter-btn="minus"]');
		const plusBtn = counter.querySelector('[data-counter-btn="plus"]');

		minusBtn.addEventListener('click', countersBtnHandlers[i].minusBtnHnadler);
		plusBtn.addEventListener('click', countersBtnHandlers[i].plusBtnHnadler);
	});
};

export default initCounters;
