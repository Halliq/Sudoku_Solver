class Sudoku_cell {
    constructor(column,row,value){
        this.column = column
        this.row = row
        this.value = value
    }
}

let setting_value = 0

const columns = document.getElementsByClassName("column")
const cells = document.getElementsByClassName("cell")
const rows = []

let sudoku = []

/* EventListeners */
for(let cell of cells) {
    cell.addEventListener("click", () => {
        if(setting_value == 0 && !cell.classList.contains("active")) {    
            setting_value = 1
            cell.classList.add("active")
            createform(cell.id)     // Create input-form for that cell
        } /* else if(setting_value == 0 && cell.classList.contains("active")) {    
            setting_value = 1
            cell.classList.remove("active")
            targetform(cell.id)     // Target input-form for that cell
        } */
    })
}
/* Updates the Sudoko Cells */
function updateSudokuCell(cell,value){
    for(let sudoku_cell of sudoku){
        if(sudoku_cell.column == cell.id[0] &&
           sudoku_cell.row == cell.id[1] ){
           sudoku_cell.value = value
        }
    }
}
/* Create a new form inside correct cell */
function createform(id) {
    let cell = document.getElementById(id)
    var form = document.createElement("form")
    form.id ="form-id"

    var input = document.createElement("input")
    input.type = "text"
    input.value = ""
    input.id="input-id"
    input.maxLength="1"

    form.appendChild(input)  // APpend the input-field to the form
    cell.appendChild(form)   // Append the new form to the correct cell

    form.addEventListener('keydown',(event) => {    // Eventlistener for ENTER Key
        if(event.key == "Enter"){
            cell.innerHTML = input.value
            updateSudokuCell(cell,input.value)      // Update correct Cell
            setting_value = 0
        }
    })
    form.reset()
}

/* Create Empty Sudoku */
function createSudoku() {
    for (let column = 1; column < 10; column++) {
        for (let row= 1; row < 10; row++) {
            let cell = new Sudoku_cell(column,row,undefined)
            sudoku.push(cell)
        }
    }
}




































/* function targetform(id) {
    let cell = document.getElementById(id)
    let tmp = cell.innerHTML

    var form = document.createElement("form")
    form.id ="form-id"

    var input = document.createElement("input")
    input.type = "text"
    input.value = "`${tmp}`"
    input.id="input-id"
    input.maxLength="1"

    form.appendChild(input)  // APpend the input-field to the form
    cell.appendChild(form)   // Append the new form to the correct cell

    form.addEventListener('keydown',(event) => {    // Eventlistener for ENTER Key
        if(event.key == "Backspace"){
            cell.innerHTML = ""
            updateSudokuCell(cell,undefined)      // Update correct Cell
            setting_value = 0
            console.log("Backspaced")
        }
    })
    form.reset()
} */

createSudoku()
