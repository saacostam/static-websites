class Sudoku{
    constructor(element){
        this.element = element;
        this.focusId = -1;
    
        this.numbers = new Set(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        this.ref = new Array(81);

        this.createGrid();
        this.bindGrid();

        this.newGame();
    }

    checkValidity(){
        // Restart squares
        for (let id = 0; id < 81; id++){
            this.ref[id].classList.remove('invalid');
        }

        // Check rows
        for (let row = 0; row < 9; row++){
            let counter = {};
            for (let x = 0; x < 9; x++){
                const id = (9*row)+x;
                const val = this.ref[id].value;

                if (val !== ""){
                    if (counter[val]){
                        this.ref[counter[val]].classList.add('invalid');
                        this.ref[id].classList.add("invalid");
                        
                        counter[val] = id;
                    }else{
                        counter[val] = id;
                    }
                }
            }
        }

        // Check columns
        for (let col = 0; col < 9; col++){
            let counter = {};
            for (let x = 0; x < 9; x++){
                const id = (9*x)+col;
                const val = this.ref[id].value;

                if (val !== ""){
                    if (counter[val]){
                        this.ref[counter[val]].classList.add('invalid');
                        this.ref[id].classList.add("invalid");
                        
                        counter[val] = id;
                    }else{
                        counter[val] = id;
                    }
                }
            }
        }
    }

    createGrid(){
        for (let square = 0; square < 9; square++ ){
            const squareDiv = document.createElement('div');
            squareDiv.classList.add('square');

            const row = Math.floor(square/3);
            const col = square % 3;

            for (let j=0; j<9; j++){
                const i = [0, 1, 2, 9, 10, 11, 18, 19, 20][j];

                const fieldInput = document.createElement('input');
                fieldInput.classList.add('field');
                fieldInput.type = 'text';
                fieldInput.id = (27*row)+(3*col)+i;

                this.ref[fieldInput.id] = fieldInput;

                squareDiv.append(fieldInput);
            }

            this.element.append(squareDiv);
        }
    }

    newGame(){
        // HARD CODED GAME // WARNING :D
        const game = "010020300002003040050000006004700050000100003070068000300004090000600104006000000"

        for (let i = 0; i<81; i++){
            if (game.charAt(i) !== "0"){
                this.solidyField( this.ref[i], game.charAt(i) );
            }
        }
    }

    solidyField(element, content){
        element.disabled = true;
        element.value = content;
        element.classList.add('disabled');
    }

    bindGrid(){
        const cells = document.querySelectorAll(".field");
        cells.forEach((cell)=>{
            cell.addEventListener('mousedown', (e)=>{
                this.focusCell(e.target.id);
            })

            cell.addEventListener('input', (e)=>{
                const val = e.target.value;
                const lastDigit = val.substring(val.length - 1);

                if (this.numbers.has(lastDigit)){
                    e.target.value = lastDigit;
                }else{
                    e.target.value = "";
                }

                this.checkValidity();
            })
        })
    }

    focusCell(id){
        if (this.focusId>=0){
            const oldCell = this.ref[this.focusId];
            oldCell.classList.remove('active');
        }
        
        this.focusId = id;

        const newCell = this.ref[id];
        newCell.classList.add('active');
    }
}

const divGame = document.querySelector('div#game');
const sudoku = new Sudoku(divGame);