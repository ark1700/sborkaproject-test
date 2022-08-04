import utils from '../utils/utils';

const closeBtnHandlers = [];
const cardsArray = [];
export const updateBasket = {};

const initBasket = () => {
	const basketBlock = document.querySelector('[data-basket]');

	if (!basketBlock) {
		return;
	}

	const cards = basketBlock.querySelectorAll('[data-basket-card]');
	const extrasBlocks = basketBlock.querySelectorAll('[data-basket-extra]');
	const subTotalBlock = basketBlock.querySelector('[data-basket-subtotal]');
	const totalBlock = basketBlock.querySelector('[data-basket-total]');

	const updateTotal = () => {
		const currentCards = basketBlock.querySelectorAll('[data-basket-card]');
		let subTotal = 0;
		let extrasTotal = 0;

		currentCards.forEach(card => {
			const numberInput = card.querySelector('[data-counter] input');
			const priceBlock = card.querySelector('[data-card-price]');

			if (!numberInput || !priceBlock) {
				return;
			}

			const number = numberInput.value;
			const price = priceBlock.dataset.cardPrice.replace(/\s/g, '');

			subTotal += price * number;
		});

		extrasBlocks.forEach(extraBlock => {
			extrasTotal += Number(extraBlock.dataset.basketExtra.replace(/\s/g, ''));
		});

		subTotalBlock.textContent = utils.formatNumber(subTotal);
		totalBlock.textContent = utils.formatNumber(subTotal + extrasTotal);
	};

	cards.forEach(card => {
		const closeBtn = card.querySelector('[data-basket-card-close]');

		const closeBtnHandler = () => {
			card.remove();
			updateTotal();
		};

		closeBtn.addEventListener('click', closeBtnHandler);
		cardsArray.push(card);
		closeBtnHandlers.push(closeBtnHandler);
	});

	updateTotal();
	updateBasket.total = updateTotal;
};

export const removeCloseBtnListners = () => {
	cardsArray.forEach((card, i) => {
		const closeBtn = card.querySelector('[data-basket-card-close]');

		closeBtn.addEventListener('click', closeBtnHandlers[i]);
	});
};

export default initBasket;
