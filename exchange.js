/* eslint-env es6 */
"use strict"
/*window.addEventListener('DOMContentLoaded', value(), false);*/

function value() {
  let currency = [];
    
	/* Min/Max range for currency buy values */
	let USD_buy = (Math.random() * 1.8) + 2.7;
	let EUR_buy = (Math.random() * 1.6) + 3.2;
	let GBP_buy = (Math.random() * 2) + 4.5;
	let CHF_buy = (Math.random() * 2.5) + 2;

	const buyArray = [USD_buy, EUR_buy, GBP_buy, CHF_buy];

	function BuySell() {
		let a_parameter = [];

			for (let i = 0; i <= 3; i++) {
				/* 'a' is the sell/buy parameter - loop is made for
				independently calculating value for every currency */
				let a = (Math.random() * 0.01) + 1.015;
				a_parameter.push(a);
			}

		let USD_sell = a_parameter[0] * buyArray[0];
		let EUR_sell = a_parameter[1] * buyArray[1];
		let GBP_sell = a_parameter[2] * buyArray[2];
		let CHF_sell = a_parameter[3] * buyArray[3];
		
		const values = [USD_sell, EUR_sell, GBP_sell, CHF_sell];

		return values;
	}

	let sellArray = BuySell(buyArray);
	currency = [...buyArray, ...sellArray];

	/* Function changes number of digits after the dot in 
	all currency values to 4 (3.42 -> 3.4200, 2.86474 -> 2.8647, etc.) */
	let tableValues = currency.map(x => x.toFixed(4));
	
//	(Math.floor(10000 * a * USD_buy))/10000
	
      function secondArray() {
				let b_parameter = [];

					for (let i = 0; i <= 7; i++) {
					/* 'b' is +/-5% fluctuation of exchange rate (preventing deep up/down moving) 
					- loop is made for independently calculating sell values for every currency */
						let b = (Math.random() * 0.1) + 0.95;
						b_parameter.push(b);        
					}

				let USD_buy = b_parameter[0] * currency[0];
				let USD_sell = b_parameter[1] * currency[1];
				let EUR_buy = b_parameter[2] * currency[2];
				let EUR_sell = b_parameter[3] * currency[3];
				let GBP_buy = b_parameter[4] * currency[4];
				let GBP_sell = b_parameter[5] * currency[5];
				let CHF_buy = b_parameter[6] * currency[6];
				let CHF_sell = b_parameter[7] * currency[7];
				
				return b_parameter;
			}

			let num = secondArray(currency);
    
   let currencySymbols = ["USD_buy", "USD_sell", "EUR_buy", "EUR_sell", "GBP_buy", "GBP_sell", "CHF_buy", "CHF_sell"];
    
  for (let i = 0; i <= 7; i++) {
    document.getElementById(currencySymbols[i]).textContent = tableValues[i];
  }

  if (currency.length >= 16) {
     let Signs = ["USD_buy_Sign", "USD_sell_Sign", "EUR_buy_Sign", "EUR_sell_Sign", "GBP_buy_Sign", "GBP_sell_Sign", "CHF_buy_Sign", "CHF_sell_Sign"];
     
         
      for (let i = 0; i <= 7; i++) {
         if (currency[i+8] < currency[i]) {
           document.getElementById(currencySymbols[i]).textContent = currency[i+8]; document.getElementById(Signs[i]).textContent="\u2193"; //low
         } 
         else if (currency[i+8] == currency[i]) {
           document.getElementById(currencySymbols[i]).textContent = currency[i+8]; document.getElementById(Signs[i]).textContent="\u2500"; //no change
         } 
         else {
           document.getElementById(currencySymbols[i]).textContent = currency[i+8]; document.getElementById(Signs[i]).textContent="\u2191"; //high
         } 
      }
      
    // Remove "absolete" part of 16-index table
      currency.splice(0,8);
  }
}
setTimeout("value()", 2000);