/* Sudokus, b for blanks == NULL */
const b = null

const empty_sud = [
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b],
    [b,b,b,b,b,b,b,b,b]
]
/*
    Valid Sudoku, unsolved
*/
const valid_unsolved_sud = [
    [b,b,4,9,b,6,b,3,b],
    [6,2,b,1,5,b,b,b,b],
    [b,8,b,2,3,b,5,1,b],
    [2,3,8,b,b,b,b,b,b],
    [b,4,1,7,6,b,b,9,8],
    [b,9,b,b,1,b,b,b,b],
    [4,b,b,8,b,3,b,b,5],
    [3,b,b,5,b,b,4,b,7],
    [b,b,b,b,4,b,b,b,b]
]
/*
    Valid Sudoku, solved
*/
const valid_solved_sud = [
    [1,5,4,9,8,6,7,3,2],
    [6,2,3,1,5,7,8,4,9],
    [9,8,7,2,3,4,5,1,6],
    [2,3,8,4,9,5,6,7,1],
    [5,4,1,7,6,2,3,9,8],
    [7,9,6,3,1,8,2,5,4],
    [4,1,2,8,7,3,9,6,5],
    [3,6,9,5,2,1,4,8,7],
    [8,7,5,6,4,9,1,2,3]
]
/*
    invalid Sudoku
*/
const invalid_sud = [
    [b,1,2,3,4,5,6,7,8],
    [1,b,b,b,b,b,b,b,b],
    [2,b,b,b,b,b,b,b,b],
    [3,b,b,b,b,b,b,b,b],
    [4,b,b,b,b,b,b,b,b],
    [5,b,b,b,b,b,b,b,b],
    [6,b,b,b,b,b,b,b,b],
    [7,b,b,b,b,b,b,b,b],
    [8,b,b,b,b,b,b,b,b]
]

/* 
    @params {array} sudoku
    @return {array} sudoku
*/
function solve(sudoku) {
    if(!isSolved(sudoku)) {
        var all_possible_boards = allPossibleBoards(sudoku)
        var all_valid_boards = keepValid(all_possible_boards)
        return checkForSolutions(all_valid_boards)
    } else {
        printSudoku(sudoku)
        return
    }
    
}
/* 
    @params {array} sudoku
    @return boolean
*/
function checkForSolutions(boards){
    if(boards.length < 1) return false

    var first_valid = boards.shift()
    var f1 = solve(first_valid)  
    if(f1 != false ) return f1

    return checkForSolutions(boards)
}
function allPossibleBoards(sudoku) {
    let tmp = []
    let firstEmptyCell = emptyCell(sudoku)
    if(firstEmptyCell != undefined){
        const x_cordinate = firstEmptyCell[0]
        const y_cordinate = firstEmptyCell[1]
        for(let i=1;i<=9;i++){
            var newBoard = [...sudoku]
            var row = [...newBoard[x_cordinate]]
            row[y_cordinate] = i
            newBoard[x_cordinate] = row
            tmp.push(newBoard)
        }
    }
    return tmp
}
/* 
    @params {arrays} sudokus
    @return valid-sudokus
*/
function keepValid(sudokus) {
    return sudokus.filter(x => isValid(x))
}
/*  
    @params {array} sudoku
    @return [i,i] corndinates
*/
function emptyCell(sudoku){
    for(let i=0;i< 9;i++){
        for(let j=0;j< 9;j++){
            if(sudoku[i][j] == null){
                return [i,j]
            }
        }
    } 
} 

/* 
    @param {array} sudoku
    @return boolean
*/
function goodRows(sudoku) {
    for(var i=0;i< 9;i++){
        var tmp = []
        for(var j=0;j< 9;j++){
            if(tmp.includes(sudoku[i][j])){ 
                return false
            } else if(sudoku[i][j] != null) {
                tmp.push(sudoku[i][j])
            } 
        }
    }
    return true
}
/* 
    @param {array} sudoku
    @return boolean
*/
function goodColumns(sudoku) {
    for(var i=0;i< 9;i++){
        var tmp = []
        for(var j=0;j< 9;j++){
            if(tmp.includes(sudoku[j][i])){
                return false
            } else if(sudoku[j][i] != null) {
                tmp.push(sudoku[j][i])
            } 
        }

    }
    return true
}
/* 
    @param {array} sudoku
    @return boolean
*/
function goodBlocks(sudoku) {
    const box_cord = [
        [0,0],[0,1],[0,2],
        [1,0],[1,1],[1,2],
        [2,0],[2,1],[2,2]
    ]

    for(var x=0;x<9 ;x+=3){
        for(var y=0;y<9;y+=3){
            var tmp = []
            for(var i=0;i<9;i++){
                var cord = [...box_cord[i]]
                cord[0] += x
                cord[1] += y
                if(tmp.includes(sudoku[cord[0]][cord[1]])){
                    return false
                } else if(sudoku[cord[0]][cord[1]] != null){
                    tmp.push(sudoku[cord[0]][cord[1]])
                }
            }
        }
    }
    return true
}

/*
    @param {array} sudoku
    @return boolean
*/
function isSolved(sudoku) {
    for(let row of sudoku){
        for(cell of row){
            if(cell === null) return false
        }
    }
    return true
}
/*
    @param {array} sudoku
    @return boolean
*/
function isValid(sudoku) {
    return goodRows(sudoku) && goodColumns(sudoku)  && goodBlocks(sudoku) 
}

/* 
    @params {array} sudoku
    @prints {array} sudoku
*/
function printSudoku(sudoku){
    console.log("\n")
    var underline = "_______________"
    for(var i=0;i<9;i++){
        var str=""
        if(i == 3 || i == 6){
            console.log(underline)
        }
        for(var j=0;j<9;j++){
            str+=sudoku[i][j]
            if(j == 2 || j == 5){
                str+= " | "
            }
        }
        console.log(str)
    }

}

console.log(solve(empty_sud))