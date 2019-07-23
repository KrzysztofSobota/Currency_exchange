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
	let sell = buy.map(i => i * ((Math.random() * 0.01) + 1.015)); // [USD_sell, EUR_sell, GBP_sell, CHF_sell]

	let valuesArray1 = [];
	for (let index = 0; index < buy.length; index++) {
		// buy, sell, buy, sell,... etc.
		valuesArray1.push(buy[index], sell[index]);
	}

	for (let i = 0; i < valuesArray1.length; i++) {
		cellText[i].textContent = `${tableValues(valuesArray1)[i]}`;
	}

	return valuesArray1;
}

/* Function changes number of digits after the dot in all currency values to 4 (3.42 -> 3.4200, 2.86474 -> 2.8647, etc.) */
let tableValues = i => i.map(x => x.toFixed(4));

let cellText = document.querySelectorAll('.value');


/*** Making another 8-elements value array from previous array (making 16-elements full array) ***/

function fillTable() {
	let Array1 = value();

	console.log(Array1);

	// let pos = Array.from(cellText.keys());

	function dataTable() {
		// b = (Math.random() * 0.1) + 0.95 is +/- 5% fluctuation of exchange rate (it prevents huge value change between steps)
		let valuesArray2 = Array1.map(i => i * ((Math.random() * 0.1) + 0.95));

		for (let j = 0; j < valuesArray2.length;) {
			if (valuesArray2[`${j}`] > valuesArray2[`${j+1}`]) {
				[valuesArray2[`${j}`], valuesArray2[`${j+1}`]] = [valuesArray2[`${j+1}`], valuesArray2[`${j}`]];
			}
			j = j + 2;
		}

		for (let i = 0; i < valuesArray2.length; i++) {
			cellText[i].textContent = `${tableValues(valuesArray2)[i]}`;
		}
		Array1 == valuesArray2;

		return valuesArray2;
	}

	window.setInterval(dataTable, 2000);

	/* Choosing currency */
	let currencyList = document.querySelector('#currency');
	currencyList.addEventListener('change', currencySelected);

	function currencySelected() {
		let currencyIndex = currencyList.selectedIndex;
		let currencyValue;

		function values(name) {
			let buyValue = document.querySelector(`#${name}_buy`).innerHTML;
			let sellValue = document.querySelector(`#${name}_sell`).innerHTML;
			currencyValue = [Number(buyValue), Number(sellValue)];

			return currencyValue;
		}


		switch (currencyIndex) {
			case 1:
				currencyValue == values('USD');
				break;
			case 2:
				currencyValue == values('EUR');
				break;
			case 3:
				currencyValue == values('GBP');
				break;
			case 4:
				currencyValue == values('CHF');
				break;
		}

		return currencyValue;
	}

	let currencyBtn = document.querySelector('#currency-btn');
	currencyBtn.addEventListener('click', chart);

	const canvas = document.querySelector('#myCanvas');
	const ctx = canvas.getContext('2d');

	const cW = canvas.width;
	const cH = canvas.height;
	

	function chart() {
		ctx.clearRect(0, 0, cW, cH);

		currencySelected();		

		let buy = currencySelected()[0];
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

		let sell = currencySelected()[1];
		
    }
	chart();

		// window.requestAnimationFrame(chart);

	/* All values will go into the array and then transfer on the chart (canvas) */
	const chartData = document.querySelector('#chartbox');
	chartData.addEventListener('click', chart());

}

fillTable();