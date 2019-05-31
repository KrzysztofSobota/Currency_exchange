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
		/* 'a' parameter change 4 buy to 4 sell values */
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

	let currency = [...valuesArray1, ...valuesArray2];

  if (currency.length === 16) {	
		/* Function changes number of digits after the dot in all currency values to 4 (3.42 -> 3.4200, 2.86474 -> 2.8647, etc.) */
		let tableValues = valuesArray1.map(x => x.toFixed(4));
		
		let currencySymbols = ["USD_buy", "EUR_buy", "GBP_buy", "CHF_buy", "USD_sell", "EUR_sell", "GBP_sell", "CHF_sell"];

		function fillTable() {
			for (let i = 0; i <= 7; i++) {
				 let cellText = document.getElementById(currencySymbols[i]);
					 if (currency[i+8] < currency[i]) {
						 cellText.textContent = `${tableValues[i]} ${'\u2193'}`; //low
					 } 
					 else if (currency[i+8] == currency[i]) {
						 cellText.textContent = `${tableValues[i]} ${'\u2500'}`; //no change
					 } 
					 else {
						 cellText.textContent = `${tableValues[i]} ${'\u2191'}`; //high
					 } 
			}
		}
		fillTable();
		
					 
    // Remove "absolete" part of 16-index table
//      currency.splice(0,8);
  }
}
setTimeout("value()", 2000);