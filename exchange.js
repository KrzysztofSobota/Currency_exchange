"use strict";

/*** Making 8-elements value array (4 buy -> 4 buy + 4 sell) ***/

function value() {
	let USD = document.getElementById('USD_buy').textContent;
	let buy = [];

	if (USD === '') {
		/* Min/Max range for currency buy values */
		let USD_buy = (Math.random() * 1.8) + 2.7;
		let EUR_buy = (Math.random() * 1.6) + 3.2;
		let GBP_buy = (Math.random() * 2) + 4.5;
		let CHF_buy = (Math.random() * 2.5) + 2;

		buy.push(USD_buy, EUR_buy, GBP_buy, CHF_buy);
	}

	// a = (Math.random() * 0.01) + 1.015 parameter changes 4 buy to 4 sell values and makes sell values always 1,5%-2,5% more than buy values
	let values = {
		buy: buy,
		sell: buy.map(i => i * ((Math.random() * 0.01) + 1.015)) // [USD_sell, EUR_sell, GBP_sell, CHF_sell]
	};

	for (let i = 0; i < values.length / 2; i++) {
		cellText[i].textContent = `${tableValues(values.buy)[i]}`;
		cellText[i + 1].textContent = `${tableValues(values.sell)[i]}`;
	}

	return values;
}

/* Function changes number of digits after the dot in all currency values to 4 (3.42 -> 3.4200, 2.86474 -> 2.8647, etc.) */
let tableValues = i => i.map(x => x.toFixed(4));

let cellText = document.querySelectorAll('.value');


/*** Making another 8-elements value array from previous array (making 16-elements full array) ***/

function fillTable() {
	let buy_part1 = value().buy;
	let sell_part1 = value().sell;

	function dataTable() {
		// b = (Math.random() * 0.1) + 0.95 is +/- 5% fluctuation of exchange rate (it prevents huge value change between steps)
		let buy_part2 = buy_part1.map(i => i * ((Math.random() * 0.1) + 0.95));

		let values2 = {
			buy_part2: buy_part2,
			sell_part2: buy_part2.map(i => i * ((Math.random() * 0.01) + 1.015))
		};

		for (let i = 0; i < values2.length / 2; i++) {
			cellText[i].textContent = `${tableValues(values2.buy_part2)[i]}`;
			cellText[i + 1].textContent = `${tableValues(values2.sell_part2)[i]}`;
		}

		buy_part1 == buy_part2;

		return values2;
	}

	function getAllData() {

	}

	/* Taking all buy & sell values from array */
	let currencyList = document.querySelector('#quantity');
	currencyList.addEventListener('change', valueSelected);

	function valueSelected() {
		let intervalNumber = currencyList.value;
		console.log(intervalNumber);
		for (let i = 1; i <= intervalNumber; i++) {
			let allBuy = dataTable().buy_part2;
			let allSell = dataTable().sell_part2;
			console.log(allBuy, allSell);
			// chart();
			window.setTimeout(dataTable, 2000);
		}
	}

	let intervalsBtn = document.querySelector('#intervals-btn');
	intervalsBtn.addEventListener('click', valueSelected);

	/* Chart displaying */
	const canvas = document.querySelector('#myCanvas');
	const ctx = canvas.getContext('2d');
	const cW = canvas.width;
	const cH = canvas.height;


	function chart() {
		ctx.clearRect(0, 0, cW, cH);

		valueSelected();

		let buy = valueSelected()[0];
		/* Y axis was scaling 10 times and (0,0) point was moving to bottom-left */
		let Y = cH - 10 * buy;
		console.log(Y);
		/*** Drawing lines into the canvas ***/
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(0, Y);
		for (let i = 1; i <= 10; i++) {
			ctx.lineTo((cW / 10) * i, Y);
		}
	}

	/* All values will go into the array and then transfer on the chart (canvas) */
	const chartData = document.querySelector('#chartbox');
	chartData.addEventListener('click', chart());

}

fillTable();