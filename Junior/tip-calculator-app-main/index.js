var tips=0;
var custom=0;
var bill=0;
var numPeople=0;
var lastClick="0";

function bills() {
    bill=document.getElementById("total").value;
    bill= Number(bill);
    resultados();
}
function tip(valTip, idClick) {
    tips=valTip;
    resultados();
    if (lastClick!=="0") {
        document.getElementById(lastClick).style.backgroundColor = "var(--Very-dark-cyan)";
        document.getElementById(lastClick).style.color = "var(--White)";
    
    }
    document.getElementById(idClick).style.backgroundColor = "var(--Strong-cyan)";
    document.getElementById(idClick).style.color = "var(--Very-dark-cyan)";
    
    lastClick=idClick;
    
}
function customf() {
    custom=document.getElementById("input-tip").value;
    custom= Number(custom);
    resultados();
}
function people() {
    numPeople=document.getElementById("numPeople").value;
    resultados();
}
function resultados() {
    if ((tips >  0 || custom > 0) && bill >0 && numPeople > 0 ) {
        let tipAmount = ( bill* (tips + (custom / 100)) ) / numPeople;
        tipAmount= Number(tipAmount.toFixed(2));
        let total = ( bill / numPeople) + tipAmount ;
        total=total.toFixed(2);
        console.log("TIP:" + tipAmount);
        console.log("tOTAL:"+ total);
        document.getElementById("tipAmountR").innerHTML="$"+tipAmount;
        document.getElementById("totalPerson").innerHTML="$"+ total;
    }
    
}
function reset() {
    if (lastClick!=="0") {
        document.getElementById(lastClick).style.backgroundColor = "var(--Very-dark-cyan)";
        document.getElementById(lastClick).style.color = "var(--White)";
    }
    tips=0;
    custom=0;
    bill=0;
    numPeople=0;
    lastClick="0";
    document.getElementById("tipAmountR").innerHTML="$"+0;
    document.getElementById("totalPerson").innerHTML="$"+ 0;
    document.getElementById("input-tip").value="";
    document.getElementById("numPeople").value="";
    document.getElementById("total").value="";
}