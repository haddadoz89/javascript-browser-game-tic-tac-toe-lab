/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
/*---------------------------- Variables (state) ----------------------------*/
let board
let turn
let winner
let tie
// X = ❌  https://emojipedia.org/cross-mark
// O = ⭕  https://emojipedia.org/hollow-red-circle
// '' = ❓  https://emojipedia.org/question-mark
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtn = document.getElementById('reset-button')
console.log(squareEls)
console.log(messageEl)
/*-------------------------------- Functions --------------------------------*/
const placePiece=(index)=>{
    board[index] = turn
}
const checkForWinner = ()=>{
        if (
            (board[0] !== '' && board[0] === board[1] && board[0] === board[2]) ||
            (board[3] !== '' && board[3] === board[4] && board[3] === board[5]) ||
            (board[6] !== '' && board[6] === board[7] && board[6] === board[8]) ||
            (board[0] !== '' && board[0] === board[3] && board[0] === board[6]) ||
            (board[1] !== '' && board[1] === board[4] && board[1] === board[7]) ||
            (board[2] !== '' && board[2] === board[5] && board[2] === board[8]) ||
            (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) ||
            (board[2] !== '' && board[2] === board[4] && board[2] === board[6])
        
        ){
            winner = true
        }
}
const checkForTie =()=>{
    if (winner === true){
        return
    }
    if (
        board[0] !== '' &&
        board[1] !== '' &&
        board[2] !== '' &&
        board[3] !== '' &&
        board[4] !== '' &&
        board[5] !== '' &&
        board[6] !== '' &&
        board[7] !== '' &&
        board[8] !== ''
      ) {
        tie = true;
      }
}
const switchPlayerTurn =()=>{
    if (winner === true){
        return
    } else if (winner === false){
        if (turn === '❌' ){
            turn = '⭕'
        }else{
            turn = '❌'
        }
    }
}
const updateBoard = ()=>{
    board.forEach((box,index) => {
        squareEls[index].textContent = 
            box === '❌' || 
            box === '⭕' ? box : '❓'

    })
}
const updateMessage = ()=>{
    if (winner === false && tie === false){
        messageEl.textContent = `'${turn}'is thinking`
    } 
    if (winner === false && tie === true){
        messageEl.textContent = "It's a Tie! 🤝"
    }
    if (winner === true && tie === false){
        messageEl.textContent = `🎉 ${turn} wins the game!`
    }
}
const render = ()=>{
    updateBoard()
    updateMessage()
    if (winner === true || tie === true) {
        resetBtn.style.display = 'block';
      }
}
const init =()=>{
    board = [
        '','','',
        '','','',
        '','','' 
    ]
    turn = '❌'
    winner = false
    tie = false
    render()
}
const handleClick =(event)=>{
    const squareIndex = event.target.id
    if (
        board[squareIndex] === '❌' ||
        board[squareIndex] === '⭕' ||
        winner === true ) {
            return
    }
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    render()
}
init()
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
})
resetBtn.addEventListener('click', () => {
    resetBtn.style.display = 'none'; 
    init();
  })
