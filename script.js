var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}

function initializeTemp(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            temp[i][j] = false;

        }
    }
}


function setTemp(board, temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                temp[i][j] = true;
            }

        }
    }
}


function setColor(temp) {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}

function resetColor() {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            arr[i][j].style.color = "green";
        }
    }
}

var board = [[], [], [], [], [], [], [], [], []]
var boardc = [[], [], [], [], [], [], [], [], []]
var boardk = [[], [], [], [], [], [], [], [], []]
var boardf = [[], [], [], [], [], [], [], [], []]


let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve')
let place = document.getElementById('place')

console.log(arr)
function changeBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j]
            }
            else
                arr[i][j].innerText=''
        }
    }
}

let iv=[[], [], [], [], [], [], [], [], []];
for(let tt=0;tt<9;tt++)
{
    for(let ttt=0;ttt<9;ttt++)
    {iv[tt][ttt]=0;}  
}

place.onclick = function()
{
    let a=document.getElementById("location").value;
    let x=a.charCodeAt(0)-65;
    let y=a.charCodeAt(1)-49;
    let b=parseInt(document.getElementById("value").value)
    if(iv[x][y]===0 && b<10 && b>0 && x>-1 && x<9 && y>-1 && y<9){
        board[x][y]=b;
    }
    else
    {alert(`Enter valid position and value`);}
    changeBoard(board);
}

button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()
        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
        for(let i=0;i<9;i++)
        {
            for(let j=0;j<9;j++)
            {
                boardf[i][j]=board[i][j]
                if(board[i][j]!==0){iv[i][j]=1;}
            }
        }
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    xhrRequest.send()   
}

function isPossible(board, sr, sc, val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }
    var r = sr - sr % 3;
    var c = sc - sc % 3;
    for (var cr = r; cr < r + 3; cr++) {
        for (var cc = c; cc < c + 3; cc++) {
            if (board[cr][cc] == val) {
                return false;
            }
        }
    }
    return true;

}

function solveSudokuHelper(board, sr, sc) {
    if (sr == 9) {
        changeBoard(board);
        return;
    }
    if (sc == 9) {
        solveSudokuHelper(board, sr + 1, 0)
        return;
    }

    if (board[sr][sc] != 0) {
        solveSudokuHelper(board, sr, sc + 1);
        return;
    }

    for (var i = 1; i <= 9; i++) {
        if (isPossible(board, sr, sc, i)) {
            board[sr][sc] = i;
            boardk[sr][sc]=i;
            solveSudokuHelper(board, sr, sc + 1);
            board[sr][sc] = 0;
        }
    }
}

function solveSudoku(board) {
    solveSudokuHelper(board, 0, 0)
}

solve.onclick = function () {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            boardc[i][j]=board[i][j]
            if(iv[i][j]!==1)
            {board[i][j]=0;}
            boardk[i][j]=board[i][j]
        }
    }
    solveSudoku(board)
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 9; j++) {
            iv[i][j]=0;
            if(boardf[i][j]!=0){}
            else if(boardk[i][j]!==boardc[i][j] && boardc[i][j]!=0)
            {arr[i][j].style.color = "orange";}
            else if(boardc[i][j]!==0 && boardk[i][j]===boardc[i][j] )
            {arr[i][j].style.color = "purple";}
            boardc[i][j]=0;
            boardk[i][j]=0;
        }
    }
}
let aaa=0;
function rules()
{
    if(aaa===0)
    {
        document.getElementById("rule").style.visibility="visible";
        document.getElementById("puzz").style.visibility="hidden";
        document.getElementById("rule_game").innerHTML=`Game`;
    }
    else
    {
        document.getElementById("rule").style.visibility="hidden";
        document.getElementById("puzz").style.visibility="visible";
        document.getElementById("rule_game").innerHTML=`Rules`;
    }
    aaa=1-aaa;
}