/* eslint-env es6 */
"use strict"
/*window.addEventListener('DOMContentLoaded', value(), false);*/

function value() {
	let USD = document.getElementById('USD_buy').textContent;
		
	let buy = [];
	
	if (USD === '') {
		/* Min/Max range for currency buy values */
		let USD_buy = (Math.random() * 1.8) + 2.7;
		let EUR_buy = (Math.random() * 1.6) + 3.2;
		let GBP_buy = (Math.random() * 2) + 4.5;
		let CHF_buy = (Math.random() * 2.5) + 2;

		buy.push(USD_buy,EUR_buy,GBP_buy,CHF_buy);
	}
		
	/* Making 8-elements (4 buy -> 4 sell) value array */
	function SellBuy1() {
		let sell = [];
			for (let i = 0; i <= 3; i++) {
		/* 'a' parameter changes 4 buy to 4 sell values */
				let a = (Math.random() * 0.01) + 1.015; // 1,5% to 2,5% more
				sell.push(a * buy[i]);
			}

		return [...buy, ...sell];
	}

	let valuesArray1 = SellBuy1();

	/* Making next 8-elements (4 buy, 4 sell -> 8 buy, 8 sell) value array */	
	function SellBuy2() {
		let tempArray = [];
			for (let i = 0; i <= 7; i++) {
	/* 'b' is +/- 5% fluctuation of exchange rate (it prevents huge value change) - 8 different numbers for every sell and buy values */
				let b = (Math.random() * 0.1) + 0.95;
				tempArray.push(b * valuesArray1[i]);        
			}
		
		return tempArray;
	}

	let valuesArray2 = SellBuy2();

	let allValues = [...valuesArray1, ...valuesArray2];
//	console.log(`${allValues} - ONE`);
	return allValues;
}


function fillTable() {
	
	let currency = value();
	
	/* Function changes number of digits after the dot in all currency values to 4 (3.42 -> 3.4200, 2.86474 -> 2.8647, etc.) */
	let tableValues = currency.map(x => x.toFixed(4));
	console.log(tableValues);

//	let cellText = document.getElementById(currencySymbols[i]);
	let cellText = document.querySelectorAll('.value');
	let pos = Array.from(cellText.keys());
	console.log(`${pos}`);
	
	for (let i = 0; i <= 15; i++) {
		if (i <= 7) {
			cellText[i].textContent = `${tableValues[i]}+A`;
			console.log(`${tableValues[i]}+A`);
		}
		else {
			if (currency[i] < currency[i-8]) {
				cellText[i-8].textContent = `${tableValues[i]} ${'\u2193'}`; //low
		  }
		  else if (currency[i] == currency[i-8]) {
			  cellText[i-8].textContent = `${tableValues[i]} ${'\u2500'}`; //no change
		  }
		  else {
			  cellText[i-8].textContent = `${tableValues[i]} ${'\u2191'}`; //high
		  }
			console.log(`${tableValues[i]} A`);
		}
	}
}

fillTable();
let x = 1;
/*do {
	valuesArray1 = valuesArray2;
valuesArray2 = SellBuy2(valuesArray1);
currency = [...valuesArray1, ...valuesArray2];console.log(`${currency} - TWO`);
fillTable(currency);

} while (x++ <= 6);*/



/* All values will go into the array and then transfer on the chart (canvas) */
/*let chartData = [];
chartData.push(currency);console.log(`${chartData}`);*/
		
  
value();
//setTimeout("value()", 1000);