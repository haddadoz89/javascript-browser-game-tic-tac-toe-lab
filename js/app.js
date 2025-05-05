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
let xWins = 0
let oWins = 0
let ties = 0
// X = ❌  https://emojipedia.org/cross-mark
// O = ⭕  https://emojipedia.org/hollow-red-circle
// '' = ❓  https://emojipedia.org/question-mark
/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr')
const messageEl = document.getElementById('message')
const resetBtn = document.getElementById('reset-button')
const xCountEl = document.getElementById('x-count')
const oCountEl = document.getElementById('o-count')
const tieCountEl = document.getElementById('tie-count')
const resetStatsBtn = document.getElementById('reset-stats-button')
// console.log(squareEls)
// console.log(messageEl)
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
    //   console.log(tie)
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
            box === '❌' || box === '⭕' ? box : '❓' // ? like if statment : otherwise
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
        resetBtn.style.display = 'block'
        if (winner === true) {
            if (turn === '❌') {
                xWins += 1
            }else {
          oWins += 1
        }
      } else if (tie === true) {
        ties += 1
      }
    }
    xCountEl.textContent = `❌ Wins : ${xWins}`
    oCountEl.textContent = `⭕ Wins : ${oWins}`
    tieCountEl.textContent = `🤝 Ties : ${ties}`
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
const playAgain =() => {
    resetBtn.style.display = 'none'; 
    init();
  }
const rstStatBtn =()=>{
    xWins
    oWins
    ties
    xCountEl.textContent = `❌ Wins : 0`
    oCountEl.textContent = `⭕ Wins : 0`
    tieCountEl.textContent = `🤝 Ties : 0`
    console.log('Stats reset!')
}
init() // # this is important I forget to include it, feeling that  i didnt do any thing :)
/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
    square.addEventListener('click', handleClick)
})
resetBtn.addEventListener('click', playAgain)
resetStatsBtn.addEventListener('click', rstStatBtn)
