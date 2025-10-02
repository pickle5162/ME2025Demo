let counter=0;
let timer=0;
let timersum=0;
let timerid=0;
let answernum = Math.floor(Math.random()*101);
function checkguess(){
    timersum+=timer;
    timer=0;
    clearInterval(timerid);
    timerid=setInterval(()=>{
        timer++;
    },10)
    let guessnum= document.getElementById("number").value;
    counter++;
    if(guessnum>answernum){
        alert("too big");
    }
    if(guessnum<answernum){
        alert("too small");
    }
    if(guessnum==answernum){
        alert("You are right. Guess times="+counter);
        timersum+=timer;
        alert(timersum/100.0);
        counter=0;
        timer=0;
        timersum=0;
        answernum = Math.floor(Math.random()*101);
    }
    
}
