//despot some somey

// function deposit(){
//     return 1;
// }

const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const  SYMBOLS_COUNT={
    A:2,
    B:4,
    C:6,
    D:8
}


const SYMBOL_VALUES={
   A:5,
    B:4,
    C:3,
    D:2
}

const deposit =() =>{

    while(true){
    const depositAmount = prompt("Enter a deposit amt: ");
      const numberDepositAmount = parseFloat(depositAmount);

      if(isNaN(numberDepositAmount) || numberDepositAmount<=0 ){
            console.log("Invalid");
      }else{
        return numberDepositAmount;
      }
    }
};

const getnumofLines = () =>{
    while(true){
        const lines = prompt("Enter a bet amt 1 to 3: ");
          const numoflines = parseFloat(lines);
    
          if(isNaN(numoflines) || numoflines<=0 || numoflines>3){
                console.log("Invalid");
          }else{
            return numoflines;
          }
        }
};

const getbet = (balance,lines) =>{
    while(true){
        const bet = prompt("Enter a bet amt per line: ");
          const numbet = parseFloat(bet);
    
          if(isNaN(numbet) || numbet<=0 || numbet>balance / lines){
                console.log("Invalid");
          }else{
            return numbet;
          }
        }
};



const spin = () => {
    const symbols = [];
    for (const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i =0; i<count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [[], [], []];
    for (let i=0;i<COLS;i++){
        reels.push([]);
         const reelSymbols = [...symbols];
        for(let j=0;j<ROWS;j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }return reels;
};


const transpose = (reels) =>{
    const rows=[];
    for(let i=0; i<ROWS; i++){
        rows.push([]);
        for(let j=0;j<COLS;j++){
            rows[i].push(reels[j][i]);
        }
    }return rows;
};

const printrows = (rows) =>{
    for(const row of rows){
        let rowString = "";
        for(const[i,symbol] of row.entries()){
            rowString +=symbol;
            if( i != row.length -1){
                rowString += " | "
            }
        }console.log(rowString);
    }
};


const getWinings = (rows,bet,lines) =>{
    let winings = 0;
    for(let row = 0;row<lines;row++){
        const symbols = rows[row];
        let allsame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allsame = false;
                break;
            }
        }
        if (allsame){
            winings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }return winings;
};


const game = () =>{

let balance = deposit();

while(true){
    console.log("You have a balanc of "+ balance);
const numoflines = getnumofLines();
const bet = getbet(balance,numoflines);

balance -= bet*numoflines;
const reels = spin();
const rows = transpose(reels);
printrows(rows);
const winings = getWinings(rows,bet,numoflines);

balance+=winings;
  console.log("You won, $ " + winings.toString());
if(balance<=0){
    console.log("You ran out of money");
    break;}
const playagain = prompt ("Do you want to play again y/n ");

if(playagain!= "y")break;

}
};
game();