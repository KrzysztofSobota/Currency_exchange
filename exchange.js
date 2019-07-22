/* eslint-env es6 */
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
		let valuesArray2 = Array1.map(i => i * ((Math.random() * 0.1) + 0.95) );

			for (let j = 0; j < valuesArray2.length; ) {
				if (valuesArray2[`${j}`] > valuesArray2[`${j+1}`]) {
					[valuesArray2[`${j}`], valuesArray2[`${j+1}`]] = [valuesArray2[`${j+1}`], valuesArray2[`${j}`]];
				}
				j = j+2;
			}

			for (let i = 0; i < valuesArray2.length; i++) {
				cellText[i].textContent = `${tableValues(valuesArray2)[i]}`;
			}
		Array1 == valuesArray2;

		return valuesArray2;
	}

// window.setInterval(dataTable, 2000);

/* Choosing currency */
let currencyList = document.querySelector('#currency');
currencyList.addEventListener('change', currencySelected);

function currencySelected() {
  let currencyName = currencyList.value;
dataTable();

	switch (currencyName) {
		case 1:
			currencyName = valuesArray2[0];
			break;
		case 2:
			currencyName = valuesArray2[2];
			break;
		case 3:
			currencyName = valuesArray2[4];
			break;
		case 4:
			currencyName = valuesArray2[6];
			break;
		default:
			currencyName = undefined;
			break;
	}

  return currencyName;       
}

let x = currencySelected();
console.log(x);

/*** Calculating dots position for canvas ***/
  const canvas = document.querySelector('#myCanvas');
  const ctx = canvas.getContext('2d');    
  
  const cW = canvas.width;
  const cH = canvas.height;
  
  function chart() {

	dataTable();
	console.log(dataTable());
    ctx.clearRect(0, 0, cW, cH);
    
 
	/* (0,0) point is moving to bottom-left */    
	let Y = cH;
	
    // taking x and y from the array
    for (let i = 0; i < Array1.length; i++) {      
      
 /* Make a right color for the lines */

    /* if () {
      ctx.fillStyle = 'red';
    }
    else {
      ctx.fillStyle = 'lightred';
	} */    
	
/*** Drawing lines into the canvas ***/
	ctx.beginPath();
    ctx.moveTo(75, 50);
    ctx.lineTo(100, 75);
	ctx.lineTo(100, 25);
	
	  
    }
    
    // window.requestAnimationFrame(chart);
  }
  
/* All values will go into the array and then transfer on the chart (canvas) */
	const chartData = document.querySelector('#chartbox');
	chartData.addEventListener('click', chart());

	
	/* for (let i = 0; i <= 15; i++) {
		if (i <= 7) {
			cellText[i].textContent = `${tableValues[i]}+A`;
			console.log(`${tableValues[i]}+A`);
		} else {
			if (currency[i] < currency[i - 8]) {
				cellText[i - 8].textContent = `${tableValues[i]} ${'\u2193'}`; //low
			} else if (currency[i] == currency[i - 8]) {
				cellText[i - 8].textContent = `${tableValues[i]} ${'\u2500'}`; //no change
			} else {
				cellText[i - 8].textContent = `${tableValues[i]} ${'\u2191'}`; //high
			}
			console.log(`${tableValues[i]} A`);
		}
	} */
}

fillTable();