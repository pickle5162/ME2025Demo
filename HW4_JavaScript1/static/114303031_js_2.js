document.write('<input type="text" id="number" name="number"></input><br>');
let a=1;
for (let i = 0; i <= 9; i++) {
    if (a%3!=0){
        document.write("<button>" + i + "</button>");
    }
    if (a%3==0){
        document.write("<button>" + i + "</button>");
        document.write("<br>");    
    }
    a++;
}
document.write("<button>clear</button><br>");
document.write("<button>+</button>");
document.write("<button>-</button>");
document.write("<button>*</button>");
document.write("<button>/</button>");
document.write("<button>(</button>");
document.write("<button>)</button>");
document.write("<button>=</button>");
