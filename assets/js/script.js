var board = [];
var player;
var winner;
var selectedPlayerWinner = document.getElementById('playerAndWinner');
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
	showBoard(board);
    scoreboard('Player: ', 'X')
    enableClick();
}

function as(valor){
    console.log(valor);
}

function choiceSquare(selectedSquare){

    var l = Number(selectedSquare[0])
    var c = Number(selectedSquare[1])
   
    if (board[l][c] !== undefined) {
   		return;
	} else {
        board[l][c] = player;
        showBoard(board);
        compareState(player);
        player = (player === 'X')?"O":"X";
        if (winner==0)
            scoreboard('Player: ', player);
    }
}

// display current player or winner 
function scoreboard(description, value){
    player = value;
    if (description !== null){
        selectedPlayerWinner.innerHTML = description + player;
    }
}

//update board
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

function compareState(player){
    var x, y;
    
    // test line
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

    // test column
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

    // test diagonals
    if (winner == 0) {
        if ( board[1][1] != undefined) {
            if (board[0][0] == board[1][1] && board[0][0] == board[2][2]) {
                for (let i = 0; i <= 8; i += 4){
                    squares[i].style.background = '#00e5ff';
                }
                winner = (board[1][1] == "X")? 1: -1;
            }
            if (board[0][2] == board[1][1] && board[0][2] == board[2][0]) {
                for (let i = 2; i <= 6; i += 2){
                    squares[i].style.background = '#00e5ff';
                }
                winner = (board[1][1] == "X")? 1: -1;
            }
        }
    }

    // show winner
    if (winner !== 0){
        desableClick()
        scoreboard('Winner: ', (winner == 1) ? 'X' : 'O')
    }
    
    // disable click when finished moves
    const xArray = board.toString().split(",");
    const filtered = xArray.filter((el) => {
        return el !== null && typeof el !== 'undefined' && el !== '';
      });
    if (filtered.length === 9){
        selectedPlayerWinner.innerHTML = 'Tie!!!'
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