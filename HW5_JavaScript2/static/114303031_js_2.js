const checkboxAll = document.getElementById("checkbox_all");
const checkboxItems = document.querySelectorAll(".checkbox_item");
let stock1=document.getElementById("stock1")
let stock2=document.getElementById("stock2")
let stock3=document.getElementById("stock3")
stock1.textContent="49";
stock2.textContent="99";
stock3.textContent="149";
function increase(quantityId, stockId) {
    const input = document.getElementById(quantityId);
    const stock = document.getElementById(stockId);
    let stockValue = Number(stock.textContent);
    if (stockValue > 0) {
        input.value = Number(input.value) + 1;
        stock.textContent = stockValue - 1;
  }
} 
function decrease(quantityId, stockId) {
    const input = document.getElementById(quantityId);
    const stock = document.getElementById(stockId);
    let stockValue = Number(stock.textContent);
    if (input.value > 1){
        input.value = Number(input.value) - 1;
        stock.textContent = stockValue + 1;
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
