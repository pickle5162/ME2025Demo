let counter=0
let answernum = Math.floor(Math.random()*101);
function checkguess(){
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
        counter=0;
        answernum = Math.floor(Math.random()*101);
    }
}
