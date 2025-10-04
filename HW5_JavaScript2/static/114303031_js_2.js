const checkboxAll = document.getElementById("checkbox_all");
const checkboxItems = document.querySelectorAll(".checkbox_item");
let stock1=document.getElementById("stock1");
let stock2=document.getElementById("stock2");
let stock3=document.getElementById("stock3");
stock1.textContent="49";
stock2.textContent="99";
stock3.textContent="149";
const initialStocks = {
    stock1: 49,
    stock2: 99,
    stock3: 149
};
cost1.textContent="500";
cost2.textContent="1000";
cost3.textContent="2000";
function increase(quantityId,stockId,costId,unitPrice) {
    const quantity = document.getElementById(quantityId);
    const stock = document.getElementById(stockId);
    const cost = document.getElementById(costId);
    let stockValue = Number(stock.textContent);
    let quantityValue = Number(quantity.value);
    if (stockValue > 0) {
        quantity.value=quantityValue+1;
        stock.textContent=stockValue-1;
        cost.textContent=(quantityValue+1)*unitPrice;
  }
}
function decrease(quantityId,stockId,costId,unitPrice) {
    const quantity = document.getElementById(quantityId);
    const stock = document.getElementById(stockId);
    const cost = document.getElementById(costId);
    let stockValue = Number(stock.textContent);
    let quantityValue = Number(quantity.value);
    if (quantity.value > 1){
        quantity.value=quantityValue-1;
        stock.textContent=stockValue+1;
        cost.textContent=(quantityValue-1)*unitPrice;
    }
}
function changeQuantity(quantityId,stockId,costId,unitPrice){
    const quantity = document.getElementById(quantityId);
    const stock = document.getElementById(stockId);
    const cost = document.getElementById(costId);
    let stockValue = Number(stock.textContent);
    let quantityValue=quantity.value;
    if (quantityValue==="") {
        stock.textContent=initialStocks[stockId];
        return;
    }
    if (quantityValue>=1&&quantityValue<=initialStocks[stockId]) {
        cost.textContent=quantityValue*unitPrice;
        stock.textContent=initialStocks[stockId]-quantityValue;
        return;
    }
    if (quantityValue>initialStocks[stockId]) {
        quantity.value=initialStocks[stockId];
        cost.textContent=(initialStocks[stockId]+1)*unitPrice;
        stock.textContent="0";
        return;
    }
    if (quantityValue<1) {
        quantity.value=1;
        cost.textContent=unitPrice;
        return;
    }
    
}
function fixQuantity(quantityId, stockId, costId, unitPrice) {
    const quantity = document.getElementById(quantityId);
    if (quantity.value === "") {
        quantity.value = 1;
        stock.textContent=initialStocks[stockId];
    }
}


checkboxAll.addEventListener("change", () => {
    checkboxItems.forEach(item => item.checked = checkboxAll.checked);
});
checkboxItems.forEach(item => {
    item.addEventListener("change", () => {
        const allChecked = Array.from(checkboxItems).every(item => item.checked);
        checkboxAll.checked = allChecked;
    });
});
