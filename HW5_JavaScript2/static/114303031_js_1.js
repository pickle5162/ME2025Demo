let counter=0;
let timer=0;
let timersum=0;
let timerid=0;
let answernum = Math.floor(Math.random()*101);
let container = document.getElementById("container");
function checkguess(){
    let newParagraph = document.createElement("p");
    timersum+=timer;
    timer=0;
    clearInterval(timerid);
    timerid=setInterval(()=>{
        timer++;
    },10)
    let guessnum= document.getElementById("number").value;
    counter++;
    if(guessnum>answernum){
        container.textContent = "太大了";
    }
    if(guessnum<answernum){
        container.textContent = "太小了";
    }
    if(guessnum==answernum){
        alert("You are right. Guess times="+counter);
        timersum+=timer;
        newParagraph.textContent = "猜了"+counter+"次,耗時秒";
        alert(timersum/100.0);
        counter=0;
        timer=0;
        timersum=0;
        answernum = Math.floor(Math.random()*101);
    }
    container.appendChild(newParagraph);
}
