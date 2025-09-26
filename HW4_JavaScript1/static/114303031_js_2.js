document.write('<input type="text" id="number" name="number"></input><br>');
let a=1;
for (let i = 0; i <= 9; i++) {
    if (a%3!=0){
        document.write("<button onclick=\"input("+i+")\">"+i+"</button>");
    }
    if (a%3==0){
        document.write("<button onclick=\"input("+i+")\">"+i+"</button>");
        document.write("<br>");    
    }
    a++;
}   
document.write("<button onclick=\"clearDisplay()\">clear</button><br>");  
document.write("<button onclick=\"input('+')\">+</button>");
document.write("<button onclick=\"input('-')\">-</button>");    
document.write("<button onclick=\"input('*')\">*</button>");
document.write("<button onclick=\"input('/')\">/</button>");
document.write("<button onclick=\"input('(')\">(</button>");
document.write("<button onclick=\"input(')')\">)</button>");
document.write("<button onclick=\"count('=')\">=</button>");
function input(val) {
    document.getElementById("number").value+=val;
}
function clearDisplay() {
    document.getElementById("number").value="";
}
function count(){
    document.getElementById("number").value=
    eval(document.getElementById("number").value);
    alert(document.getElementById("number").value);
}