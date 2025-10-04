const checkboxAll = document.getElementById("checkbox_all");
const checkboxItems = document.querySelectorAll(".checkbox_item");
let stock1=document.getElementById("stock1")
let stock2=document.getElementById("stock2")
let stock3=document.getElementById("stock3")
function increase(id) {
  const input = document.getElementById(id);
  input.value = Number(input.value) + 1;
} 
function decrease(id) {
  const input = document.getElementById(id);
  if (input.value > 1) input.value = Number(input.value) - 1;
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
stock1.textContent="50";
stock2.textContent="100";
stock3.textContent="150";