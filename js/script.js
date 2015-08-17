var boardArray = [[null, null, null],[null, null, null], [null, null, null]];

var board = document.querySelector('#board');
var resultText = document.querySelector('#resultText');

var playerOneTurn = true;

var gameOver = false;

var ryuTurnIndicator = document.querySelector('#ryu-turn');
var kenTurnIndicator = document.querySelector('#ken-turn');

var ryu = document.querySelector('#ryu');
ryu.className = 'ryuIdle';

var ken = document.querySelector('#ken');
ken.className = 'kenIdle';

var resetButton = document.querySelector('#resetButton');
resetButton.addEventListener('click', function() {
	clearBoard();
	getBoard();
});

var clearBoard = function() {
	playerOneTurn = true;
	gameOver = false;
	resultText.innerHTML = "KO";
	resultText.style.opacity = 0;
	ryuTurnIndicator.style.opacity = 1;
	kenTurnIndicator.style.opacity = 0;
	boardArray = [[null, null, null],[null, null, null], [null, null, null]];
	ryu.className = 'ryuIdle';
	ken.className = 'kenIdle';
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			var row = document.querySelector('.box');
			row.parentNode.removeChild(row);
		}
	}
}

var getBoard = function() {

	// Create board rows
	for (var x=0; x<3; x++) {
		var row = document.createElement('div');
		row.id = "row" + x;
		board.appendChild(row);
	}

	kenTurnIndicator.style.opacity = 0;

	// Create board boxes
	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			
			var box = document.createElement('div');
			box.className = "box";
			box.id = "box" + i + j;

			box.addEventListener('click', function() {
				if (playerOneTurn) {
					moveP1(this.id);
					ryuTurnIndicator.style.opacity = 0;
					kenTurnIndicator.style.opacity = 1;
				} else {
					moveP2(this.id);
					ryuTurnIndicator.style.opacity = 1;
					kenTurnIndicator.style.opacity = 0;
				}
			});

			box.addEventListener('mouseover', function() {
				this.className = "box box-hover";
			});

			box.addEventListener('mouseout', function() {
				this.className = "box";
			});

			var rowID = "#row" + i;
			var row = document.querySelector(rowID);
			row.appendChild(box);
		}
	}
};

var moveP1 = function(id) {
	var boxSelected = id;
	var box = document.querySelector('#' + boxSelected);

	if ((gameOver === false) && (boardArray[boxSelected[3]][boxSelected[4]] === null)) { // don't allow player to select same box

		var number = Math.floor(Math.random() * 3) + 1;
		var move = "ryuMove" + number;
		ryu.className = move;
		setTimeout(function() { ryu.className = 'ryuIdle';}, 750);

		setTimeout(function() { ken.className = 'kenHit';}, 300);
		setTimeout(function() { ken.className = 'kenIdle';}, 800);

		box.style.backgroundColor = "#006E93";
		boardArray[boxSelected[3]][boxSelected[4]] = "1";
		playerOneTurn = false;
		checkWinner();
	}
}

var moveP2 = function(id) {
	var boxSelected = id;
	var box = document.querySelector('#' + boxSelected);

	if ((gameOver === false) && (boardArray[boxSelected[3]][boxSelected[4]] === null)) { // don't allow player to select same box

		var number = Math.floor(Math.random() * 3) + 1;
		var move = "kenMove" + number;
		ken.className = move;
		setTimeout(function() { ken.className = 'kenIdle';}, 750);

		setTimeout(function() { ryu.className = 'ryuHit';}, 300);
		setTimeout(function() { ryu.className = 'ryuIdle';}, 800);

		box.style.backgroundColor = "#993333";
		boardArray[boxSelected[3]][boxSelected[4]] = "2";
		playerOneTurn = true;
		checkWinner();
	}
}

var checkWinner = function() {
	var a = boardArray[0][0];
	var b = boardArray[0][1];
	var c = boardArray[0][2];
	var d = boardArray[1][0];
	var e = boardArray[1][1];
	var f = boardArray[1][2];
	var g = boardArray[2][0];
	var h = boardArray[2][1];
	var i = boardArray[2][2];

	var winArray = [[a,b,c],[d,e,f],[g,h,i],[a,d,g],[b,e,h],[c,f,i],[a,e,i],[c,e,g]];

	for (var x=0; x<winArray.length; x++) {
		if ((!gameOver) && (winArray[x][0] != null) && (winArray[x][0] === winArray[x][1]) && (winArray[x][1] === winArray[x][2])) {
			if (!playerOneTurn){
				resultText.innerHTML = "R Y U &nbsp; W I N S";
				resultText.style.opacity = 1;
				ryu.className = 'ryuWin';
				setTimeout(function() { ryu.className = 'ryuWinEnd';}, 770);
				gameOver = true;
			} else {
				resultText.innerHTML = "K E N &nbsp; W I N S";
				resultText.style.opacity = 1;
				ken.className = 'kenWin';
				setTimeout(function() { ken.className = 'kenWinEnd';}, 800);
				gameOver = true;
			}
		}
	}

	var numNulls = 0;

	for (var i=0; i<3; i++) {
		for (var j=0; j<3; j++) {
			if (boardArray[i][j] === null) {
				numNulls++;
			}
		}
	}

	if (!numNulls && !gameOver) {
		gameOver = true;
		resultText.innerHTML = "T I E";
		resultText.style.color = "#000";
		resultText.style.opacity = 1;
	}

}

getBoard();