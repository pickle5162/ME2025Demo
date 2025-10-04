const checkboxAll = document.getElementById("checkbox_all");
const checkboxItems = document.querySelectorAll(".checkbox_item");
checkboxAll.addEventListener("change", () => {
    checkboxItems.forEach(item => item.checked = checkboxAll.checked);
});
checkboxItems.forEach(item => {
    item.addEventListener("change", () => {
        const allChecked = Array.from(checkboxItems).every(item => item.checked);
        checkboxAll.checked = allChecked;
    });
});