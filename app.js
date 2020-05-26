document.addEventListener('DOMContentLoaded', () =>{ //when page is loaded
    const grid = document.querySelector('.grid');
    const width = 10;
    const ScoreDisplay = document.querySelector('#score');
    const StartBtn = document.querySelector('#start-button')

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

    const tetrisShapes = [lTetris, zTetris, tTetris, oTetris, iTertis]

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


    //Start the game. interval 1 sec

    StartBtn.onclick = function() {
        StartBtn.innerHTML = 'PLAYING'
        timerId = setInterval(moveDown, 1000)
    }


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
            random = Math.floor(Math.random() * tetrisShapes.length)
            current = tetrisShapes[random][currentRotation]
            currentPosition = 4
            draw()
        }
    }


});