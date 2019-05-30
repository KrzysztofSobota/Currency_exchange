/* eslint-env es6 */
"use strict"
/*window.addEventListener('DOMContentLoaded', value(), false);*/

function value() {
	
		/* Min/Max range for currency buy values */
		let USD_buy = (Math.random() * 1.8) + 2.7;
		let EUR_buy = (Math.random() * 1.6) + 3.2;
		let GBP_buy = (Math.random() * 2) + 4.5;
		let CHF_buy = (Math.random() * 2.5) + 2;

		let buy = [USD_buy, EUR_buy, GBP_buy, CHF_buy];
		
	/* Making 8-elements (4 buy, 4 sell) value array */
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

//	(Math.floor(10000 * a * USD_buy))/10000
		
	function SellBuy2() {
		let tempArray = [];
			for (let i = 0; i <= 7; i++) {
	/* 'b' is +/- 5% fluctuation of exchange rate (it prevents deep up/down value change) - 8 different numbers for sell and buy values */
				let b = (Math.random() * 0.1) + 0.95;
				tempArray.push(b * valuesArray1[i]);        
			}
		
		return tempArray;
	}

	let valuesArray2 = SellBuy2();
//alert(`${valuesArray1.length} , ${valuesArray2.length}`);
	let currency = [...valuesArray1, ...valuesArray2];
	
	/* Function changes number of digits after the dot in 
	all currency values to 4 (3.42 -> 3.4200, 2.86474 -> 2.8647, etc.) */
	let tableValues = currency.map(x => x.toFixed(4));
	
  let currencySymbols = ["USD_buy", "EUR_buy", "GBP_buy", "CHF_buy", "USD_sell", "EUR_sell", "GBP_sell", "CHF_sell"];
    
  for (let i = 0; i <= 7; i++) {
    document.getElementById(currencySymbols[i]).textContent = tableValues[i];
  }

  if (currency.length >= 16) {
     let Signs = ["USD_buy_Sign", "EUR_buy_Sign", "GBP_buy_Sign", "CHF_buy_Sign", "USD_sell_Sign", "EUR_sell_Sign", "GBP_sell_Sign", "CHF_sell_Sign"];
     
		for (let i = 0; i <= 7; i++) {
			 if (currency[i+8] < currency[i]) {
				 document.getElementById(currencySymbols[i]).textContent = `${tableValues[i+8]} ${'\u2193'}`; //low
			 } 
			 else if (currency[i+8] == currency[i]) {
				 document.getElementById(currencySymbols[i]).textContent = `${tableValues[i+8]} ${'\u2500'}`; //no change
			 } 
			 else {
				 document.getElementById(currencySymbols[i]).textContent = `${tableValues[i+8]} ${'\u2191'}`; //high
			 } 
		}
      
    // Remove "absolete" part of 16-index table
      currency.splice(0,8);
  }
}
setTimeout("value()", 2000);