let counter=0;
let timersum=0;
let timer=0;
let timerid=0;
let timecounter=1;
let answernum = Math.floor(Math.random()*101);
let timerdisplay = document.getElementById("timerdisplay");
let container = document.getElementById("container");
let hint = document.getElementById("hint");
document.getElementById("number").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        checkguess();
    }
});
function checkguess(){
    if(counter===0){
        clearInterval(timerid);
        timerid=setInterval(()=>{
            timer+=10;
            timerdisplay.textContent="用時"+(timer/1000.0)+"秒"
        },10)
    }
    let guessnum= document.getElementById("number").value;
    counter++;
    if(guessnum>answernum){
        hint.textContent = "太大了";
    }
    if(guessnum<answernum){
        hint.textContent = "太小了";
    }
    if(guessnum==answernum){
        let newParagraph = document.createElement("p");
        container.appendChild(newParagraph);
        clearInterval(timerid);
        newParagraph.textContent =timecounter+". 猜了"+counter+"次,耗時"+(timer/1000.0)+"秒";
        
        alert("You are right. Guess times="+counter);
        timersum+=timer;
        
        counter=0;
        answernum = Math.floor(Math.random()*101);
        timecounter++;
    }
    
}
