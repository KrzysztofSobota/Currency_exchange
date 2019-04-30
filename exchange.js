"use strict"
window.addEventListener('DOMContentLoaded', value(), false);

function value() {
let currency = [];
    if (currency.length < 8) {
    /* General Min/Max limits for buy values */
        var USD_buy = (Math.floor(10000 * ((Math.random() * 1.8) + 2.7)))/10000;
        var EUR_buy = (Math.floor(10000 * ((Math.random() * 1.6) + 3.2)))/10000;
        var GBP_buy = (Math.floor(10000 * ((Math.random() * 2) + 4.5)))/10000;
        var CHF_buy = (Math.floor(10000 * ((Math.random() * 2.5) + 2)))/10000;
    /* a,b,c,d sell/buy parameters are made for independently calculating sell value for every currencies */
        var a = (Math.random() * 0.01) + 1.015;
        var b = (Math.random() * 0.01) + 1.015;    
        var c = (Math.random() * 0.01) + 1.015;    
        var d = (Math.random() * 0.01) + 1.015;    
        var USD_sell = (Math.floor(10000 * a * USD_buy))/10000;
        var EUR_sell = (Math.floor(10000 * b * EUR_buy))/10000;
        var GBP_sell = (Math.floor(10000 * c * GBP_buy))/10000;
        var CHF_sell = (Math.floor(10000 * d * CHF_buy))/10000;
    } 
    else {
    /* +/-5% fluctuation of exchange rate (preventing deep up/down moving) */
      var USD_buy = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[0]))/10000;
      var EUR_buy = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[2]))/10000;
      var GBP_buy = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[4]))/10000;
      var CHF_buy = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[6]))/10000;
      var USD_sell = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[1]))/10000;
      var EUR_sell = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[3]))/10000;
      var GBP_sell = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[5]))/10000;
      var CHF_sell = (Math.floor(10000 * ((Math.random() * 0.1) + 0.95) * currency[7]))/10000;
    }
currency.push(USD_buy, USD_sell, EUR_buy, EUR_sell, GBP_buy, GBP_sell, CHF_buy, CHF_sell);
    
/* Function changes number of digits after the dot in all currencies to 4 (3.42 -> 3.4200, 2.864 -> 2.8640, etc.) */
  function numberLength(x,y) {
    for (let i=x; i<=y; i++) {
       var txt = currency[i].toString();  
          if (txt.length == 1) {currency[i] = currency[i] + ".0000";}
          else if (txt.length == 3) {currency[i] = currency[i] + "000";}
          else if (txt.length == 4) {currency[i] = currency[i] + "00";}
          else if (txt.length == 5) {currency[i] = currency[i] + "0";}
          else currency[i] = currency[i];
    }
    return currency;
  }

numberLength(0,7)
var currencySymbols = ["USD_buy", "USD_sell", "EUR_buy", "EUR_sell", "GBP_buy", "GBP_sell", "CHF_buy", "CHF_sell"];
    
  for (let i = 0; i <= 7; i++) { document.getElementById(currencySymbols[i]).innerHTML=currency[i];
  }

  if (currency.length >= 16) {
     var Signs = ["USD_buy_Sign", "USD_sell_Sign", "EUR_buy_Sign", "EUR_sell_Sign", "GBP_buy_Sign", "GBP_sell_Sign", "CHF_buy_Sign", "CHF_sell_Sign"];
     numberLength(8,15)
      for (i = 0; i <= 7; i++) {
         if (currency[i+8] < currency[i]) { document.getElementById(currencySymbols[i]).innerHTML=currency[i+8]; document.getElementById(Signs[i]).innerHTML="\u2193"; //low
         } 
          else if (currency[i+8] == currency[i]) 
         { document.getElementById(currencySymbols[i]).innerHTML=currency[i+8]; document.getElementById(Signs[i]).innerHTML="\u2500"; //no change
         } 
          else { document.getElementById(currencySymbols[i]).innerHTML=currency[i+8]; document.getElementById(Signs[i]).innerHTML="\u2191"; //high
         } 
      }
      // Remove "absolete" part of 16-index table
      currency.splice(0,8);
  }
setTimeout("value()",2000);
}