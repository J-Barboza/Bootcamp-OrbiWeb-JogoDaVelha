var board = [];
var gamer = null;
var winner = 0;
var selectedGamer = document.getElementById('selectedGamer');
var squares = document.getElementsByClassName('square');

window.onload = function() {
    initialization();
  };
  
function initialization() {
	board = [ [],[],[] ];
    for (let i = 0; i < 9; i++){
        squares[i].style.background = "#b2ebf2"
    }
    winner = 0;
    selectedWinner.innerHTML = '';
	showBoard(board);
    changeGamer('X');
    enableClick();
}

function choiceSquare(selectedSquare){

    var l = Number(selectedSquare[0])
    var c = Number(selectedSquare[1])
   
    if (board[l][c] !== undefined) {
		return;
	} else {
        board[l][c] = gamer;
        showBoard(board);
        compareState(gamer);
        gamer = (gamer === 'X')?"O":"X";
        changeGamer(gamer);
    }
}

function changeGamer(value){
    gamer = value;
    selectedGamer.innerHTML = gamer;
}

function declaresWinner(winner){
    selectedWinner.innerHTML = (winner == 1) ? 'Vencedor é o X' : 'Vencedor é o O';
    winner = 0;
}

//atualiza tabuleiro
function showBoard(board) {	
	for (let i=0; i<3; i++)
		for (let j=0; j<3; j++) {
			var selectedSquare = document.getElementById(i.toString() + j.toString());
			if (board[i][j] == undefined)
                selectedSquare.innerHTML = "&nbsp;";
			else
                selectedSquare.innerHTML = board[i][j];
                selectedSquare.style.color = '#000';
		}
}

function compareState(gamer){
    var x, y;
    
    // testar linhas
    for (x=0; x<3; x++){
        if (board[x][0] != undefined && board[x][0] == board[x][1] && board[x][0] == board[x][2]) {
            winner = (board[x][0] == "X")? 1: -1;
            let col = x == 0 ? 0 : x == 1 ? 3 : 6;
            for (let i=0; i<3; i++){
                squares[i+col].style.background = '#00e5ff';
            }
			break;
		}
    }

    // testar colunas
    if (winner == 0){
        for (let y=0; y<3; y++){
            if (board[0][y] != undefined && board[0][y] == board[1][y] && board[0][y] == board[2][y]) {
                winner = (board[0][y] == "X")? 1: -1;
                for (let i=0; i<9; i+=3){
                    squares[i+y].style.background = '#00e5ff';
                }
                break;
            }
        }
    }

    // testar diagonais
    if (winner == 0) {
        if ( board[1][1] != undefined) {
            if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                squares[0].style.background = '#00e5ff';
                squares[4].style.background = '#00e5ff';
                squares[8].style.background = '#00e5ff';
                winner = (board[1][1] == "X")? 1: -1;
            }
            if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
                squares[2].style.background = '#00e5ff';
                squares[4].style.background = '#00e5ff';
                squares[6].style.background = '#00e5ff';
                winner = (board[1][1] == "X")? 1: -1;
            }
        }
    }

    // Declara vencedor
    if (winner !== 0){
        desableClick()
        changeGamer('')
        declaresWinner(winner)
    }
    
    // desabilita click qdo termina todas as jogadas
    const xArray = board.toString().split(",");
    const filtered = xArray.filter((el) => {
        return el !== null && typeof el !== 'undefined' && el !== '';
      });
    if (filtered.length === 9){
        desableClick();
    }
}

function desableClick(){
    for (let i = 0; i < squares.length; i++){
        squares[i].classList.add('noClick');
    }
}

function enableClick(){
    for (let i = 0; i < squares.length; i++){
        squares[i].classList.remove('noClick');
    }
}

function onMouseOver(x){
    if (x.innerHTML !== 'X' && x.innerHTML !== 'O'){
        x.style.background = '#80cbc4';
        x.style.cursor = "pointer";
    } else {
        x.style.cursor = "default";
    }
}

function outMouseOver(x){
    if (winner == 0){
        x.style.background = '#b2ebf2';
    }
}