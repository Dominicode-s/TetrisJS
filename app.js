document.addEventListener('DOMContentLoaded', () =>{ //when page is loaded
    const grid = document.querySelector('.grid');
    const width = 10;
    const scoreDisplay = document.querySelector('#score');
    const startBtn = document.querySelector('#start-button')
    let nextRandom = 0
    timerId = 0

    let squares = document.querySelectorAll('.grid div');

    console.log(squares);

    //Tetris shapes
    const lTetris = [ //L
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const oTetris = [ //O
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]
    ]

    const tTetris = [ //T
        [1,width,width+1,width+2],
        [1,width+1,width+2,width*2+1],
        [width,width+1,width+2,width*2+1],
        [1,width,width+1,width*2+1]
    ]

    const iTertis = [ //I
        [width,width+1,width+2,width+3],
        [2,width+2,width*2+2,width*3+2],
        [width*2,width*2+1,width*2+2,width*2+3],
        [1,width+1,width*2+1,width*3+1]
    ]

    const zTetris = [ //Z
        [0,1, width+1,width+2],
        [2, width+1,width+2,width*2+1],
        [width,width+1,width*2+1,width*2+2],
        [1,width,width+1,width*2]
    ]

    const tetrisShapes = [lTetris, zTetris, tTetris, oTetris, iTertis] //array of shapes

    let currentPosition = 4;
    let currentRotation = 0;
    let random = Math.floor(Math.random()*tetrisShapes.length);

    let current = tetrisShapes[random][currentRotation];

    //draw the random tetris shape

    function draw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino')
        })
    }

    function undraw() {
        current.forEach(index => {
            squares[currentPosition + index].classList.remove('tetromino')
        })
    }

    //assign functions to keycodes
    function control(e) {
        if(e.keyCode === 37){
            moveLeft()
        }
        if(e.keyCode === 39){
            moveRight()
        }
        if(e.keyCode === 38){
            rotateRight()
        }
        if(e.keyCode === 40){
            moveDown()
        }
    }
    document.addEventListener("keyup", control)

    function moveDown() {
            undraw()
            currentPosition += width
            draw()
            freeze()
    }

    //freeze func

    function freeze() {
        if(current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){
            current.forEach(index => squares[currentPosition + index].classList.add('taken'))
            //start new tetris block falling
            random = nextRandom
            nextRandom = Math.floor(Math.random() * tetrisShapes.length)
            current = tetrisShapes[random][currentRotation]
            currentPosition = 4
            draw()
            displayTetromino()

        }
    }


    //move tetris shape left

    function moveLeft() {
        undraw()
        const isLeftEdge = current.some(index => (currentPosition + index) % width === 0)

        if(!isLeftEdge) currentPosition -=1

        if(current.some(index => squares[currentPosition + index].classList.contains('taken'))){
            currentPosition += 1
        }

        draw()
    }

    function moveRight() {
        undraw()
        const isRightEdge = current.some(index => (currentPosition + index) % width === width - 1)

        if(!isRightEdge) currentPosition +=1

        if(current.some(index => squares[currentPosition+index].classList.contains('taken'))){
            currentPosition -=1
        }
        draw()
    }

    function rotateRight() {
        undraw()

        currentRotation ++;
        if(currentRotation === current.length){
            currentRotation = 0;
        }

        current = tetrisShapes[random][currentRotation];

        console.log(current)
        draw()
    }

    //show next tetris shape

    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    //the Tetris shapes without rotations

    const upNextTetrisShapes = [
        [1, displayWidth+1, displayWidth*2+1, 2], //L
        [0,1, displayWidth+1,displayWidth+2], //Z
        [1,displayWidth,displayWidth+1,displayWidth+2], //T
        [0, 1, displayWidth, displayWidth+1], //O
        [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3], //I
    ]

    function displayTetromino() {
        displaySquares.forEach(square => {
            square.classList.remove('tetromino')
        })

        upNextTetrisShapes[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('tetromino')
        })

    }

    startBtn.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        } else {
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*tetrisShapes.length)
            displayTetromino()
        }
    })

});